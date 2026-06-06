import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="group">
      {/* Poster */}
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white">
        {movie.recommended && (
          <div className="absolute left-0 top-0 z-20 rounded-br-lg rounded-tl-lg bg-primary px-4 py-1 text-xs text-white">
            Recommended
          </div>
        )}
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-[380px] w-full object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-[140px] flex-col gap-3">
            <button className="rounded border border-white py-2 text-sm text-white transition hover:bg-white hover:text-black">
              Details
            </button>

            <button className="rounded bg-primary py-2 text-sm text-white transition hover:bg-primary/80">
              Buy Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-slate-900">
          {movie.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {movie.genre.split(",").map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-4 py-1 text-sm text-slate-500"
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