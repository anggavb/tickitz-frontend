import React from "react";
import movie from "../assets/movie.jpeg";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screentext-gray-900 ">
        {/* Hero Section */}
        <article className="mx-auto flex max-w-7xl items-center gap-10 py-12">
          <section className="w-7/10 space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Movie Ticket Purchases #1 in Indonesia
            </p>

            <h1 className="max-w-5xl text-6xl font-bold leading-tight">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>

            <p className="max-w-xl text-lg text-gray-600">
              Sign up and get the ticket with a lot of discount
            </p>
          </section>
          <section className="grid w-3/10 grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <img
                src={movie}
                alt="Movie poster"
                className="h-40 w-full rounded-t-2xl object-cover object-top"
              />
              <img
                src={movie}
                alt="Movie poster"
                className="h-64 w-full rounded-b-2xl object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <img
                src={movie}
                alt="Movie poster"
                className="h-64 w-full rounded-t-2xl object-cover"
              />

              <img
                src={movie}
                alt="Movie poster"
                className="h-40 w-full rounded-b-2xl object-cover object-top"
              />
            </div>
          </section>
        </article>
        {/* Why Choose Us */}
        <article className="mx-auto max-w-7xl py-8">
          <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </p>
          <h2 className="mb-12 max-w-2xl text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Unleashing the Ultimate Movie Experience
          </h2>
          <section className="grid gap-6 md:grid-cols-3">
            <div className=" p-6 shadow-sm">
              <img
                src={movie}
                alt="Guaranteed Icon"
                className="mb-5 h-16 w-16 rounded-full object-cover"
              />
              <h3 className="mb-3 text-xl font-bold">Guaranteed</h3>
              <p className="text-sm leading-6 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>

            <div className=" p-6 shadow-sm">
              <img
                src={movie}
                alt="Affordable Icon"
                className="mb-5 h-16 w-16 rounded-full object-cover"
              />
              <h3 className="mb-3 text-xl font-bold">Affordable</h3>
              <p className="text-sm leading-6 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>

            <div className=" p-6 shadow-sm">
              <img
                src={movie}
                alt="Customer Support Icon"
                className="mb-5 h-16 w-16 rounded-full object-cover"
              />
              <h3 className="mb-3 text-xl font-bold">24/7 Customer Support</h3>
              <p className="text-sm leading-6 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>
          </section>
        </article>
        {/* Movies Section (Terupdate Sesuai Desain Referensi) */}
        <article className="mx-auto max-w-7xl py-8">
          <div className="text-center">
            <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-primary">
              Movie
            </p>
            <h2 className="mx-auto mb-12 max-w-2xl text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
              Exciting Movies That Should Be Watched Today
            </h2>
          </div>

          {/* Grid menggunakan gap-8 agar tata letak teks bawah tidak terlalu mepet */}
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((item) => (
              <div key={item.id} className="group relative flex flex-col">
                {/* Poster Wrapper */}
                <div className="relative aspect-2/3-full overflow rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Recommended Badge */}
                  {item.recommended && (
                    <div className="absolute -left-2 top-2 z-20">
                      <div className="relative">
                        <div className="rounded-r-full bg-primary px-3 py-1 pr-5 text-xs font-semibold tracking-wide text-white">
                          Recommended
                        </div>

                        <div className="h-0 w-0 border-l-8 border-t-11 border-l-transparent border-t-primary" />
                      </div>
                    </div>
                  )}{" "}
                  <img
                    src={movie}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
                  {/* Hover Buttons */}
                  <div className="absolute left-1/2 top-1/2 z-20 flex w-full max-w-45 -translate-x-1/2 translate-y-6 flex-col gap-2.5 opacity-0 transition-all duration-300 group-hover:translate-y-[-50%] group-hover:opacity-100 group-focus-within:translate-y-[-50%] group-focus-within:opacity-100">
                    <button className="w-full rounded-lg border-2 border-white bg-black/20 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">
                      Details
                    </button>

                    <button className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                      Buy Ticket
                    </button>
                  </div>{" "}
                </div>

                {/* Detail Content */}
                <div className="mt-4 flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {item.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <p className="mt-12 text-center font-semibold text-primary cursor-pointer hover:underline">
            View All &rarr;
          </p>
        </article>
        {/* Upcoming Movies (Terupdate Menggunakan Rasio Poster Film) */}
        <article className="mx-auto max-w-7xl py-8">
          <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-primary">
            UPCOMING MOVIES
          </p>
          <h2 className="mb-12 max-w-2xl text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Exciting Movie Coming Soon
          </h2>
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: 1,
                title: "Black Widow",
                genres: ["Action", "Adventure"],
              },
              {
                id: 2,
                title: "The Witches",
                genres: ["Comedy", "Adventure"],
              },
              {
                id: 3,
                title: "Tenet",
                genres: ["Action", "Sci-Fi"],
              },
              {
                id: 4,
                title: "Spiderman",
                genres: ["Action", "Adventure"],
              },
            ].map((item) => (
              <div key={item.id} className="group relative flex flex-col">
                <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={movie}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-1/2 top-1/2 z-20 flex w-full max-w-45 -translate-x-1/2 translate-y-6 flex-col gap-2.5 opacity-0 transition-all duration-300 group-hover:translate-y-[-50%] group-hover:opacity-100 group-focus-within:translate-y-[-50%] group-focus-within:opacity-100">
                    <button className="w-full rounded-lg border-2 border-white bg-black/20 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">
                      Details
                    </button>

                    <button className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                      Buy Ticket
                    </button>
                  </div>{" "}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-primary">
                    December 2024
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>{" "}
        </article>
        {/* Newsletter Section */}
        <article className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-primary px-6 py-16 text-center md:px-12 md:py-20">
          {" "}
          {/* Decorative circle */}
          <div className="pointer-events-none absolute -bottom-40 -right-32 h-72 w-72 rounded-full border-14 border-white md:-bottom-44 md:-right-28 md:h-80 md:w-80" />
          <h2 className="relative z-10 text-2xl font-light tracking-wide text-white md:text-3xl lg:text-4xl">
            Subscribe to our newsletter
          </h2>
          <form className="relative z-10 mx-auto mt-6 max-w-3xl">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_0.8fr]">
              <input
                className="h-12 rounded-lg border border-white/80 bg-white/5 px-4 text-base text-white outline-none placeholder:text-white/70 focus:border-white focus:bg-white/10"
                type="text"
                placeholder="First name"
              />
              <input
                className="h-12 rounded-lg border border-white/80 bg-white/5 px-4 text-base text-white outline-none placeholder:text-white/70 focus:border-white focus:bg-white/10"
                type="email"
                placeholder="Email address"
              />
              <button
                className="h-12 rounded-lg bg-white px-4 text-base font-bold text-primary transition hover:bg-gray-100"
                type="submit"
              >
                Subscribe Now
              </button>
            </div>
          </form>{" "}
        </article>{" "}
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
