import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import HomeLayout from "../layouts/HomeLayout";

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

function formatDuration(rawMovie) {
  const duration =
    rawMovie?.duration_in_min ??
    rawMovie?.duration_in_minute ??
    rawMovie?.duration;

  if (!duration) return fallbackMovie.duration;

  if (typeof duration === "number") {
    return `${duration} minutes`;
  }

  return duration;
}

function formatTimeToAmPm(time) {
  if (!time) return "";

  const [hourValue, minute = "00"] = time.split(":");
  const hour = Number(hourValue);

  if (Number.isNaN(hour)) return time;

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${period}`;
}

function normalizeMovie(rawMovie) {
  return {
    title: rawMovie?.title ?? rawMovie?.name ?? fallbackMovie.title,
    background:
      rawMovie?.background ??
      rawMovie?.image_background ??
      rawMovie?.image_poster ??
      rawMovie?.image ??
      fallbackMovie.background,
    poster:
      rawMovie?.poster ??
      rawMovie?.image_poster ??
      rawMovie?.image ??
      fallbackMovie.poster,
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
    schedules: Array.isArray(rawMovie?.schedules) ? rawMovie.schedules : [],
  };
}

function MovieDetailPage() {
  const { slug } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [movie, setMovie] = useState(fallbackMovie);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("2026-07-21");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cinemaPerPage = 4;

  const locationOptions = useMemo(() => {
    return movie.schedules.map((schedule) => schedule.location);
  }, [movie.schedules]);

  const timeOptions = useMemo(() => {
    const times = movie.schedules.flatMap((schedule) =>
      schedule.cinemas.flatMap((cinema) => cinema.showtimes),
    );

    return [...new Set(times)];
  }, [movie.schedules]);

  const filteredSchedules = useMemo(() => {
    return movie.schedules
      .filter((schedule) => {
        if (!selectedLocation) return true;

        return schedule.location === selectedLocation;
      })
      .map((schedule) => ({
        ...schedule,
        cinemas: schedule.cinemas
          .map((cinema) => ({
            ...cinema,
            showtimes: selectedTime
              ? cinema.showtimes.filter((time) => time === selectedTime)
              : cinema.showtimes,
          }))
          .filter((cinema) => cinema.showtimes.length > 0),
      }))
      .filter((schedule) => schedule.cinemas.length > 0);
  }, [movie.schedules, selectedLocation, selectedTime]);

  const cinemaList = useMemo(() => {
    return filteredSchedules.flatMap((schedule) =>
      schedule.cinemas.map((cinema, cinemaIndex) => ({
        id: `${schedule.location}-${cinema.cinema_name}-${cinemaIndex}`,
        location: schedule.location,
        name: cinema.cinema_name,
        logo: cinema.cinema_name,
        showtimes: cinema.showtimes,
      })),
    );
  }, [filteredSchedules]);

  const totalPages = Math.ceil(cinemaList.length / cinemaPerPage);

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  const visibleCinemas = useMemo(() => {
    const startIndex = (currentPage - 1) * cinemaPerPage;
    const endIndex = startIndex + cinemaPerPage;

    return cinemaList.slice(startIndex, endIndex);
  }, [cinemaList, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocation, selectedTime]);

  useEffect(() => {
    if (!selectedLocation && locationOptions.length > 0) {
      setSelectedLocation(locationOptions[0]);
    }
  }, [locationOptions, selectedLocation]);

  useEffect(() => {
    if (!selectedTime && timeOptions.length > 0) {
      setSelectedTime(timeOptions[0]);
    }
  }, [selectedTime, timeOptions]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/movies/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch movie detail");
        }

        const result = await response.json();
        const rawMovie = result?.data ?? result;

        setMovie(normalizeMovie(rawMovie));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMovie();
    }
  }, [API_BASE_URL, slug]);

  const handleFilter = (event) => {
    event.preventDefault();
    setCurrentPage(1);
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
        className="relative min-h-72 bg-cover bg-center bg-no-repeat sm:min-h-72 lg:min-h-96"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.45)
          ), url(${movie.background})`,
        }}
      />

      <section className="relative z-10 bg-white px-5 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-10 xl:grid-cols-[320px_1fr]">
          <div className="-mt-20 flex justify-center sm:-mt-32 lg:-mt-40 lg:block">
            <img
              src={movie.poster}
              alt={movie.title}
              className="aspect-2/3 w-full max-w-55 rounded-lg object-cover shadow-xl sm:max-w-72 lg:max-w-none lg:rounded-xl"
            />
          </div>

          <div className="text-center lg:pt-10 lg:text-left">
            <h1 className="text-sm font-semibold text-neutral-900 sm:text-3xl lg:text-5xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-neutral-100 px-4 py-1.5 text-[10px] font-medium text-neutral-500 sm:px-5 sm:py-2 sm:text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-left sm:gap-y-6 lg:max-w-xl">
              <div>
                <p className="text-[11px] text-neutral-400 sm:text-sm">
                  Release date
                </p>
                <p className="mt-1 text-xs font-medium text-neutral-900 sm:text-base">
                  {movie.releaseDate}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-neutral-400 sm:text-sm">
                  Directed by
                </p>
                <p className="mt-1 text-xs font-medium text-neutral-900 sm:text-base">
                  {movie.director}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-neutral-400 sm:text-sm">
                  Duration
                </p>
                <p className="mt-1 text-xs font-medium text-neutral-900 sm:text-base">
                  {movie.duration}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-neutral-400 sm:text-sm">Casts</p>
                <p className="mt-1 line-clamp-3 text-xs font-medium text-neutral-900 sm:text-base">
                  {movie.casts}
                </p>
              </div>
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

          <form
            onSubmit={handleFilter}
            className="mx-auto grid max-w-sm gap-3 lg:max-w-none lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-5"
          >
            <label className="block">
              <span className="mb-3 hidden text-sm font-semibold text-neutral-700 lg:block">
                Choose Date
              </span>

              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white sm:h-14 sm:text-sm lg:h-16 lg:text-base"
              />
            </label>

            <label className="hidden lg:block">
              <span className="mb-3 block text-sm font-semibold text-neutral-700">
                Choose Time
              </span>

              <select
                value={selectedTime}
                onChange={(event) => setSelectedTime(event.target.value)}
                className="h-16 w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 text-base font-semibold text-neutral-600 outline-none transition focus:border-primary focus:bg-white"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {formatTimeToAmPm(time)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-3 hidden text-sm font-semibold text-neutral-700 lg:block">
                Choose Location
              </span>

              <select
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
              >
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="h-10 rounded-md bg-primary px-10 text-xs font-semibold text-white transition hover:opacity-90 sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
            >
              Filter
            </button>
          </form>

          <p className="mt-4 text-center text-xs font-medium text-neutral-400 sm:text-sm">
            {cinemaList.length} Result
          </p>
        </section>

        <section className="mx-auto max-w-7xl">
          <div className="mb-8 hidden flex-col gap-2 text-center lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-5">
            <h2 className="text-2xl font-bold text-neutral-900">
              Choose Cinema
            </h2>
            <p className="text-lg font-bold text-neutral-400">
              {cinemaList.length} Result
            </p>
          </div>

          {visibleCinemas.length === 0 ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-8 text-center">
              <p className="text-sm font-medium text-neutral-500">
                No cinema schedule available.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 lg:hidden">
                {visibleCinemas.map((cinema, cinemaIndex) => (
                  <details
                    key={cinema.id}
                    open={cinemaIndex === 0}
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
                        {cinema.showtimes.map((time, index) => (
                          <button
                            key={`${cinema.id}-${time}-${index}`}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition ${
                              time === selectedTime
                                ? "bg-primary text-white"
                                : "bg-neutral-100 text-neutral-500 hover:bg-primary hover:text-white"
                            }`}
                          >
                            {formatTimeToAmPm(time)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>

              <div className="hidden gap-5 lg:grid lg:grid-cols-4">
                {visibleCinemas.map((cinema, index) => (
                  <button
                    key={cinema.id}
                    type="button"
                    className={`flex h-36 flex-col items-center justify-center rounded-lg border-2 px-6 text-center transition ${
                      index === 0
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                        : "border-neutral-200 bg-white text-primary hover:border-primary"
                    }`}
                  >
                    <span className="text-2xl font-black tracking-wide">
                      {cinema.logo}
                    </span>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        index === 0 ? "text-white/80" : "text-neutral-400"
                      }`}
                    >
                      {cinema.location}
                    </span>
                  </button>
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

          <div className="mt-10 hidden justify-center lg:flex">
            <button
              type="button"
              className="h-14 rounded-lg bg-primary px-16 text-base font-semibold text-white transition hover:opacity-90"
            >
              Book Now
            </button>
          </div>
        </section>
      </section>
    </HomeLayout>
  );
}

export default MovieDetailPage;
