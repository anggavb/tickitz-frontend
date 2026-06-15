import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import searchIcon from "../assets/images/Search.png";
import Newsletter from "../components/Newsletter";
import Pagination from "../components/Pagination";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../redux/slice/movieSlice";
import { useDebounce } from "../hooks/useDebounce";

const backgroundSlides = [
  "/assets/auth/backgrounds/marvel.png",
  "/assets/auth/backgrounds/daredevil.jpg",
  "/assets/auth/backgrounds/ironheart.jpg",
];

function HomeMoviePage() {
  const dispatch = useDispatch();
  const { dataMovies } = useSelector((state) => state.movie);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(
      getMovie({
        page,
        limit: 12,
        name: debouncedSearch,
        category: selectedCategory,
      }),
    );
  }, [dispatch, debouncedSearch, selectedCategory, page]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % backgroundSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const moviesData = dataMovies?.data;

  const categories = ["Thriller", "Horror", "Romantic", "Adventure", "Sci-Fi"];

  return (
    <HomeLayout>
      <section
        className="relative bg-cover bg-center bg-no-repeat px-6 py-12 text-left text-white sm:py-20 lg:py-32"
        style={{
          backgroundImage: `url(${backgroundSlides[slideIndex]})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl lg:px-4">
          <div className="lg:max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-200 sm:text-sm">
              LIST MOVIE OF THE WEEK
            </p>

            <h1 className="text-2xl font-semibold leading-relaxed sm:text-3xl lg:text-5xl">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
          {backgroundSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSlideIndex(index)}
              className={`h-3 w-3 rounded-full transition ${
                index === slideIndex
                  ? "bg-white shadow-lg shadow-white/40"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
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
                placeholder="Search movie"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full outline-none"
              />{" "}
            </div>
          </div>

          {/* Filter */}
          <div className="flex-1">
            <p className="mb-2 text-sm text-slate-600">Filter</p>

            <div className="flex flex-wrap items-center gap-6 lg:gap-20">
              {categories?.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category ? "" : category,
                    );
                    setPage(1);
                  }}
                  className={`rounded-lg px-6 py-2 text-sm ${selectedCategory === category ? "bg-primary text-white" : "text-slate-600"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Movies */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {moviesData?.map((movie, idx) => (
            <MovieCard key={idx} movie={movie} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Pagination
            totalItems={dataMovies?.pagination?.total_data || 0}
            itemsPerPage={12}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </section>

      <Newsletter />
    </HomeLayout>
  );
}

export default HomeMoviePage;