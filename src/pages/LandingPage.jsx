import React from "react";
import movie from "../assets/movie.jpeg";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Newsletter from "../components/Newsletter";

function LandingPage() {
  const movies = [
    {
      id: 1,
      title: "Black Widow",
      genres: ["Action", "Adventure"],
      recommended: false,
    },
    {
      id: 2,
      title: "The Witches",
      genres: ["Comedy", "Adventure"],
      recommended: true,
    },
    {
      id: 3,
      title: "Tenet",
      genres: ["Action", "Sci-Fi"],
      recommended: true,
    },
    {
      id: 4,
      title: "Spiderman",
      genres: ["Action", "Adventure"],
      recommended: false,
    },
  ];

  const upcomingMovies = [
    {
      id: 1,
      title: "Black Widow",
      date: "December 2024",
      genres: ["Action", "Adventure"],
    },
    {
      id: 2,
      title: "The Witches",
      date: "January 2025",
      genres: ["Comedy", "Adventure"],
    },
    {
      id: 3,
      title: "Tenet",
      date: "February 2025",
      genres: ["Action", "Sci-Fi"],
    },
    {
      id: 4,
      title: "Spiderman",
      date: "March 2025",
      genres: ["Action", "Adventure"],
    },
  ];

  const benefits = [
    {
      id: 1,
      title: "Guaranteed",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      id: 2,
      title: "Affordable",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen text-gray-900">
        {/* Hero Section */}
        <article className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-8 text-center md:flex-row md:gap-10 md:px-6 md:py-12 md:text-left">
          <section className="w-full space-y-4 md:w-7/10 md:space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary md:text-sm">
              Movie Ticket Purchases #1 in Indonesia
            </p>

            <h1 className="mx-auto max-w-sm text-2xl font-medium leading-tight md:mx-0 md:max-w-5xl md:text-6xl md:font-bold">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>

            <p className="mx-auto max-w-xs text-xs text-gray-500 md:mx-0 md:max-w-xl md:text-lg md:text-gray-600">
              Sign up and get the ticket with a lot of discount
            </p>
          </section>

          <section className="grid w-full max-w-xs grid-cols-2 gap-2 md:w-3/10 md:max-w-none md:gap-5">
            <div className="flex flex-col gap-2 md:gap-3">
              <img
                src={movie}
                alt="Movie poster"
                className="h-28 w-full rounded-t-2xl object-cover object-top md:h-40"
              />
              <img
                src={movie}
                alt="Movie poster"
                className="h-40 w-full rounded-b-2xl object-cover md:h-64"
              />
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              <img
                src={movie}
                alt="Movie poster"
                className="h-40 w-full rounded-t-2xl object-cover md:h-64"
              />

              <img
                src={movie}
                alt="Movie poster"
                className="h-28 w-full rounded-b-2xl object-cover object-top md:h-40"
              />
            </div>
          </section>
        </article>

        {/* Why Choose Us */}
        <article className="mx-auto max-w-7xl px-5 py-8 text-center md:px-6 md:text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary md:mb-8 md:text-sm">
            Why Choose Us
          </p>

          <h2 className="mx-auto mb-8 max-w-xs text-2xl font-medium leading-tight text-neutral-900 md:mx-0 md:mb-12 md:max-w-2xl md:text-5xl md:font-bold">
            Unleashing the Ultimate Movie Experience
          </h2>

          <section className="grid gap-8 md:grid-cols-3 md:gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="mx-auto max-w-xs px-3 py-4 md:mx-0 md:max-w-none md:p-6"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 md:mx-0 md:h-16 md:w-16">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 md:h-8 md:w-8">
                    <svg
                      className="h-3.5 w-3.5 text-white md:h-4 md:w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-3 text-sm font-bold md:text-xl">
                  {benefit.title}
                </h3>

                <p className="text-xs leading-6 text-gray-500 md:text-sm md:text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </section>
        </article>

        {/* Movies Section */}
        <article className="mx-auto max-w-7xl px-5 py-8 md:px-6">
          <div className="text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary md:mb-8 md:text-sm">
              Movies
            </p>

            <h2 className="mx-auto mb-8 max-w-xs text-2xl font-medium leading-tight text-neutral-900 md:mb-12 md:max-w-2xl md:text-5xl md:font-bold">
              Exciting Movies That Should Be Watched Today
            </h2>
          </div>

          <section className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 lg:gap-8">
            {movies.map((item) => (
              <div
                key={item.id}
                className="group relative flex w-[150px] shrink-0 flex-col sm:w-auto"
              >
                <div className="relative aspect-[2/3] w-full overflow rounded-lg shadow-sm transition-transform duration-300 md:rounded-2xl md:group-hover:scale-[1.02]">
                  {item.recommended && (
                    <div className="absolute -left-1 top-2 z-20 md:-left-2">
                      <div className="relative">
                        <div className="rounded-r-full bg-primary px-3 py-1 pr-4 text-[9px] font-semibold tracking-wide text-white md:px-4 md:py-1.5 md:pr-6 md:text-xs">
                          Recommended
                        </div>

                        <div className="h-0 w-0 border-l-[6px] border-t-[8px] border-l-transparent border-t-primary md:border-l-[8px] md:border-t-[11px]" />
                      </div>
                    </div>
                  )}

                  <img
                    src={movie}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

                  <div className="absolute left-1/2 top-1/2 z-20 flex w-full max-w-[130px] -translate-x-1/2 translate-y-6 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-[-50%] group-hover:opacity-100 group-focus-within:translate-y-[-50%] group-focus-within:opacity-100 md:max-w-[180px] md:gap-2.5">
                    <button className="w-full rounded-lg border-2 border-white bg-black/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 md:px-4 md:py-2.5 md:text-sm">
                      Details
                    </button>

                    <button className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 md:px-4 md:py-2.5 md:text-sm">
                      Buy Ticket
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2 md:mt-4">
                  <h3 className="truncate text-xs font-semibold text-neutral-900 transition-colors group-hover:text-primary md:text-xl md:font-bold">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {item.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-gray-100 px-3 py-1 text-[9px] font-medium text-gray-500 md:text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <p className="mt-8 hidden cursor-pointer text-center font-semibold text-primary hover:underline md:block">
            View All &rarr;
          </p>
        </article>

        {/* Upcoming Movies */}
        <article className="mx-auto max-w-7xl px-5 py-8 md:px-6">
          <div className="text-center md:text-left">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary md:mb-8 md:text-sm">
              Upcoming Movies
            </p>

            <h2 className="mx-auto mb-8 max-w-xs text-2xl font-medium leading-tight text-neutral-900 md:mx-0 md:mb-12 md:max-w-2xl md:text-5xl md:font-bold">
              Exciting Movie Coming Soon
            </h2>
          </div>

          <section className="scrollbar-hide flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 lg:gap-8">
            {upcomingMovies.map((item) => (
              <div
                key={item.id}
                className="group relative flex w-[150px] shrink-0 flex-col sm:w-auto"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-sm transition-transform duration-300 md:rounded-2xl md:group-hover:scale-[1.02]">
                  <img
                    src={movie}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

                  <div className="absolute left-1/2 top-1/2 z-20 flex w-full max-w-[130px] -translate-x-1/2 translate-y-6 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-[-50%] group-hover:opacity-100 group-focus-within:translate-y-[-50%] group-focus-within:opacity-100 md:max-w-[180px] md:gap-2.5">
                    <button className="w-full rounded-lg border-2 border-white bg-black/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 md:px-4 md:py-2.5 md:text-sm">
                      Details
                    </button>

                    <button className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 md:px-4 md:py-2.5 md:text-sm">
                      Buy Ticket
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2 md:mt-4">
                  <h3 className="truncate text-xs font-semibold text-neutral-900 transition-colors group-hover:text-primary md:text-xl md:font-bold">
                    {item.title}
                  </h3>

                  <p className="text-[10px] font-medium text-primary md:text-sm">
                    {item.date}
                  </p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {item.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-gray-100 px-3 py-1 text-[9px] font-medium text-gray-500 md:text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </article>
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
