import React from "react";
import { useNavigate } from "react-router";
import env from "@/utils/env";

function MovieCard({ movie, showDate = false }) {
  const movieDate = movie.release_date || movie.date || movie.show_date;
  const navigate = useNavigate();
  return (
    <div className="group">
      {/* Poster */}
      <div className="relative aspect-2/3 rounded-lg border border-slate-200 bg-white">
        {movie.recommended && (
          <div className="absolute -left-2 top-1 z-20 md:top-4">
            <div className="relative">
              <div className="rounded-r-full rounded-tl-full bg-primary px-3 py-1 pr-5 text-[10px] font-semibold tracking-wide text-white sm:px-4 sm:py-1.5 sm:pr-6 md:text-xs">
                Recommended
              </div>

              <div className="h-0 w-0 border-l-8 border-t-10 border-l-transparent border-t-orange-800" />
            </div>
          </div>
        )}

        <img
          src={env.baseAPI + movie.Image}
          alt={movie.title}
          className="h-full w-full object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-35 flex-col gap-3">
            <button
              onClick={() => navigate(`/movies/${movie.Slug}`)}
              className="rounded border border-white py-2 text-sm text-white transition hover:bg-white hover:text-black"
            >
              Details
            </button>

            <button
              onClick={() => navigate(`/movies/${movie.Slug}`)}
              className="rounded bg-primary py-2 text-sm text-white transition hover:bg-primary/80"
            >
              Buy Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-slate-900">{movie.Name}</h3>

        {showDate && movieDate && (
          <p className="mt-2 text-sm font-medium text-primary">{movieDate}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {movie.Categories?.map((item) => (
            <span
              key={item}
              className="rounded-full font-bold bg-slate-100 px-4 py-1 text-sm text-slate-500"
            >
              {item.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
