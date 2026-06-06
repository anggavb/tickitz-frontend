import SectionHeader from "./SectionHeader";
import MovieCard from "./MovieCard";

function MovieSection({
  label,
  title,
  movies = [],
  variant = "center",
  showArrows = false,
  showViewAll = false,
}) {
  const isUpcoming = variant === "upcoming";

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      {isUpcoming ? (
        <div className="mb-8 flex items-start justify-between gap-6 md:mb-12">
          <div className="w-full text-center md:text-left">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary md:mb-6 md:text-sm">
              {label}
            </p>

            <h2 className="mx-auto max-w-xs text-2xl font-medium leading-snug text-neutral-900 md:mx-0 md:max-w-2xl md:text-5xl">
              {title}
            </h2>
          </div>

          {showArrows && (
            <div className="hidden items-center gap-4 md:flex">
              <button
                type="button"
                aria-label="Previous movie"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-200 text-2xl font-semibold text-white transition hover:bg-primary md:h-16 md:w-16 md:text-3xl"
              >
                ←
              </button>

              <button
                type="button"
                aria-label="Next movie"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white transition hover:opacity-90 md:h-16 md:w-16 md:text-3xl"
              >
                →
              </button>
            </div>
          )}
        </div>
      ) : (
        <SectionHeader
          label={label}
          title={title}
          center
          className="mb-8 md:mb-12"
        />
      )}

      <section className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {movies.map((item) => (
          <MovieCard
            key={item.id}
            title={item.title}
            date={item.date}
            genres={item.genres}
            recommended={item.recommended}
          />
        ))}
      </section>

      {showViewAll && (
        <div className="mt-8 text-center md:mt-12">
          <button
            type="button"
            className="text-sm font-semibold text-primary transition hover:underline md:text-base"
          >
            View All →
          </button>
        </div>
      )}

      {showArrows && (
        <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            aria-label="Previous movie"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-200 text-2xl font-semibold text-white transition hover:bg-primary"
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Next movie"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white transition hover:opacity-90"
          >
            →
          </button>
        </div>
      )}
    </article>
  );
}

export default MovieSection;
