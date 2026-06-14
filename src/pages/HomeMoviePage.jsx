import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import background from "../assets/images/background.png";
import searchIcon from "../assets/images/Search.png";
import Newsletter from "../components/Newsletter";
import sliderIndicator from "../assets/images/slider-indicator.png";
import Pagination from "../components/Pagination";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../redux/slice/movieSlice";
import { useDebounce } from "../hooks/useDebounce";

function HomeMoviePage() {
  const dispatch = useDispatch();
  const { dataMovies } = useSelector((state) => state.movie);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
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

  const moviesData = dataMovies?.data;

  const categories = ["Thriller", "Horror", "Romantic", "Adventure", "Sci-Fi"];
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