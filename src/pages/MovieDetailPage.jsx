import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import HomeLayout from "../layouts/HomeLayout";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:8081"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
});

const fallbackMovie = {
  title: "Untitled Movie",
  background:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
  poster:
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
  genres: [],
  releaseDate: "-",
  director: "-",
  duration: "-",
  casts: "-",
  synopsis: "-",
  schedules: [],
};

async function getMoviePageData(slug) {
  const [movieResponse, scheduleResponse, locationResponse, timeResponse] =
    await Promise.all([
      api.get(`/movies/${slug}`),
      api.get(`/movies/${slug}/schedules`),
      api.get("/movies/locations"),
      api.get("/movies/showtimes"),
    ]);

  return {
    movieResult: movieResponse.data,
    scheduleResult: scheduleResponse.data,
    locationResult: locationResponse.data,
    timeResult: timeResponse.data,
  };
}

function buildAssetUrl(path) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeTextValue(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function getTimeLabel(time) {
  return String(time ?? "").trim();
}

function getTimeValue(time) {
  const rawTime = getTimeLabel(time);

  if (!rawTime) return "";

  const amPmMatch = rawTime.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/i);

  if (amPmMatch) {
    let hour = Number(amPmMatch[1]);
    const minute = Number(amPmMatch[2]);
    const period = amPmMatch[3].toUpperCase();

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    return String(hour * 60 + minute);
  }

  const time24Match = rawTime.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);

  if (time24Match) {
    const hour = Number(time24Match[1]);
    const minute = Number(time24Match[2]);

    return String(hour * 60 + minute);
  }

  return normalizeTextValue(rawTime);
}

function formatDuration(movie) {
  const duration =
    movie?.duration_in_min ?? movie?.duration_in_minute ?? movie?.duration;

  if (!duration) return fallbackMovie.duration;

  return typeof duration === "number" ? `${duration} minutes` : duration;
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "-";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

function normalizeMovie(rawMovie) {
  const posterPath =
    rawMovie?.poster ?? rawMovie?.image_poster ?? rawMovie?.image ?? "";

  const backgroundPath =
    rawMovie?.background ??
    rawMovie?.image_background ??
    rawMovie?.image_poster ??
    rawMovie?.image ??
    "";

  return {
    title: rawMovie?.title ?? rawMovie?.name ?? fallbackMovie.title,
    background: buildAssetUrl(backgroundPath) || fallbackMovie.background,
    poster: buildAssetUrl(posterPath) || fallbackMovie.poster,
    genres:
      rawMovie?.genres ??
      rawMovie?.genres_categories ??
      rawMovie?.categories ??
      [],
    releaseDate:
      rawMovie?.releaseDate ??
      rawMovie?.release_date ??
      fallbackMovie.releaseDate,
    director:
      rawMovie?.director ?? rawMovie?.director_name ?? fallbackMovie.director,
    duration: formatDuration(rawMovie),
    casts: Array.isArray(rawMovie?.casts)
      ? rawMovie.casts.join(", ")
      : (rawMovie?.casts ?? fallbackMovie.casts),
    synopsis: rawMovie?.synopsis ?? fallbackMovie.synopsis,
    schedules: [],
  };
}

function normalizeOptionArray(rawData, keys = []) {
  const rows = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
      ? rawData
      : [];

  return [
    ...new Set(
      rows
        .map((item) => {
          if (typeof item === "string") return item.trim();

          for (const key of keys) {
            if (item?.[key]) return String(item[key]).trim();
          }

          return "";
        })
        .filter(Boolean),
    ),
  ].sort();
}

function normalizeLocationOptions(rawData) {
  return normalizeOptionArray(rawData, [
    "location",
    "name",
    "city",
    "location_name",
  ]);
}

function normalizeTimeOptions(rawData) {
  const rows = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray(rawData)
      ? rawData
      : [];

  const timeMap = new Map();

  rows.forEach((item) => {
    const rawTime =
      typeof item === "string"
        ? item
        : (item?.showtime ?? item?.time ?? item?.show_time ?? "");

    const label = getTimeLabel(rawTime);
    const value = getTimeValue(rawTime);

    if (!label || !value) return;

    if (!timeMap.has(value)) {
      timeMap.set(value, {
        label,
        value,
      });
    }
  });

  return Array.from(timeMap.values());
}

function normalizeSchedules(rows = []) {
  const locationMap = new Map();

  rows.forEach((row) => {
    const location = row.location ?? "Unknown Location";
    const cinemaName = row.cinema_name ?? row.cinemaName ?? "Unknown Cinema";

    const showDate =
      row.show_date ?? row.showDate ?? row.date ?? row.schedule_date ?? "";

    const rawTime = row.showtime ?? row.time ?? row.show_time ?? "";
    const timeLabel = getTimeLabel(rawTime);
    const timeValue = getTimeValue(rawTime);

    const price = row.price ?? row.ticket_price ?? row.movie_price ?? "";

    if (!showDate || !timeLabel || !timeValue) return;

    if (!locationMap.has(location)) {
      locationMap.set(location, new Map());
    }

    const cinemaMap = locationMap.get(location);

    if (!cinemaMap.has(cinemaName)) {
      cinemaMap.set(cinemaName, []);
    }

    cinemaMap.get(cinemaName).push({
      showDate,
      timeLabel,
      timeValue,
      price,
    });
  });

  return Array.from(locationMap.entries()).map(([location, cinemaMap]) => ({
    location,
    cinemas: Array.from(cinemaMap.entries()).map(([cinemaName, showtimes]) => ({
      cinema_name: cinemaName,
      showtimes: showtimes.sort((a, b) => {
        const dateCompare = a.showDate.localeCompare(b.showDate);

        if (dateCompare !== 0) return dateCompare;

        return Number(a.timeValue) - Number(b.timeValue);
      }),
    })),
  }));
}

function getCinemaList(schedules, date, timeValue, location) {
  const normalizedLocation = normalizeTextValue(location);

  return schedules
    .filter((schedule) => {
      if (!normalizedLocation) return true;

      return normalizeTextValue(schedule.location) === normalizedLocation;
    })
    .flatMap((schedule) =>
      schedule.cinemas.map((cinema) => {
        const showtimes = cinema.showtimes.filter((showtime) => {
          const matchDate = date ? showtime.showDate === date : true;
          const matchTime = timeValue ? showtime.timeValue === timeValue : true;

          return matchDate && matchTime;
        });

        const firstShowtime = showtimes[0];

        return {
          id: `${schedule.location}-${cinema.cinema_name}`,
          location: schedule.location,
          name: cinema.cinema_name,
          logo: cinema.cinema_name,
          price: firstShowtime?.price ?? "",
          showtimes,
        };
      }),
    )
    .filter((cinema) => cinema.showtimes.length > 0);
}

function MovieDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(fallbackMovie);

  const [locationOptions, setLocationOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);

  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const [appliedFilter, setAppliedFilter] = useState({
    date: "",
    time: "",
    location: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cinemaPerPage = 4;

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

  const scheduleDateRange = useMemo(() => {
    const dates = movie.schedules
      .flatMap((schedule) => schedule.cinemas)
      .flatMap((cinema) => cinema.showtimes)
      .map((showtime) => showtime.showDate)
      .filter(Boolean)
      .sort();

    return {
      minDate: dates[0] ?? "",
      maxDate: dates[dates.length - 1] ?? "",
    };
  }, [movie.schedules]);

  const cinemaList = useMemo(() => {
    return getCinemaList(
      movie.schedules,
      appliedFilter.date,
      appliedFilter.time,
      appliedFilter.location,
    );
  }, [movie.schedules, appliedFilter]);

  const selectedCinema = useMemo(() => {
    return cinemaList.find((cinema) => cinema.id === selectedCinemaId) ?? null;
  }, [cinemaList, selectedCinemaId]);

  const isFilterApplied =
    appliedFilter.date !== "" ||
    appliedFilter.time !== "" ||
    appliedFilter.location !== "";

  const activeCinemaId = selectedCinema?.id ?? "";
  const selectedPrice = selectedCinema?.price ?? "";

  const canBook =
    selectedDate && selectedTime && selectedLocation && selectedCinema;

  const totalPages = Math.ceil(cinemaList.length / cinemaPerPage);

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  const visibleCinemas = useMemo(() => {
    const startIndex = (currentPage - 1) * cinemaPerPage;
    const endIndex = startIndex + cinemaPerPage;

    return cinemaList.slice(startIndex, endIndex);
  }, [cinemaList, currentPage]);

  const emptyScheduleMessage = useMemo(() => {
    const { date, time, location } = appliedFilter;
    const timeLabel = appliedTimeLabel;

    if (!isFilterApplied) {
      return "No cinema schedule available.";
    }

    if (location && time && date) {
      return `No cinema available in ${location} at ${timeLabel} on ${date}.`;
    }

    if (location && time) {
      return `No cinema available in ${location} at ${timeLabel}.`;
    }

    if (location && date) {
      return `No cinema available in ${location} on ${date}.`;
    }

    if (time && date) {
      return `No cinema available at ${timeLabel} on ${date}.`;
    }

    if (location) return `No cinema available in ${location}.`;

    if (time) return `No cinema available at ${timeLabel}.`;

    if (date) return `No cinema available on ${date}.`;

    return "No cinema schedule matches your filter.";
  }, [appliedFilter, appliedTimeLabel, isFilterApplied]);

  useEffect(() => {
    async function fetchMoviePageData() {
      try {
        setLoading(true);
        setError("");

        const { movieResult, scheduleResult, locationResult, timeResult } =
          await getMoviePageData(slug);

        const rawMovie = movieResult?.data ?? movieResult;
        const rawSchedules = scheduleResult?.data ?? [];

        const normalizedMovie = normalizeMovie(rawMovie);
        const normalizedSchedules = normalizeSchedules(rawSchedules);
        const normalizedLocations = normalizeLocationOptions(locationResult);
        const normalizedTimes = normalizeTimeOptions(timeResult);

        setMovie({
          ...normalizedMovie,
          schedules: normalizedSchedules,
        });

        setLocationOptions(normalizedLocations);
        setTimeOptions(normalizedTimes);

        setFilterLocation("");
        setFilterDate("");
        setFilterTime("");

        setAppliedFilter({
          date: "",
          time: "",
          location: "",
        });

        setSelectedLocation("");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedCinemaId("");

        setCurrentPage(1);
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchMoviePageData();
    }
  }, [slug]);

  const handleFilter = () => {
    const nextAppliedFilter = {
      date: filterDate,
      time: filterTime,
      location: filterLocation,
    };

    const nextCinemaList = getCinemaList(
      movie.schedules,
      nextAppliedFilter.date,
      nextAppliedFilter.time,
      nextAppliedFilter.location,
    );

    const firstCinema = nextCinemaList[0];
    const firstShowtime = firstCinema?.showtimes?.[0];

    setAppliedFilter(nextAppliedFilter);

    setSelectedDate(nextAppliedFilter.date || firstShowtime?.showDate || "");
    setSelectedTime(nextAppliedFilter.time || firstShowtime?.timeValue || "");
    setSelectedLocation(
      nextAppliedFilter.location || firstCinema?.location || "",
    );
    setSelectedCinemaId(firstCinema?.id ?? "");

    setCurrentPage(1);
  };

  const handleSelectCinema = (cinema) => {
    const firstShowtime = cinema.showtimes[0];

    if (!firstShowtime) return;

    const nextDate = appliedFilter.date || firstShowtime.showDate || "";
    const nextTime = appliedFilter.time || firstShowtime.timeValue || "";
    const nextLocation = appliedFilter.location || cinema.location || "";

    setSelectedCinemaId(cinema.id);
    setSelectedDate(nextDate);
    setSelectedTime(nextTime);
    setSelectedLocation(nextLocation);

    setFilterDate(nextDate);
    setFilterTime(nextTime);
    setFilterLocation(nextLocation);
  };

  const handleSelectMobileTime = (cinema, showtime) => {
    if (!showtime) return;

    const nextDate = appliedFilter.date || showtime.showDate || "";
    const nextTime = showtime.timeValue;
    const nextLocation = appliedFilter.location || cinema.location || "";

    setSelectedCinemaId(cinema.id);
    setSelectedDate(nextDate);
    setSelectedTime(nextTime);
    setSelectedLocation(nextLocation);

    setFilterDate(nextDate);
    setFilterTime(nextTime);
    setFilterLocation(nextLocation);
  };

  const handleBookNow = () => {
    if (!canBook) return;

    navigate(`/movies/${slug}/booking`, {
      state: {
        movie,
        selectedDate,
        selectedTime: selectedTimeLabel,
        selectedLocation,
        selectedCinema,
        price: selectedPrice,
      },
    });
  };

  if (loading) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-white px-5">
          <p className="text-sm font-medium text-neutral-500">
            Loading movie detail...
          </p>
        </section>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-white px-5">
          <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-5 text-center">
            <h1 className="text-base font-semibold text-red-600">
              Failed to load movie
            </h1>

            <p className="mt-2 text-sm text-red-500">{error}</p>
          </div>
        </section>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <section
        className="relative min-h-72 bg-cover bg-center bg-no-repeat lg:min-h-96"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.45)
          ), url(${movie.background})`,
        }}
      />

      <section className="relative z-10 px-5 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-10 xl:grid-cols-[320px_1fr]">
          <div className="-mt-20 flex justify-center sm:-mt-32 lg:-mt-40 lg:block">
            <img
              src={movie.poster}
              alt={movie.title}
              className="aspect-2/3 w-full max-w-55 rounded-lg object-cover shadow-xl sm:max-w-72 lg:max-w-none lg:rounded-xl"
            />
          </div>

          <div className="text-center lg:pt-10 lg:text-left">
            <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl lg:text-5xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-medium text-neutral-500 sm:px-5 sm:py-2 sm:text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-left sm:gap-y-6 lg:max-w-xl">
              <MovieInfo label="Release date" value={movie.releaseDate} />
              <MovieInfo label="Directed by" value={movie.director} />
              <MovieInfo label="Duration" value={movie.duration} />
              <MovieInfo label="Casts" value={movie.casts} />
            </div>
          </div>
        </div>

        <section className="mx-auto mt-8 max-w-7xl sm:mt-12">
          <h2 className="text-base font-semibold text-neutral-900 sm:text-2xl">
            Synopsis
          </h2>

          <p className="mt-3 max-w-4xl text-xs leading-6 text-neutral-500 sm:mt-5 sm:text-base sm:leading-8">
            {movie.synopsis}
          </p>
        </section>

        <section className="mx-auto max-w-7xl py-8 sm:py-12">
          <h2 className="mb-5 text-center text-base font-semibold text-neutral-900 sm:mb-8 sm:text-3xl">
            Showtimes and Tickets
          </h2>

          <div className="mx-auto grid max-w-sm gap-3 lg:max-w-none lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-5">
            <FilterField label="Choose Date">
              <input
                type="date"
                value={filterDate}
                min={scheduleDateRange.minDate}
                max={scheduleDateRange.maxDate}
                disabled={
                  !scheduleDateRange.minDate || !scheduleDateRange.maxDate
                }
                onChange={(event) => setFilterDate(event.target.value)}
                className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm lg:h-16 lg:text-base"
              />
            </FilterField>

            <FilterField label="Choose Time" className="hidden lg:block">
              <select
                value={filterTime}
                onChange={(event) => setFilterTime(event.target.value)}
                disabled={timeOptions.length === 0}
                className="h-16 w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 text-base font-semibold text-neutral-600 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {timeOptions.length === 0 ? (
                  <option value="">No time available</option>
                ) : (
                  <>
                    <option value="">All Times</option>

                    {timeOptions.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </FilterField>

            <FilterField label="Choose Location">
              <select
                value={filterLocation}
                onChange={(event) => setFilterLocation(event.target.value)}
                disabled={locationOptions.length === 0}
                className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
              >
                {locationOptions.length === 0 ? (
                  <option value="">No location available</option>
                ) : (
                  <>
                    <option value="">All Locations</option>

                    {locationOptions.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </FilterField>

            <button
              type="button"
              onClick={handleFilter}
              className="h-10 rounded-md bg-primary px-10 text-xs font-semibold text-white transition hover:opacity-90 sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
            >
              Filter
            </button>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-neutral-400 sm:text-sm">
            {isFilterApplied
              ? `${cinemaList.length} Result`
              : `${cinemaList.length} Result - Showing all schedules`}
          </p>
        </section>

        <section className="mx-auto max-w-7xl">
          <div className="mb-8 hidden text-center lg:flex lg:items-center lg:justify-center lg:gap-5">
            <h2 className="text-2xl font-bold text-neutral-900">
              Choose Cinema
            </h2>

            <p className="text-lg font-bold text-neutral-400">
              {cinemaList.length} Result
            </p>
          </div>

          {visibleCinemas.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-8 text-center">
              <p className="text-sm font-semibold text-neutral-700">
                {emptyScheduleMessage}
              </p>

              <p className="mt-2 text-xs text-neutral-400">
                Try choosing another location, time, or date.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 lg:hidden">
                {visibleCinemas.map((cinema, cinemaIndex) => (
                  <CinemaMobileCard
                    key={cinema.id}
                    cinema={cinema}
                    open={cinemaIndex === 0}
                    selectedDate={
                      cinema.id === selectedCinemaId ? selectedDate : filterDate
                    }
                    selectedTime={
                      cinema.id === selectedCinemaId ? selectedTime : filterTime
                    }
                    onSelectTime={(showtime) =>
                      handleSelectMobileTime(cinema, showtime)
                    }
                  />
                ))}
              </div>

              <div className="hidden gap-5 lg:grid lg:grid-cols-4">
                {visibleCinemas.map((cinema) => (
                  <CinemaDesktopCard
                    key={cinema.id}
                    cinema={cinema}
                    active={cinema.id === activeCinemaId}
                    onClick={() => handleSelectCinema(cinema)}
                  />
                ))}
              </div>
            </>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3">
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-md text-xs font-semibold transition sm:h-12 sm:w-12 sm:text-base ${
                    page === currentPage
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-neutral-400">Ticket Price</p>

              <p className="text-xl font-bold text-neutral-900">
                {selectedCinema
                  ? formatPrice(selectedPrice)
                  : "Choose cinema first"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleBookNow}
              disabled={!canBook}
              className="h-14 rounded-lg bg-primary px-16 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Book Now
            </button>
          </div>
        </section>
      </section>
    </HomeLayout>
  );
}

function MovieInfo({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-neutral-400 sm:text-sm">{label}</p>
      <p className="mt-1 line-clamp-3 text-xs font-medium text-neutral-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}

function FilterField({ label, className = "block", children }) {
  return (
    <label className={className}>
      <span className="mb-3 hidden text-sm font-semibold text-neutral-700 lg:block">
        {label}
      </span>

      {children}
    </label>
  );
}

function CinemaMobileCard({
  cinema,
  open,
  selectedDate,
  selectedTime,
  onSelectTime,
}) {
  return (
    <details
      open={open}
      className="group rounded-lg border border-neutral-200 bg-white px-5 py-5 shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-black leading-none text-primary">
            {cinema.logo}
          </p>

          <h3 className="mt-4 text-base font-semibold text-neutral-900">
            {cinema.name}
          </h3>

          <p className="mt-1 max-w-55 text-[11px] leading-5 text-neutral-400">
            {cinema.location}
          </p>

          <p className="mt-3 text-sm font-bold text-neutral-900">
            {formatPrice(cinema.price)}
          </p>
        </div>

        <svg
          className="mt-8 h-4 w-4 shrink-0 text-neutral-900 transition group-open:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </summary>

      <div className="mt-5 border-t border-neutral-100 pt-5">
        <h4 className="mb-3 text-xs font-semibold text-neutral-900">
          Available Times
        </h4>

        <div className="flex flex-wrap gap-2">
          {cinema.showtimes.map((showtime, index) => {
            const isActive =
              showtime.showDate === selectedDate &&
              showtime.timeValue === selectedTime;

            return (
              <button
                key={`${cinema.id}-${showtime.showDate}-${showtime.timeValue}-${index}`}
                type="button"
                onClick={() => onSelectTime(showtime)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-primary hover:text-white"
                }`}
              >
                {showtime.timeLabel}
              </button>
            );
          })}
        </div>
      </div>
    </details>
  );
}

function CinemaDesktopCard({ cinema, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-44 flex-col items-center justify-center rounded-lg border-2 px-6 text-center transition ${
        active
          ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
          : "border-neutral-200 bg-white text-primary hover:border-primary"
      }`}
    >
      <span className="text-2xl font-black tracking-wide">{cinema.logo}</span>

      <span
        className={`mt-2 text-xs font-medium ${
          active ? "text-white/80" : "text-neutral-400"
        }`}
      >
        {cinema.location}
      </span>
    </button>
  );
}

export default MovieDetailPage;
