function FilterField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-3 hidden text-sm font-semibold text-neutral-700 lg:block">
        {label}
      </span>

      {children}
    </label>
  );
}

export default function MovieDetailFilterBar({
  filterDate,
  filterTime,
  filterLocation,
  selectableDateOptions,
  timeOptions,
  locationOptions,
  scheduleLoading,
  scheduleError,
  hasFiltered,
  cinemaCount,
  onDateChange,
  onTimeChange,
  onLocationChange,
  onFilter,
  isTimeOptionDisabled,
}) {
  return (
    <section className="mx-auto max-w-7xl py-8 sm:py-12">
      <h2 className="mb-5 text-center text-base font-semibold text-neutral-900 sm:mb-8 sm:text-3xl">
        Showtimes and Tickets
      </h2>

      <div className="mx-auto grid max-w-sm gap-3 lg:max-w-none lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-5">
        <FilterField label="Choose Date">
          <select
            value={filterDate}
            disabled={selectableDateOptions.length === 0}
            onChange={(event) => onDateChange(event.target.value)}
            className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm lg:h-16 lg:text-base"
          >
            {selectableDateOptions.length === 0 ? (
              <option value="">No date available</option>
            ) : (
              <>
                <option value="">All Dates</option>

                {selectableDateOptions.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </>
            )}
          </select>
        </FilterField>

        <FilterField label="Choose Time">
          <select
            value={filterTime}
            onChange={(event) => onTimeChange(event.target.value)}
            disabled={timeOptions.length === 0}
            className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
          >
            {timeOptions.length === 0 ? (
              <option value="">No time available</option>
            ) : (
              <>
                <option value="">All Times</option>

                {timeOptions.map((time) => (
                  <option
                    key={time.value}
                    value={time.value}
                    disabled={isTimeOptionDisabled(time.value)}
                  >
                    {time.label}
                  </option>
                ))}
              </>
            )}
          </select>
        </FilterField>

        <FilterField label="Choose Location">
          <select
            value={filterLocation}
            onChange={(event) => onLocationChange(event.target.value)}
            disabled={locationOptions.length === 0}
            className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-100 px-4 text-xs font-medium text-neutral-500 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
          >
            {locationOptions.length === 0 ? (
              <option value="">No location available</option>
            ) : (
              <>
                <option value="">All Locations</option>

                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </>
            )}
          </select>
        </FilterField>

        <button
          type="button"
          onClick={onFilter}
          disabled={scheduleLoading}
          className="h-10 rounded-md bg-primary px-10 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-sm lg:h-16 lg:rounded-lg lg:text-base"
        >
          {scheduleLoading ? "Filtering..." : "Filter"}
        </button>
      </div>

      {(hasFiltered || scheduleError) && (
        <p className="mt-4 text-center text-xs font-medium text-neutral-400 sm:text-sm">
          {scheduleError || `${cinemaCount} Result`}
        </p>
      )}
    </section>
  );
}
