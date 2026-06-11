import { useEffect, useRef, useState } from "react";
import MovieCard from "../../components/MovieCard";

function UpcomingMovieSection({
  label = "Upcoming Movies",
  title = "Exciting Movie Coming Soon",
  movies = [],
}) {
  const sliderRef = useRef(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    setCanScrollPrev(slider.scrollLeft > 0);
    setCanScrollNext(slider.scrollLeft < maxScrollLeft - 1);
  };

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollButtons();

    const handleResize = () => {
      updateScrollButtons();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [movies]);

  if (!movies.length) return null;

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 md:py-14">
      <div className="mb-8 flex items-end justify-between gap-4 md:mb-12">
        <div>
          <p className="mb-2 text-sm font-semibold text-primary">{label}</p>

          <h2 className="max-w-xl text-2xl font-semibold leading-tight text-gray-900 md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollSlider(-1)}
            disabled={!canScrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollSlider(1)}
            disabled={!canScrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>

      <section
        ref={sliderRef}
        onScroll={updateScrollButtons}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4  sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:overflow-x-hidden no-scrollbar lg:gap-6"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[68%] snap-start sm:min-w-[45%] md:min-w-[31%] lg:min-w-[calc(25%-18px)]"
          >
            <MovieCard movie={movie} showDate={true} />
          </div>
        ))}
      </section>
    </article>
  );
}

export default UpcomingMovieSection;
