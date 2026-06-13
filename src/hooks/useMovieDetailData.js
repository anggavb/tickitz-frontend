import { useEffect, useState } from "react";
import {
  getMovieDetail,
  getMovieLocations,
  getMovieScheduleOptions,
  getMovieShowtimes,
} from "../utils/api/movieDetailApi";
import {
  normalizeDateOptions,
  normalizeLocationOptions,
  normalizeMovieDetail,
  normalizeTimeOptions,
} from "../utils/api/movieDetailMappers";
import {
  getErrorMessage,
  getSettledData,
  isCanceledRequest,
} from "../utils/api/movieDetailRequestUtils";

export default function useMovieDetailData(slug) {
  const [movie, setMovie] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scheduleWarning, setScheduleWarning] = useState("");

  useEffect(() => {
    if (!slug) return undefined;

    const controller = new AbortController();

    async function fetchMoviePageData() {
      try {
        setLoading(true);
        setError("");
        setScheduleWarning("");

        const movieResponse = await getMovieDetail(slug, {
          signal: controller.signal,
        });

        const [scheduleOptionResult, locationResult, timeResult] =
          await Promise.allSettled([
            getMovieScheduleOptions(slug, { signal: controller.signal }),
            getMovieLocations({ signal: controller.signal }),
            getMovieShowtimes({ signal: controller.signal }),
          ]);

        const rawMovie = movieResponse.data?.data ?? movieResponse.data;
        const rawScheduleOptions = getSettledData(scheduleOptionResult, {});
        const rawLocations = getSettledData(locationResult, []);
        const rawTimes = getSettledData(timeResult, []);

        setMovie(normalizeMovieDetail(rawMovie));
        setDateOptions(normalizeDateOptions(rawScheduleOptions));
        setLocationOptions(normalizeLocationOptions(rawLocations));
        setTimeOptions(normalizeTimeOptions(rawTimes));

        if (
          scheduleOptionResult.status === "rejected" ||
          locationResult.status === "rejected" ||
          timeResult.status === "rejected"
        ) {
          setScheduleWarning(
            "Some schedule options failed to load. You can still try filtering.",
          );
        }
      } catch (err) {
        if (isCanceledRequest(err)) return;

        setMovie(null);
        setError(getErrorMessage(err, "Something went wrong"));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMoviePageData();

    return () => {
      controller.abort();
    };
  }, [slug]);

  return {
    movie,
    dateOptions,
    locationOptions,
    timeOptions,
    loading,
    error,
    scheduleWarning,
  };
}
