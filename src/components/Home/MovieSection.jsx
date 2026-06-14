import { useEffect } from "react";
import SectionHeader from "./SectionHeader";
import MovieCard from "../../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../redux/slice/movieSlice";

function MovieSection({
  label = "Movie",
  title = "Exciting Movies That Should Be Watched Today",
}) {
  const dispatch = useDispatch();
  const { dataMovies } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovie());
  }, [dispatch]);

  // Support both:
  // dataMovies.data
  // dataMovies.data.data
  const movies = Array.isArray(dataMovies?.data)
    ? dataMovies.data
    : dataMovies?.data?.data || [];

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 md:py-14">
      <SectionHeader
        label={label}
        title={title}
        center
        className="mb-8 md:mb-12"
      />

      <section className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 no-scrollbar sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
        {movies.map((movie) => (
          <div
            key={movie.ID || movie.id}
            className="min-w-[70%] snap-start sm:min-w-[45%] md:min-w-0"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </section>
    </article>
  );
}

export default MovieSection;
