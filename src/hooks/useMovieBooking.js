import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import SweetAlert from "../components/ui/SweetAlert";
import apiClient from "../utils/axios";
import {
  isPastDateValue,
  isPastTimeForDate,
} from "../utils/api/movieDetailMappers";
import { getErrorMessage } from "../utils/api/movieDetailRequestUtils";

export default function useMovieBooking({
  slug,
  movie,
  selectedSchedule,
  auth,
}) {
  const navigate = useNavigate();
  const [bookingLoading, setBookingLoading] = useState(false);

  const redirectToSignin = useCallback(async () => {
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
  }, [navigate, slug]);

  const handleBookNow = useCallback(async () => {
    if (!selectedSchedule.canBook) return;

    if (
      isPastDateValue(
        selectedSchedule.selectedDate,
        selectedSchedule.currentDateValue,
      ) ||
      isPastTimeForDate(
        selectedSchedule.selectedTime,
        selectedSchedule.selectedDate,
        selectedSchedule.currentDateValue,
        selectedSchedule.currentTimeValue,
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
      setBookingLoading(true);

      const response = await apiClient.post("/orders", {
        movie_cinema_id: Number(selectedSchedule.selectedMovieCinemaId),
      });

      const order = response.data?.data ?? response.data;

      navigate(`/movies/${slug}/booking`, {
        state: {
          order,
          orderId: order?.id,
          movie,
          movieCinemaId: selectedSchedule.selectedMovieCinemaId,
          selectedDate: selectedSchedule.selectedDate,
          selectedTime: selectedSchedule.selectedTimeLabel,
          selectedLocation: selectedSchedule.selectedLocation,
          selectedCinema: selectedSchedule.selectedCinema,
          price: selectedSchedule.selectedPrice,
        },
      });
    } catch (err) {
      if (err.response?.status === 401) {
        await redirectToSignin();
        return;
      }

      await SweetAlert.error({
        title: "Failed to create order",
        text: getErrorMessage(err, "Please try again later."),
      });
    } finally {
      setBookingLoading(false);
    }
  }, [auth, movie, navigate, redirectToSignin, selectedSchedule, slug]);

  return {
    bookingLoading,
    handleBookNow,
  };
}
