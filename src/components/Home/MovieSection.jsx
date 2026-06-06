import SectionHeader from "./SectionHeader";
import MovieCard from "../../components/MovieCard";

function MovieSection({
  label = "Movie",
  title = "Exciting Movies That Should Be Watched Today",
  movies = [],
}) {
  return (
    <article className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8 md:py-14">
      <SectionHeader
        label={label}
        title={title}
        center
        className="mb-8 md:mb-12"
      />

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>

      <div className="mt-8 text-center md:mt-12">
        <button
          type="button"
          className="text-sm font-semibold text-primary transition hover:underline md:text-base"
        >
          View All →
        </button>
      </div>
    </article>
  );
}

export default MovieSection;
