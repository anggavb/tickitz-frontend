import { useRef } from "react";
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
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * sliderRef.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  const shouldShowArrows = showArrows && movies.length > 4;

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 md:py-14">
      {isUpcoming ? (
        <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="w-full text-center md:text-left">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs md:mb-6 md:text-sm">
              {label}
            </p>

            <h2 className="mx-auto max-w-xs text-2xl font-medium leading-snug text-neutral-900 sm:max-w-md sm:text-3xl md:mx-0 md:max-w-2xl md:text-5xl">
              {title}
            </h2>
          </div>
        </div>
      ) : (
        <SectionHeader
          label={label}
          title={title}
          center
          className="mb-8 md:mb-12"
        />
      )}

      <section
        ref={sliderRef}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 scrollbar-hide sm:-mx-6 sm:px-6 md:mx-0 md:px-0 lg:gap-6"
      >
        {movies.map((item) => (
          <div
            key={item.id}
            className="min-w-[68%] snap-start sm:min-w-[45%] md:min-w-[31%] lg:min-w-[calc(25%-18px)]"
          >
            <MovieCard
              title={item.title}
              date={item.date}
              genres={item.genres}
              image={item.image}
              recommended={item.recommended}
            />
          </div>
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

      {shouldShowArrows && (
        <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            aria-label="Previous movie"
            onClick={() => scrollSlider(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-200 text-2xl font-semibold text-white transition hover:bg-primary"
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Next movie"
            onClick={() => scrollSlider(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white transition hover:opacity-90"
          >
            →
          </button>
        </div>
      )}
    </article>
  );
}

export default MovieSection;
