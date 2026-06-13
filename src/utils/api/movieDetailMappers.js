import env from "../env";

const API_BASE_URL = (env.baseAPI || "").replace(/\/$/, "");

export function buildAssetUrl(path) {
  const value = String(path ?? "").trim();

  if (!value) return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (!API_BASE_URL) {
    return value.startsWith("/") ? value : `/${value}`;
  }

  return `${API_BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function normalizeTextValue(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export function getTimeLabel(time) {
  return String(time ?? "").trim();
}

export function getTimeValue(time) {
  const rawTime = getTimeLabel(time);

  if (!rawTime) return "";

  const amPmMatch = rawTime.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/i);

  if (amPmMatch) {
    let hour = Number(amPmMatch[1]);
    const minute = Number(amPmMatch[2]);
    const period = amPmMatch[3].toUpperCase();

    if (period === "AM" && hour === 12) hour = 0;
    if (period === "PM" && hour !== 12) hour += 12;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  const time24Match = rawTime.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);

  if (time24Match) {
    return `${String(Number(time24Match[1])).padStart(2, "0")}:${String(
      Number(time24Match[2]),
    ).padStart(2, "0")}`;
  }

  return normalizeTextValue(rawTime);
}

export function getTimeSortValue(time) {
  const timeValue = getTimeValue(time);
  const match = timeValue.match(/^(\d{2}):(\d{2})$/);

  if (!match) return Number.MAX_SAFE_INTEGER;

  return Number(match[1]) * 60 + Number(match[2]);
}

export function getLocalDateValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getLocalTimeValue(date = new Date()) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${hour}:${minute}`;
}

export function isPastDateValue(dateValue, currentDateValue) {
  return Boolean(dateValue) && dateValue < currentDateValue;
}

export function isPastTimeForDate(
  timeValue,
  dateValue,
  currentDateValue,
  currentTimeValue,
) {
  if (!timeValue || !dateValue) return false;
  if (dateValue !== currentDateValue) return false;

  return timeValue <= currentTimeValue;
}

export function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "-";

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) return price;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

function getRows(rawData, keys = []) {
  if (Array.isArray(rawData)) return rawData;
  if (Array.isArray(rawData?.data)) return rawData.data;

  for (const key of keys) {
    if (Array.isArray(rawData?.[key])) return rawData[key];
    if (Array.isArray(rawData?.data?.[key])) return rawData.data[key];
  }

  return [];
}

function normalizeGenre(genre) {
  if (typeof genre === "string") return genre.trim();

  return String(
    genre?.name ??
      genre?.title ??
      genre?.genre ??
      genre?.category ??
      genre?.category_name ??
      "",
  ).trim();
}

function formatDuration(movie) {
  const duration =
    movie?.duration_in_min ?? movie?.duration_in_minute ?? movie?.duration;

  if (!duration) return "-";

  return typeof duration === "number" ? `${duration} minutes` : duration;
}

export function normalizeMovieDetail(rawMovie) {
  const posterPath =
    rawMovie?.poster ?? rawMovie?.image_poster ?? rawMovie?.image ?? "";

  const backgroundPath =
    rawMovie?.background ??
    rawMovie?.image_background ??
    rawMovie?.image_poster ??
    rawMovie?.image ??
    "";

  const rawGenres =
    rawMovie?.genres ??
    rawMovie?.genres_categories ??
    rawMovie?.categories ??
    [];

  const genres = (Array.isArray(rawGenres) ? rawGenres : [rawGenres])
    .map(normalizeGenre)
    .filter(Boolean);

  return {
    title: rawMovie?.title ?? rawMovie?.name ?? "-",
    background: buildAssetUrl(backgroundPath),
    poster: buildAssetUrl(posterPath),
    genres,
    releaseDate: rawMovie?.releaseDate ?? rawMovie?.release_date ?? "-",
    director: rawMovie?.director ?? rawMovie?.director_name ?? "-",
    duration: formatDuration(rawMovie),
    casts: Array.isArray(rawMovie?.casts)
      ? rawMovie.casts.map((cast) => normalizeGenre(cast)).filter(Boolean).join(", ") || "-"
      : rawMovie?.casts || "-",
    synopsis: rawMovie?.synopsis ?? "-",
    schedules: [],
  };
}

export function normalizeOptionArray(rawData, keys = []) {
  const rows = getRows(rawData, keys);

  return [
    ...new Set(
      rows
        .map((item) => {
          if (typeof item === "string") return item.trim();

          for (const key of keys) {
            if (item?.[key]) return String(item[key]).trim();
          }

          return "";
        })
        .filter(Boolean),
    ),
  ].sort();
}

export function normalizeLocationOptions(rawData) {
  return normalizeOptionArray(rawData, [
    "location",
    "name",
    "city",
    "location_name",
    "locations",
  ]);
}

export function normalizeDateOptions(rawData) {
  const rows = getRows(rawData, ["dates", "schedules", "showtimes"]);

  return [
    ...new Set(
      rows
        .map((date) => {
          if (typeof date === "string") return date.trim();

          return String(
            date?.show_date ?? date?.showDate ?? date?.date ?? date?.schedule_date ?? "",
          ).trim();
        })
        .filter(Boolean),
    ),
  ].sort();
}

export function normalizeTimeOptions(rawData) {
  const rows = getRows(rawData, ["showtimes", "times", "schedules"]);
  const timeMap = new Map();

  rows.forEach((item) => {
    const rawTime =
      typeof item === "string"
        ? item
        : (item?.showtime ?? item?.time ?? item?.show_time ?? "");

    const label = getTimeLabel(rawTime);
    const value = getTimeValue(rawTime);

    if (!label || !value || timeMap.has(value)) return;

    timeMap.set(value, { label, value });
  });

  return Array.from(timeMap.values()).sort(
    (a, b) => getTimeSortValue(a.value) - getTimeSortValue(b.value),
  );
}

export function normalizeSchedules(rawSchedules = []) {
  const rows = getRows(rawSchedules, ["schedules", "showtimes"]);
  const locationMap = new Map();

  rows.forEach((row) => {
    const movieCinemaID =
      row.movie_cinema_id ?? row.movieCinemaID ?? row.movie_cinemaId ?? "";
    const cinemaID = row.cinema_id ?? row.cinemaID ?? row.cinemaId ?? "";
    const location = row.location ?? row.city ?? "Unknown Location";
    const cinemaName = row.cinema_name ?? row.cinemaName ?? row.name ?? "Unknown Cinema";
    const cinemaLogo =
      row.cinema_logo ?? row.cinemaLogo ?? row.logo ?? row.logo_url ?? cinemaName;
    const showDate =
      row.show_date ?? row.showDate ?? row.date ?? row.schedule_date ?? "";
    const rawTime = row.showtime ?? row.time ?? row.show_time ?? "";
    const timeLabel = getTimeLabel(rawTime);
    const timeValue = getTimeValue(rawTime);
    const showtimeID = row.showtime_id ?? row.showtimeID ?? "";
    const price = row.price ?? row.ticket_price ?? row.movie_price ?? "";

    if (!movieCinemaID || !showDate || !timeLabel || !timeValue) return;

    if (!locationMap.has(location)) {
      locationMap.set(location, new Map());
    }

    const cinemaMap = locationMap.get(location);
    const cinemaKey = cinemaID ? `id:${cinemaID}` : `name:${normalizeTextValue(cinemaName)}`;

    if (!cinemaMap.has(cinemaKey)) {
      cinemaMap.set(cinemaKey, {
        cinemaID,
        cinema_name: cinemaName,
        cinemaLogo,
        showtimes: [],
      });
    }

    cinemaMap.get(cinemaKey).showtimes.push({
      movieCinemaID,
      cinemaID,
      cinemaLogo,
      showDate,
      timeLabel,
      timeValue,
      showtimeID,
      price,
    });
  });

  return Array.from(locationMap.entries()).map(([location, cinemaMap]) => ({
    location,
    cinemas: Array.from(cinemaMap.values()).map((cinema) => ({
      cinemaID: cinema.cinemaID,
      cinema_name: cinema.cinema_name,
      cinemaLogo: cinema.cinemaLogo,
      showtimes: cinema.showtimes.sort((a, b) => {
        const dateCompare = a.showDate.localeCompare(b.showDate);

        if (dateCompare !== 0) return dateCompare;

        return getTimeSortValue(a.timeValue) - getTimeSortValue(b.timeValue);
      }),
    })),
  }));
}

export function getCinemaList(schedules, date, timeValue, location) {
  const normalizedLocation = normalizeTextValue(location);

  return schedules
    .filter((schedule) => {
      if (!normalizedLocation) return true;

      return normalizeTextValue(schedule.location) === normalizedLocation;
    })
    .flatMap((schedule) =>
      schedule.cinemas.map((cinema) => {
        const showtimes = cinema.showtimes.filter((showtime) => {
          const matchDate = date ? showtime.showDate === date : true;
          const matchTime = timeValue ? showtime.timeValue === timeValue : true;

          return matchDate && matchTime;
        });

        const firstShowtime = showtimes[0];
        const cinemaKey =
          cinema.cinemaID || firstShowtime?.cinemaID || cinema.cinema_name;

        return {
          id: `${schedule.location}-${cinemaKey}`,
          cinemaID: cinema.cinemaID || firstShowtime?.cinemaID || "",
          location: schedule.location,
          name: cinema.cinema_name,
          logo: firstShowtime?.cinemaLogo || cinema.cinemaLogo || cinema.cinema_name,
          price: firstShowtime?.price ?? "",
          showtimes,
        };
      }),
    )
    .filter((cinema) => cinema.showtimes.length > 0);
}

export function isImageSource(value) {
  const logo = String(value ?? "").trim();

  return (
    logo.startsWith("http://") ||
    logo.startsWith("https://") ||
    logo.startsWith("/") ||
    /\.(png|jpe?g|webp|gif|svg)$/i.test(logo)
  );
}
