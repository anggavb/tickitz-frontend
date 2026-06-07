import { useMemo, useState } from "react";

function ChooseCinemaSection({ cinemas = [], defaultSchedules = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(cinemas.length / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visibleCinemas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return cinemas.slice(startIndex, endIndex);
  }, [cinemas, currentPage]);

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-8 hidden flex-col gap-2 text-center lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-5">
        <h2 className="text-2xl font-bold text-neutral-900">Choose Cinema</h2>
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
      <div className="hidden gap-5 sm:grid-cols-2 lg:grid lg:grid-cols-4">
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
                cinema.name === "Hiflix" ? "font-mono lowercase" : "font-serif"
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
  );
}

export default ChooseCinemaSection;
