import Navbar from "../components/Navbar";

function MovieDetailPage() {
  const movie = {
    title: "The Lost City of Dawn",
    background:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    genres: ["Adventure", "Mystery", "Drama"],
    releaseDate: "June 7, 2026",
    director: "Alex Morgan",
    duration: "2 hours 5 minutes",
    casts: "Emma Carter, Liam Brooks, Noah Bennett",
    synopsis:
      "A young explorer discovers an ancient map that leads to a forgotten city hidden beyond the mountains. As the journey becomes more dangerous, the team must solve old mysteries, face betrayal, and decide whether the truth is worth the risk.",
  };

  return (
    <>
      <Navbar />

      <section
        className="relative min-h-48 bg-cover bg-center bg-no-repeat sm:min-h-72 lg:min-h-96"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.45)
          ), url(${movie.background})`,
        }}
      />

      <section className="relative z-10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
          <div className="-mt-24 sm:-mt-36 lg:-mt-40">
            <img
              src={movie.poster}
              alt={movie.title}
              className="aspect-2/3 w-full max-w-56 rounded-xl object-cover shadow-xl sm:max-w-72 lg:max-w-none"
            />
          </div>

          <div className="pt-2 lg:pt-10">
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
              {movie.title}
            </h1>

            {/* Genre tags */}
            <div className="mt-5 flex flex-wrap gap-3">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-700"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Metadata grid */}
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6">
              <div>
                <p className="text-sm text-neutral-400">Release date</p>
                <p className="mt-1 text-base font-medium text-neutral-900">
                  {movie.releaseDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Directed by</p>
                <p className="mt-1 text-base font-medium text-neutral-900">
                  {movie.director}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Duration</p>
                <p className="mt-1 text-base font-medium text-neutral-900">
                  {movie.duration}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Casts</p>
                <p className="mt-1 text-base font-medium text-neutral-900">
                  {movie.casts}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="mx-auto max-w-7xl px-6 py-5 sm:py-8">
        <h2 className="text-2xl font-bold text-neutral-900">Synopsis</h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-500">
          {movie.synopsis}
        </p>
      </section>
    </>
  );
}

export default MovieDetailPage;
