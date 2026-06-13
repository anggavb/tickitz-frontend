import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CinemaList from "../components/movie-detail/CinemaList";
import MovieDetailFilterBar from "../components/movie-detail/MovieDetailFilterBar";
import MovieDetailHero from "../components/movie-detail/MovieDetailHero";
import {
  MovieDetailErrorState,
  MovieDetailLoadingState,
} from "../components/movie-detail/MovieDetailStates";
import SelectedSchedulePicker from "../components/movie-detail/SelectedSchedulePicker";
import HomeLayout from "../layouts/HomeLayout";
import useMovieBooking from "../hooks/useMovieBooking";
import useMovieDetailData from "../hooks/useMovieDetailData";
import useMovieScheduleSelection from "../hooks/useMovieScheduleSelection";
import { formatPrice } from "../utils/api/movieDetailMappers";

function MovieDetailContent({ slug, auth }) {
  const {
    movie,
    dateOptions,
    locationOptions,
    timeOptions,
    loading,
    error,
    scheduleWarning,
  } = useMovieDetailData(slug);

  const schedule = useMovieScheduleSelection({
    slug,
    dateOptions,
    timeOptions,
    initialScheduleError: scheduleWarning,
  });

  const { bookingLoading, handleBookNow } = useMovieBooking({
    slug,
    movie,
    auth,
    selectedSchedule: {
      canBook: schedule.canBook,
      currentDateValue: schedule.currentDateValue,
      currentTimeValue: schedule.currentTimeValue,
      selectedCinema: schedule.selectedCinema,
      selectedDate: schedule.selectedDate,
      selectedLocation: schedule.selectedLocation,
      selectedMovieCinemaId: schedule.selectedMovieCinemaId,
      selectedPrice: schedule.selectedPrice,
      selectedTime: schedule.selectedTime,
      selectedTimeLabel: schedule.selectedTimeLabel,
    },
  });

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
          onDateChange={schedule.handleDateChange}
          onTimeChange={schedule.setFilterTime}
          onLocationChange={schedule.setFilterLocation}
          onFilter={schedule.handleFilter}
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
          onPageChange={schedule.setCurrentPage}
          onSelectCinema={schedule.handleSelectCinema}
          onSelectMobileTime={schedule.handleSelectMobileTime}
        />

        {schedule.selectedCinema && (
          <SelectedSchedulePicker
            cinema={schedule.selectedCinema}
            selectedMovieCinemaId={schedule.selectedMovieCinemaId}
            onSelect={(showtime) =>
              schedule.handleSelectMobileTime(schedule.selectedCinema, showtime)
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
