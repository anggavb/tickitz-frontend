import { useMemo, useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
const movie = {
  title: "The Lost City of Dawn",
  background:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  poster:
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
  genres: ["Adventure", "Mystery", "Drama"],
  releaseDate: "June 7, 2026",
  director: "Alex Morgan",
  duration: "2 hours 5 minutes",
  casts: "Emma Carter, Liam Brooks, Noah Bennett",
  synopsis:
    "A young explorer discovers an ancient map that leads to a forgotten city hidden beyond the mountains. As the journey becomes more dangerous, the team must solve old mysteries, face betrayal, and decide whether the truth is worth the risk.",
};

const cinemas = [
  { id: 1, name: "Ebv.id", logo: "ebv.id", active: false },
  { id: 2, name: "Hiflix", logo: "hiflix", active: true },
  { id: 3, name: "CineOne21", logo: "CineOne21", active: false },
  { id: 4, name: "MovieMax", logo: "MovieMax", active: false },
  { id: 5, name: "ApexCinema", logo: "apexcinema", active: true },
  {
    id: 6,
    name: "Starlight Screens",
    logo: "starlight_screens",
    active: false,
  },
  {
    id: 7,
    name: "Velvet Pictures",
    logo: "velvet_pictures",
    active: true,
  },
  { id: 8, name: "MetroPlex", logo: "metroplex", active: false },
  { id: 9, name: "NeoTheatre", logo: "neotheatre", active: true },
  { id: 10, name: "Prism Cines", logo: "prism_cines", active: false },
  { id: 11, name: "OmniMax", logo: "omnimax", active: true },
  {
    id: 12,
    name: "Horizon Filmhouse",
    logo: "horizon_filmhouse",
    active: false,
  },
  { id: 13, name: "RetroScope", logo: "retroscope", active: false },
  {
    id: 14,
    name: "Luminary Cinema",
    logo: "luminary_cinema",
    active: true,
  },
];

const defaultSchedules = [
  {
    type: "REGULAR",
    times: [
      "08:30 AM",
      "10:30 AM",
      "10:30 AM",
      "11:30 AM",
      "12:30 AM",
      "12:30 AM",
      "01:00 AM",
    ],
  },
  {
    type: "GOLD",
    times: [
      "08:30 AM",
      "10:30 AM",
      "10:30 AM",
      "11:30 AM",
      "12:30 AM",
      "12:30 AM",
      "01:00 AM",
    ],
  },
  {
    type: "PLATINUM",
    times: [
      "08:30 AM",
      "10:30 AM",
      "10:30 AM",
      "11:30 AM",
      "12:30 AM",
      "12:30 AM",
      "01:00 AM",
    ],
  },
];

function MovieDetailPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const cinemaPerPage = 4;
  const totalPages = Math.ceil(cinemas.length / cinemaPerPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visibleCinemas = useMemo(() => {
    const startIndex = (currentPage - 1) * cinemaPerPage;
    const endIndex = startIndex + cinemaPerPage;

    return cinemas.slice(startIndex, endIndex);
  }, [currentPage]);

  const timeOptions = useMemo(() => {
    return [...new Set(defaultSchedules.flatMap((schedule) => schedule.times))];
  }, []);

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

      {/* Movie Detail */}
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

        {/* Synopsis */}
        <section className="mx-auto mt-8 max-w-7xl sm:mt-12">
          <h2 className="text-base font-semibold text-neutral-900 sm:text-2xl">
            Synopsis
          </h2>

          <p className="mt-3 max-w-4xl text-xs leading-6 text-neutral-500 sm:mt-5 sm:text-base sm:leading-8">
            {movie.synopsis}
          </p>
        </section>

        {/* Showtimes and Tickets */}
        <section className="mx-auto max-w-7xl py-8 sm:py-12">
          <h2 className="mb-5 text-center text-base font-semibold text-neutral-900 sm:mb-8 sm:text-3xl">
            Showtimes and Tickets
          </h2>

          <form className="mx-auto grid max-w-sm gap-3 lg:max-w-none lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-5">
            {/* Date */}
            <label className="block">
              <span className="mb-3 hidden text-sm font-semibold text-neutral-700 lg:block">
                Choose Date
              </span>

              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 2V5M17 2V5M3.5 9.09H20.5M4 6.5C4 5.4 4.9 4.5 6 4.5H18C19.1 4.5 20 5.4 20 6.5V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="date"
                  defaultValue="2026-07-21"
                  className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-11 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white sm:h-14 sm:text-sm lg:h-16 lg:px-14 lg:text-base"
                />
              </div>
            </label>

            {/* Time - desktop only */}
            <label className="hidden lg:block">
              <span className="mb-3 block text-sm font-semibold text-neutral-700">
                Choose Time
              </span>

              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 7V12L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <select
                  defaultValue={timeOptions[0]}
                  className="h-16 w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-100 px-14 text-base font-semibold text-neutral-600 outline-none transition focus:border-primary focus:bg-white"
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
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
              </div>
            </label>

            {/* Location */}
            <label className="block">
              <span className="mb-3 hidden text-sm font-semibold text-neutral-700 lg:block">
                Choose Location
              </span>

              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 sm:h-5 sm:w-5 lg:left-5 lg:h-6 lg:w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 22C16 18 20 14.42 20 10C20 5.58 16.42 2 12 2C7.58 2 4 5.58 4 10C4 14.42 8 18 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                <select
                  defaultValue="purwokerto"
                  className="h-10 w-full appearance-none rounded-md border border-neutral-200 bg-neutral-100 px-11 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:px-14 lg:text-base"
                >
                  <option value="purwokerto">Purwokerto</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="bandung">Bandung</option>
                  <option value="surabaya">Surabaya</option>
                </select>

                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 lg:right-5 lg:h-5 lg:w-5"
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
              </div>
            </label>

            <button
              type="submit"
              className="h-10 rounded-md bg-primary px-10 text-xs font-semibold text-white transition hover:opacity-90 sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
            >
              Filter
            </button>
          </form>

          <p className="mt-4 text-center text-xs font-medium text-neutral-400 sm:text-sm">
            {cinemas.length} Result
          </p>
        </section>

        {/* Choose Cinema */}
        <section className="mx-auto max-w-7xl">
          <div className="mb-8 hidden flex-col gap-2 text-center lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-5">
            <h2 className="text-2xl font-bold text-neutral-900">
              Choose Cinema
            </h2>
            <p className="text-lg font-bold text-neutral-400">
              {cinemas.length} Result
            </p>
          </div>

          {/* Mobile cinema accordion with time */}
          <div className="grid gap-4 lg:hidden">
            {visibleCinemas.map((cinema, cinemaIndex) => (
              <details
                key={cinema.id}
                open={cinemaIndex === 0}
                className="group rounded-lg border border-neutral-200 bg-white px-5 py-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <div>
                    <p
                      className={`text-3xl font-black leading-none ${
                        cinema.name === "Hiflix"
                          ? "font-mono lowercase text-red-600"
                          : cinema.name === "CineOne21"
                            ? "font-serif text-primary"
                            : "font-serif text-black"
                      }`}
                    >
                      {cinema.logo}
                    </p>

                    <h3 className="mt-4 text-base font-semibold text-neutral-900">
                      {cinema.name}
                    </h3>

                    <p className="mt-1 max-w-55 text-[11px] leading-5 text-neutral-400">
                      Whatever street No.12, South Purwokerto
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
                  {defaultSchedules.map((schedule) => (
                    <div key={schedule.type} className="mb-6 last:mb-0">
                      <h4 className="mb-3 text-xs font-semibold text-neutral-900">
                        {schedule.type}
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {schedule.times.map((time, index) => (
                          <button
                            key={`${schedule.type}-${time}-${index}`}
                            type="button"
                            className={`rounded-full px-3 py-1.5 text-[10px] font-medium transition ${
                              index === 5
                                ? "bg-primary text-white"
                                : "bg-neutral-100 text-neutral-500 hover:bg-primary hover:text-white"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {/* Desktop cinema cards without time */}
          <div className="hidden gap-5 lg:grid lg:grid-cols-4">
            {visibleCinemas.map((cinema) => (
              <button
                key={cinema.id}
                type="button"
                className={`flex h-36 items-center justify-center rounded-lg border-2 px-6 text-center transition ${
                  cinema.active
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                    : "border-neutral-200 bg-white text-primary hover:border-primary"
                }`}
              >
                <span
                  className={`text-3xl font-black tracking-wide ${
                    cinema.name === "Hiflix"
                      ? "font-mono lowercase"
                      : "font-serif"
                  }`}
                >
                  {cinema.logo}
                </span>
              </button>
            ))}
          </div>

          {/* Pagination */}
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

          {/* Desktop Book Now */}
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
