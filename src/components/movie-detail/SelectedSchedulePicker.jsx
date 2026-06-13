export default function SelectedSchedulePicker({
  cinema,
  selectedMovieCinemaId,
  onSelect,
}) {
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-lg border border-neutral-200 bg-white px-5 py-5 text-center shadow-sm">
      <h3 className="text-sm font-semibold text-neutral-900">
        Selected Schedule
      </h3>

      <p className="mt-1 text-xs text-neutral-400">{cinema.name}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {cinema.showtimes.map((showtime) => {
          const isActive =
            String(showtime.movieCinemaID) === String(selectedMovieCinemaId);

          return (
            <button
              key={`${showtime.movieCinemaID}-${showtime.showDate}-${showtime.timeValue}`}
              type="button"
              onClick={() => onSelect(showtime)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-500 hover:bg-primary hover:text-white"
              }`}
            >
              {showtime.showDate} - {showtime.timeLabel}
            </button>
          );
        })}
      </div>
    </section>
  );
}
