import React from "react";
import MovieCard from "../components/MovieCard";
import { moviesData } from "../data/moviesData";
import background from "../assets/images/background.png";
import searchIcon from "../assets/images/Search.png";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import sliderIndicator from "../assets/images/slider-indicator.png";
import pagination from "../assets/images/pagination.png";
import HomeLayout from "../layouts/HomeLayout";

function HomeMoviePage() {
  return (
    <HomeLayout>
      <section
        className="relative bg-cover bg-center bg-no-repeat px-6 py-12 text-left text-white sm:py-20 lg:py-32"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="mx-auto max-w-7xl lg:px-4">
          <div className="lg:max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-200 sm:text-sm">
              LIST MOVIE OF THE WEEK
            </p>

            <h1 className="text-2xl font-semibold leading-relaxed sm:text-3xl lg:text-5xl">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <img src={sliderIndicator} alt="Slider Indicator" className="h-1.5" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-16">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Search */}
          <div className="shrink-0">
            <label className="mb-2 block text-sm text-slate-600">
              Cari Event
            </label>

            <div className="flex h-12 w-72 items-center rounded border border-slate-200 bg-white px-4">
              <img src={searchIcon} alt="Search" className="mr-2 h-5 w-5" />

              <input
                type="text"
                placeholder="New Born Expert"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex-1">
            <p className="mb-2 text-sm text-slate-600">Filter</p>

            <div className="flex flex-wrap items-center gap-6 lg:gap-20">
              <button className="rounded-lg bg-primary px-6 py-2 text-sm text-white">
                Thriller
              </button>

              <button className="text-sm text-slate-600">Horror</button>
              <button className="text-sm text-slate-600">Romantic</button>
              <button className="text-sm text-slate-600">Adventure</button>
              <button className="text-sm text-slate-600">Sci-Fi</button>
            </div>
          </div>
        </div>

        {/* Movies */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {moviesData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <img
            src={pagination}
            alt="Pagination"
            className="h-10 object-contain"
          />
        </div>
      </section>

      <Newsletter />
    </HomeLayout>
  );
}

export default HomeMoviePage;
