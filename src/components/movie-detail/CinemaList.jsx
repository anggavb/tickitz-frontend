import {
  formatPrice,
  isImageSource,
  buildAssetUrl,
} from "../../utils/api/movieDetailMappers";
import { MovieDetailEmptySchedule } from "./MovieDetailStates";

function CinemaLogo({ logo, name, className = "" }) {
  if (isImageSource(logo)) {
    return (
      <img
        src={buildAssetUrl(logo)}
        alt={name}
        className={`max-h-12 max-w-32 object-contain ${className}`}
      />
    );
  }

  return (
    <span className={`text-2xl font-black tracking-wide ${className}`}>
      {logo || name}
    </span>
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
          <div className="flex min-h-12 items-center text-primary">
            <CinemaLogo logo={cinema.logo} name={cinema.name} />
          </div>

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
      <CinemaLogo logo={cinema.logo} name={cinema.name} />

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

export default function CinemaList({
  hasFiltered,
  visibleCinemas,
  cinemaCount,
  emptyScheduleMessage,
  totalPages,
  pages,
  currentPage,
  selectedCinemaId,
  selectedDate,
  selectedTime,
  filterDate,
  filterTime,
  activeCinemaId,
  onPageChange,
  onSelectCinema,
  onSelectMobileTime,
}) {
  if (!hasFiltered) return null;

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-8 hidden text-center lg:flex lg:items-center lg:justify-center lg:gap-5">
        <h2 className="text-2xl font-bold text-neutral-900">Choose Cinema</h2>

        <p className="text-lg font-bold text-neutral-400">
          {cinemaCount} Result
        </p>
      </div>

      {visibleCinemas.length === 0 ? (
        <MovieDetailEmptySchedule message={emptyScheduleMessage} />
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
                  onSelectMobileTime(cinema, showtime)
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
                onClick={() => onSelectCinema(cinema)}
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
              onClick={() => onPageChange(page)}
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
    </section>
  );
}
