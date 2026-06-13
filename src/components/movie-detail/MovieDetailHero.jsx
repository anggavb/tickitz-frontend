function MovieInfo({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-neutral-400 sm:text-sm">{label}</p>
      <p className="mt-1 line-clamp-3 text-xs font-medium text-neutral-900 sm:text-base">
        {value || "-"}
      </p>
    </div>
  );
}

function PosterEmptyState({ title }) {
  return (
    <div className="flex aspect-2/3 w-full max-w-55 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 px-4 text-center text-xs font-medium text-neutral-400 shadow-xl sm:max-w-72 lg:max-w-none lg:rounded-xl">
      {title || "No poster available"}
    </div>
  );
}

export default function MovieDetailHero({ movie }) {
  const backgroundStyle = movie.background
    ? {
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.35),
          rgba(0, 0, 0, 0.45)
        ), url(${movie.background})`,
      }
    : undefined;

  return (
    <>
      <section
        className="relative min-h-72 bg-neutral-200 bg-cover bg-center bg-no-repeat lg:min-h-96"
        style={backgroundStyle}
      />

      <section className="relative z-10 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-10 xl:grid-cols-[320px_1fr]">
          <div className="-mt-20 flex justify-center sm:-mt-32 lg:-mt-40 lg:block">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="aspect-2/3 w-full max-w-55 rounded-lg object-cover shadow-xl sm:max-w-72 lg:max-w-none lg:rounded-xl"
              />
            ) : (
              <PosterEmptyState title={movie.title} />
            )}
          </div>

          <div className="text-center lg:pt-10 lg:text-left">
            <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl lg:text-5xl">
              {movie.title || "-"}
            </h1>

            {movie.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-medium text-neutral-500 sm:px-5 sm:py-2 sm:text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-left sm:gap-y-6 lg:max-w-xl">
              <MovieInfo label="Release date" value={movie.releaseDate} />
              <MovieInfo label="Directed by" value={movie.director} />
              <MovieInfo label="Duration" value={movie.duration} />
              <MovieInfo label="Casts" value={movie.casts} />
            </div>
          </div>
        </div>

        <section className="mx-auto mt-8 max-w-7xl sm:mt-12">
          <h2 className="text-base font-semibold text-neutral-900 sm:text-2xl">
            Synopsis
          </h2>

          <p className="mt-3 max-w-4xl text-xs leading-6 text-neutral-500 sm:mt-5 sm:text-base sm:leading-8">
            {movie.synopsis || "-"}
          </p>
        </section>
      </section>
    </>
  );
}
