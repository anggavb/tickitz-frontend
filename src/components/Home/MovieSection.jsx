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
  console.log(dataMovies);

  useEffect(() => {
    dispatch(getMovie());
  }, [dispatch]);

  const movies = dataMovies?.data;

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 md:py-14">
      <SectionHeader
        label={label}
        title={title}
        center
        className="mb-8 md:mb-12"
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {movies
          ? movies.map((movie) => (
              <MovieCard key={movie.ID || movie.id} movie={movie} />
            ))
          : ""}
      </section>
    </article>
  );
}

export default MovieSection;
