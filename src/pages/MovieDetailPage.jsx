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

  const cinemas = [
    {
      id: 1,
      name: "Ebv.id",
      logo: "ebv.id",
      active: false,
    },
    {
      id: 2,
      name: "Hiflix",
      logo: "hiflix",
      active: true,
    },
    {
      id: 3,
      name: "CineOne21",
      logo: "CineOne21",
      active: false,
    },
    {
      id: 4,
      name: "MovieMax",
      logo: "MovieMax",
      active: false,
    },
  ];

  const pages = [1, 2, 3, 4];

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* Hero Background */}
        <section
          className="relative min-h-48 bg-cover bg-center bg-no-repeat sm:min-h-72 lg:min-h-96"
          style={{
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.35),
              rgba(0, 0, 0, 0.45)
            ), url(${movie.background})`,
          }}
        />

        {/* Movie Detail */}
        <section className="relative z-10 bg-white px-6">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
            <div className="-mt-24 sm:-mt-36 lg:-mt-40">
              <img
                src={movie.poster}
                alt={movie.title}
                className="aspect-[2/3] w-full max-w-56 rounded-xl object-cover shadow-xl sm:max-w-72 lg:max-w-none"
              />
            </div>

            <div className="pt-2 lg:pt-10">
              <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>

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

          {/* Synopsis */}
          <section className="mx-auto max-w-7xl ">
            <h2 className="text-2xl font-bold text-neutral-900">Synopsis</h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-500">
              {movie.synopsis}
            </p>
          </section>

          {/* Book Tickets */}
          <section className="mx-auto max-w-7xl py-8 sm:py-12">
            <h2 className="mb-8 text-2xl font-bold text-neutral-900 sm:text-3xl">
              Book Tickets
            </h2>

            <form className="grid gap-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
              {/* Date */}
              <label className="block">
                <span className="mb-3 block text-sm font-semibold text-neutral-700">
                  Choose Date
                </span>

                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 2V5M17 2V5M3.5 9.09H20.5M4 6.5C4 5.4 4.9 4.5 6 4.5H18C19.1 4.5 20 5.4 20 6.5V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  <input
                    type="date"
                    defaultValue="2026-07-21"
                    className="h-16 w-full rounded-lg border border-neutral-200 bg-neutral-100 px-14 text-base font-semibold text-neutral-600 outline-none transition focus:border-primary focus:bg-white"
                  />
                </div>
              </label>

              {/* Time */}
              <label className="block">
                <span className="mb-3 block text-sm font-semibold text-neutral-700">
                  Choose Time
                </span>

                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7V12L15 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  <select
                    defaultValue="20:30"
                    className="h-16 w-full rounded-lg border border-neutral-200 bg-neutral-100 px-14 text-base font-semibold text-neutral-600 outline-none transition focus:border-primary focus:bg-white"
                  >
                    {" "}
                    <option value="08:30">08:30</option>
                    <option value="10:00">10:00</option>
                    <option value="12:30">12:30</option>
                  </select>
                </div>
              </label>

              {/* Location */}
              <label className="block">
                <span className="mb-3 block text-sm font-semibold text-neutral-700">
                  Choose Location
                </span>

                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 22C16 18 20 14.42 20 10C20 5.58 16.42 2 12 2C7.58 2 4 5.58 4 10C4 14.42 8 18 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>

                  <select
                    defaultValue="purwokerto"
                    className="h-16 w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-100 px-14 text-base font-semibold text-neutral-600 outline-none transition focus:border-primary focus:bg-white"
                  >
                    <option value="purwokerto">Purwokerto</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                    <option value="surabaya">Surabaya</option>
                  </select>

                  <svg
                    className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </label>

              <button
                type="submit"
                className="h-16 rounded-lg bg-primary px-10 text-base font-semibold text-white transition hover:opacity-90"
              >
                Filter
              </button>
            </form>
          </section>
          {/* Choose Cinema */}
          <section className="mx-auto max-w-7xl ">
            <div className="mb-8 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-5">
              <h2 className="text-2xl font-bold text-neutral-900">
                Choose Cinema
              </h2>
              <p className="text-lg font-bold text-neutral-400">39 Result</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cinemas.map((cinema) => (
                <button
                  key={cinema.id}
                  type="button"
                  className={`flex h-36 items-center justify-center rounded-lg border-2 px-6 text-center transition ${
                    cinema.active
                      ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                      : "border-neutral-200 bg-white text-primary hover:border-primary"
                  }`}
                >
                  <span
                    className={`text-3xl font-black tracking-wide ${
                      cinema.name === "Hiflix"
                        ? "font-mono lowercase"
                        : "font-serif"
                    }`}
                  >
                    {cinema.logo}
                  </span>
                </button>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-3">
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`h-12 w-12 rounded-lg text-base font-semibold transition ${
                    page === 1
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "border border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                className="h-14 rounded-lg bg-primary px-16 text-base font-semibold text-white transition hover:opacity-90"
              >
                Book Now
              </button>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default MovieDetailPage;
