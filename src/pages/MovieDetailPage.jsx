import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CinemaList from "@/components/movie-detail/CinemaList";
import MovieDetailFilterBar from "@/components/movie-detail/MovieDetailFilterBar";
import MovieDetailHero from "@/components/movie-detail/MovieDetailHero";
import {
  MovieDetailErrorState,
  MovieDetailLoadingState,
} from "@/components/movie-detail/MovieDetailStates";
import SelectedSchedulePicker from "@/components/movie-detail/SelectedSchedulePicker";
import SweetAlert from "@/components/ui/SweetAlert";
import usePageTitle from "@/hooks/usePageTitle";
import HomeLayout from "@/layouts/HomeLayout";
import {
  createMovieDetailOrder,
  fetchFilteredMovieSchedules,
  fetchMovieDetailPage,
  resetMovieDetailState,
  selectCinema,
  selectMovieDetailScheduleState,
  selectShowtime,
  setCurrentPage,
  setFilterDate,
  setFilterLocation,
  setFilterTime,
  updateCurrentDateTime,
} from "@/redux/slice/movieDetailSlice";
import {
  formatPrice,
  isPastDateValue,
  isPastTimeForDate,
} from "@/utils/api/movieDetailMappers";

function MovieDetailContent({ slug, auth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schedule = useSelector(selectMovieDetailScheduleState);
  const {
    movie,
    locationOptions,
    timeOptions,
    loading,
    error,
    bookingLoading,
  } = schedule;

  usePageTitle(movie?.title || "Movie Detail");

  useEffect(() => {
    if (!slug) return undefined;

    const promise = dispatch(fetchMovieDetailPage(slug));

    return () => {
      promise.abort();
      dispatch(resetMovieDetailState());
    };
  }, [dispatch, slug]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch(updateCurrentDateTime());
    }, 30000);

    return () => window.clearInterval(timer);
  }, [dispatch]);

  const redirectToSignin = async () => {
    await SweetAlert.show({
      icon: "info",
      title: "Login required",
      text: "Please sign in before booking this movie.",
      confirmButtonText: "Sign in",
    });

    navigate("/auth/signin", {
      state: {
        from: `/movies/${slug}`,
      },
    });
  };

  const handleBookNow = async () => {
    if (!schedule.canBook) return;

    if (
      isPastDateValue(schedule.selectedDate, schedule.currentDateValue) ||
      isPastTimeForDate(
        schedule.selectedTime,
        schedule.selectedDate,
        schedule.currentDateValue,
        schedule.currentTimeValue,
      )
    ) {
      await SweetAlert.error({
        title: "Schedule unavailable",
        text: "This schedule has already passed. Please choose another date or time.",
      });
      return;
    }

    if (!auth.isAuthenticated || !auth.token) {
      await redirectToSignin();
      return;
    }

    try {
      const order = await dispatch(createMovieDetailOrder()).unwrap();
      const orderId = order?.id;

      if (!orderId) {
        await SweetAlert.error({
          title: "Failed to create order",
          text: "Order ID was not returned by the server.",
        });
        return;
      }

      navigate(`/orders/${orderId}/booking`);
    } catch (err) {
      if (err?.status === 401) {
        await redirectToSignin();
        return;
      }

      await SweetAlert.error({
        title: "Failed to create order",
        text: err?.message || "Please try again later.",
      });
    }
  };

  if (loading) return <MovieDetailLoadingState />;
  if (error) return <MovieDetailErrorState message={error} />;

  return (
    <HomeLayout>
      {movie && <MovieDetailHero movie={movie} />}

      <section className="relative z-10 px-5 pb-12 sm:px-6 lg:px-8">
        <MovieDetailFilterBar
          filterDate={schedule.filterDate}
          filterTime={schedule.filterTime}
          filterLocation={schedule.filterLocation}
          selectableDateOptions={schedule.selectableDateOptions}
          timeOptions={timeOptions}
          locationOptions={locationOptions}
          scheduleLoading={schedule.scheduleLoading}
          scheduleError={schedule.scheduleError}
          hasFiltered={schedule.hasFiltered}
          cinemaCount={schedule.cinemaList.length}
          onDateChange={(value) => dispatch(setFilterDate(value))}
          onTimeChange={(value) => dispatch(setFilterTime(value))}
          onLocationChange={(value) => dispatch(setFilterLocation(value))}
          onFilter={() => dispatch(fetchFilteredMovieSchedules({ slug }))}
          isTimeOptionDisabled={schedule.isTimeOptionDisabled}
        />

        <CinemaList
          hasFiltered={schedule.hasFiltered}
          visibleCinemas={schedule.visibleCinemas}
          cinemaCount={schedule.cinemaList.length}
          emptyScheduleMessage={schedule.emptyScheduleMessage}
          totalPages={schedule.totalPages}
          pages={schedule.pages}
          currentPage={schedule.currentPage}
          selectedCinemaId={schedule.selectedCinemaId}
          selectedDate={schedule.selectedDate}
          selectedTime={schedule.selectedTime}
          filterDate={schedule.filterDate}
          filterTime={schedule.filterTime}
          activeCinemaId={schedule.activeCinemaId}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
          onSelectCinema={(cinema) => dispatch(selectCinema(cinema))}
          onSelectMobileTime={(cinema, showtime) =>
            dispatch(selectShowtime({ cinema, showtime }))
          }
        />

        {schedule.selectedCinema && (
          <SelectedSchedulePicker
            cinema={schedule.selectedCinema}
            selectedMovieCinemaId={schedule.selectedMovieCinemaId}
            onSelect={(showtime) =>
              dispatch(
                selectShowtime({
                  cinema: schedule.selectedCinema,
                  showtime,
                }),
              )
            }
          />
        )}

        {schedule.hasFiltered && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-neutral-400">Ticket Price</p>

              <p className="text-xl font-bold text-neutral-900">
                {schedule.selectedCinema
                  ? formatPrice(schedule.selectedPrice)
                  : "Choose cinema first"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleBookNow}
              disabled={!schedule.canBook || bookingLoading}
              className="h-14 rounded-lg bg-primary px-16 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {bookingLoading ? "Creating Order..." : "Book Now"}
            </button>
          </div>
        )}
      </section>
    </HomeLayout>
  );
}

function MovieDetailPage() {
  const { slug } = useParams();
  const auth = useSelector((state) => state.auth);

  return <MovieDetailContent key={slug} slug={slug} auth={auth} />;
}

export default MovieDetailPage;
