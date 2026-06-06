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

      <section className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 scrollbar-hide sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-4 lg:gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[72%] snap-start sm:min-w-[45%] md:min-w-0"
          >
            <MovieCard movie={movie} />
          </div>
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
