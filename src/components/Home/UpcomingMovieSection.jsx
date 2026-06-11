import { useEffect, useRef, useState } from 'react';
import MovieCard from '../../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcoming } from '../../redux/slice/movieSlice';

function UpcomingMovieSection({ label = 'Upcoming Movies', title = 'Exciting Movie Coming Soon', movies = [] }) {
  const sliderRef = useRef(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { dataUpcoming } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
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
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollButtons();

    slider.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      slider.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [movies]);

  useEffect(() => {
    dispatch(getUpcoming());
  }, [dispatch]);
  const shouldShowArrows = movies.length > 4;

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 md:py-14">
      <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="w-full text-center md:text-left">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs md:mb-6 md:text-sm">{label}</p>
          <h2 className="mx-auto max-w-xs text-2xl font-medium leading-snug text-neutral-900 sm:max-w-md sm:text-3xl md:mx-0 md:max-w-2xl md:text-5xl">
            {title}
          </h2>
        </div>

        {shouldShowArrows && (
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              aria-label="Previous movie"
              onClick={() => scrollSlider(-1)}
              disabled={!canScrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Next movie"
              onClick={() => scrollSlider(1)}
              disabled={!canScrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>
          </div>
        )}
      </div>

      <section
        ref={sliderRef}
        onScroll={updateScrollButtons}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 scrollbar-hide sm:-mx-6 sm:px-6 md:mx-0 md:px-0 lg:gap-6"
      >
        {dataUpcoming
          ? dataUpcoming.map((movie) => (
              <div key={movie.ID} className="min-w-[68%] snap-start sm:min-w-[45%] md:min-w-[31%] lg:min-w-[calc(25%-18px)]">
                <MovieCard movie={movie} />
              </div>
            ))
          : ''}
      </section>
    </article>
  );
}

export default UpcomingMovieSection;
