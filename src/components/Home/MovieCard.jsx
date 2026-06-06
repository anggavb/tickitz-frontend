import movie from "../../assets/movie.jpeg";

function MovieCard({ title, date, genres = [], recommended = false }) {
  return (
    <div className="group relative flex w-36.25 shrink-0 snap-start flex-col sm:w-auto">
      <div className="relative aspect-2/3 w-full overflow rounded-lg transition-transform duration-300 group-hover:scale-[1.02] md:rounded-2xl">
        {recommended && (
          <div className="absolute -left-2 top-2 z-20">
            <div className="relative">
              <div className="rounded-r-full bg-primary px-3 py-1 pr-5 text-[10px] font-semibold tracking-wide text-white md:text-xs">
                Recommended
              </div>

              <div className="h-0 w-0 border-l-8 border-t-10 border-l-transparent border-t-primary" />
            </div>
          </div>
        )}

        <img src={movie} alt={title} className="h-full w-full object-cover" />

        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-1/2 top-1/2 z-20 flex w-[80%] -translate-x-1/2 translate-y-6 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:-translate-y-1/2 group-hover:opacity-100">
          <button className="rounded-lg border border-white bg-black/20 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">
            Details
          </button>

          <button className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90">
            Buy Ticket
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h3 className="truncate text-xs font-bold text-neutral-900 transition-colors group-hover:text-primary md:text-xl">
          {title}
        </h3>

        {date && (
          <p className="text-[10px] font-semibold text-primary md:text-base">
            {date}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {genres.map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-violet-50 px-2.5 py-1 text-[9px] font-medium text-violet-400 md:px-4 md:py-1.5 md:text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
