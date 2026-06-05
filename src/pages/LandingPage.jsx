import React from "react";
import movie from "../assets/movie.jpeg";

function LandingPage() {
  return (
    <main className="min-h-screen bg-(--bg-primary) px-6 py-10 text-gray-900 md:px-12 lg:px-20">
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

          <div className="flex flex-col gap-5">
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
      <article className="mx-auto max-w-7xl py-16">
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
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
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
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
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
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>
        </section>
        <section className="mt-10 overflow-hidden rounded-3xl">
          <img
            src={movie}
            alt="Cinema banner"
            className="h-72 w-full object-cover md:h-96"
          />
        </section>
      </article>

      {/* Movies */}
      <article className="mx-auto max-w-7xl py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Movies
        </p>

        <h2 className="mb-8 max-w-2xl text-3xl font-bold md:text-4xl">
          Exciting Movies That Should Be Watched Today
        </h2>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="overflow-hidden ">
              <img
                src={movie}
                alt="Movie"
                className="h-72 w-full object-cover"
              />

              <div className="flex flex-wrap gap-2 p-5">
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300">
                  Action
                </span>

                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300">
                  Adventure
                </span>
              </div>
            </div>
          ))}
        </section>

        <div className="mt-8">
          <button className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white">
            View All
          </button>
        </div>
      </article>

      {/* Newsletter */}
      <article className="mx-auto max-w-5xl rounded-3xl bg-white px-6 py-12 text-center shadow-sm md:px-12">
        <h2 className="text-3xl font-bold md:text-4xl">
          Subscribe to our newsletter
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Exciting Movies That Should Be Watched Today
        </p>

        <form className="mt-8">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <input
              className="rounded-full border border-gray-300 px-5 py-3 outline-none focus:border-primary"
              type="text"
              placeholder="First name"
            />

            <input
              className="rounded-full border border-gray-300 px-5 py-3 outline-none focus:border-primary"
              type="email"
              placeholder="Email address"
            />

            <button
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90"
              type="submit"
            >
              Subscribe Now
            </button>
          </div>
        </form>
      </article>
    </main>
  );
}

export default LandingPage;
