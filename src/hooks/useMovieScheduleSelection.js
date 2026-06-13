import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getFilteredMovieSchedules } from "../utils/api/movieDetailApi";
import {
  getCinemaList,
  getLocalDateValue,
  getLocalTimeValue,
  isPastDateValue,
  isPastTimeForDate,
  normalizeSchedules,
} from "../utils/api/movieDetailMappers";
import {
  getErrorMessage,
  isCanceledRequest,
} from "../utils/api/movieDetailRequestUtils";

const CINEMA_PER_PAGE = 4;
const EMPTY_FILTER = {
  date: "",
  time: "",
  location: "",
};

export default function useMovieScheduleSelection({
  slug,
  dateOptions,
  timeOptions,
  initialScheduleError = "",
}) {
  const filterAbortRef = useRef(null);
  const [now, setNow] = useState(() => new Date());
  const [cinemaSchedules, setCinemaSchedules] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [appliedFilter, setAppliedFilter] = useState(EMPTY_FILTER);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [selectedMovieCinemaId, setSelectedMovieCinemaId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFiltered, setHasFiltered] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState("");
  const [hideInitialScheduleError, setHideInitialScheduleError] =
    useState(false);

  const currentDateValue = useMemo(() => getLocalDateValue(now), [now]);
  const currentTimeValue = useMemo(() => getLocalTimeValue(now), [now]);

  const resetSelectedSchedule = useCallback(() => {
    setSelectedLocation("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedCinemaId("");
    setSelectedMovieCinemaId("");
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      filterAbortRef.current?.abort();
    };
  }, []);

  const selectableDateOptions = useMemo(() => {
    return dateOptions.filter(
      (date) => !isPastDateValue(date, currentDateValue),
    );
  }, [dateOptions, currentDateValue]);

  const isTimeOptionDisabled = useCallback(
    (timeValue, dateValue = filterDate) => {
      return isPastTimeForDate(
        timeValue,
        dateValue,
        currentDateValue,
        currentTimeValue,
      );
    },
    [currentDateValue, currentTimeValue, filterDate],
  );

  const selectedTimeLabel = useMemo(() => {
    return (
      timeOptions.find((timeOption) => timeOption.value === selectedTime)
        ?.label ?? selectedTime
    );
  }, [timeOptions, selectedTime]);

  const appliedTimeLabel = useMemo(() => {
    return (
      timeOptions.find((timeOption) => timeOption.value === appliedFilter.time)
        ?.label ?? appliedFilter.time
    );
  }, [timeOptions, appliedFilter.time]);

  const cinemaList = useMemo(() => {
    return getCinemaList(
      cinemaSchedules,
      appliedFilter.date,
      appliedFilter.time,
      appliedFilter.location,
    );
  }, [cinemaSchedules, appliedFilter]);

  const selectedCinema = useMemo(() => {
    return cinemaList.find((cinema) => cinema.id === selectedCinemaId) ?? null;
  }, [cinemaList, selectedCinemaId]);

  const selectedShowtime = useMemo(() => {
    return (
      selectedCinema?.showtimes.find(
        (showtime) =>
          String(showtime.movieCinemaID) === String(selectedMovieCinemaId),
      ) ?? null
    );
  }, [selectedCinema, selectedMovieCinemaId]);

  const isFilterApplied =
    appliedFilter.date !== "" ||
    appliedFilter.time !== "" ||
    appliedFilter.location !== "";

  const activeCinemaId = selectedCinema?.id ?? "";
  const selectedPrice = selectedShowtime?.price ?? selectedCinema?.price ?? "";
  const canBook =
    selectedDate &&
    selectedTime &&
    selectedLocation &&
    selectedCinema &&
    selectedMovieCinemaId;

  const totalPages = Math.ceil(cinemaList.length / CINEMA_PER_PAGE);

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  const visibleCinemas = useMemo(() => {
    const startIndex = (currentPage - 1) * CINEMA_PER_PAGE;
    const endIndex = startIndex + CINEMA_PER_PAGE;

    return cinemaList.slice(startIndex, endIndex);
  }, [cinemaList, currentPage]);

  const emptyScheduleMessage = useMemo(() => {
    const { date, time, location } = appliedFilter;
    const timeLabel = appliedTimeLabel;

    if (!isFilterApplied) return "No cinema schedule available.";
    if (location && time && date) {
      return `No cinema available in ${location} at ${timeLabel} on ${date}.`;
    }
    if (location && time) {
      return `No cinema available in ${location} at ${timeLabel}.`;
    }
    if (location && date) return `No cinema available in ${location} on ${date}.`;
    if (time && date) return `No cinema available at ${timeLabel} on ${date}.`;
    if (location) return `No cinema available in ${location}.`;
    if (time) return `No cinema available at ${timeLabel}.`;
    if (date) return `No cinema available on ${date}.`;

    return "No cinema schedule matches your filter.";
  }, [appliedFilter, appliedTimeLabel, isFilterApplied]);

  const handleDateChange = useCallback(
    (nextDate) => {
      setFilterDate(nextDate);

      if (filterTime && isTimeOptionDisabled(filterTime, nextDate)) {
        setFilterTime("");
      }
    },
    [filterTime, isTimeOptionDisabled],
  );

  const resetFilterResult = useCallback(() => {
    setHasFiltered(false);
    setCinemaSchedules([]);
    resetSelectedSchedule();
    setCurrentPage(1);
  }, [resetSelectedSchedule]);

  const handleFilter = useCallback(async () => {
    setHideInitialScheduleError(true);

    const nextAppliedFilter = {
      date: filterDate,
      time: filterTime,
      location: filterLocation,
    };

    if (
      !nextAppliedFilter.date &&
      !nextAppliedFilter.time &&
      !nextAppliedFilter.location
    ) {
      setScheduleError("Choose at least one date, time, or location first.");
      resetFilterResult();
      return;
    }

    if (isPastDateValue(nextAppliedFilter.date, currentDateValue)) {
      setScheduleError("Choose a date that has not passed.");
      resetFilterResult();
      return;
    }

    if (
      isPastTimeForDate(
        nextAppliedFilter.time,
        nextAppliedFilter.date,
        currentDateValue,
        currentTimeValue,
      )
    ) {
      setScheduleError("Choose a time that has not passed.");
      resetFilterResult();
      return;
    }

    filterAbortRef.current?.abort();
    const controller = new AbortController();
    filterAbortRef.current = controller;

    try {
      setScheduleLoading(true);
      setScheduleError("");

      const scheduleResponse = await getFilteredMovieSchedules(
        slug,
        nextAppliedFilter,
        { signal: controller.signal },
      );
      const rawSchedules = scheduleResponse.data?.data ?? scheduleResponse.data;

      setCinemaSchedules(normalizeSchedules(rawSchedules));
      setHasFiltered(true);
      setAppliedFilter(nextAppliedFilter);
      resetSelectedSchedule();
      setCurrentPage(1);
    } catch (err) {
      if (isCanceledRequest(err)) return;

      setScheduleError(
        getErrorMessage(err, "Failed to load cinema schedules."),
      );
      setCinemaSchedules([]);
      setHasFiltered(true);
      setAppliedFilter(nextAppliedFilter);
      resetSelectedSchedule();
      setCurrentPage(1);
    } finally {
      if (filterAbortRef.current === controller) {
        setScheduleLoading(false);
        filterAbortRef.current = null;
      }
    }
  }, [
    currentDateValue,
    currentTimeValue,
    filterDate,
    filterLocation,
    filterTime,
    resetFilterResult,
    resetSelectedSchedule,
    slug,
  ]);

  const visibleScheduleError =
    scheduleError || (!hideInitialScheduleError ? initialScheduleError : "");

  const handleSelectCinema = useCallback(
    (cinema) => {
      const firstShowtime = cinema.showtimes[0];

      if (!firstShowtime) return;

      const nextDate = appliedFilter.date || firstShowtime.showDate || "";
      const nextTime = appliedFilter.time || firstShowtime.timeValue || "";
      const nextLocation = appliedFilter.location || cinema.location || "";

      setSelectedCinemaId(cinema.id);
      setSelectedDate(nextDate);
      setSelectedTime(nextTime);
      setSelectedLocation(nextLocation);
      setSelectedMovieCinemaId(String(firstShowtime.movieCinemaID));

      setFilterDate(nextDate);
      setFilterTime(nextTime);
      setFilterLocation(nextLocation);
    },
    [appliedFilter],
  );

  const handleSelectMobileTime = useCallback(
    (cinema, showtime) => {
      if (!showtime) return;

      const nextDate = appliedFilter.date || showtime.showDate || "";
      const nextTime = showtime.timeValue;
      const nextLocation = appliedFilter.location || cinema.location || "";

      setSelectedCinemaId(cinema.id);
      setSelectedDate(nextDate);
      setSelectedTime(nextTime);
      setSelectedLocation(nextLocation);
      setSelectedMovieCinemaId(String(showtime.movieCinemaID));

      setFilterDate(nextDate);
      setFilterTime(nextTime);
      setFilterLocation(nextLocation);
    },
    [appliedFilter],
  );

  return {
    filterDate,
    filterTime,
    filterLocation,
    selectableDateOptions,
    scheduleLoading,
    scheduleError: visibleScheduleError,
    hasFiltered,
    cinemaList,
    visibleCinemas,
    emptyScheduleMessage,
    totalPages,
    pages,
    currentPage,
    selectedCinemaId,
    selectedDate,
    selectedTime,
    selectedTimeLabel,
    selectedLocation,
    selectedMovieCinemaId,
    selectedCinema,
    selectedPrice,
    canBook,
    activeCinemaId,
    currentDateValue,
    currentTimeValue,
    setFilterTime,
    setFilterLocation,
    setCurrentPage,
    handleDateChange,
    handleFilter,
    handleSelectCinema,
    handleSelectMobileTime,
    isTimeOptionDisabled,
  };
}
