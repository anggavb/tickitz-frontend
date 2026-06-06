import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="group">
      {/* Poster */}
      <div className="relative  rounded-lg border border-slate-200 bg-white">
        {movie.recommended && (
          <div className="absolute -left-2 top-2 z-20 md:top-4">
            <div className="relative">
              <div className="rounded-r-full rounded-tl-full bg-primary px-3 py-1 pr-5 text-[10px] font-semibold tracking-wide text-white sm:px-4 sm:py-1.5 sm:pr-6 md:text-xs">
                Recommended
              </div>

              <div className="h-0 w-0 border-l-8 border-t-10 border-l-transparent border-t-primary" />
            </div>
          </div>
        )}

        <img
          src={movie.poster}
          alt={movie.title}
          className="h-95 w-full object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-35 flex-col gap-3">
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
        <h3 className="text-2xl font-semibold text-slate-900">{movie.title}</h3>

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
