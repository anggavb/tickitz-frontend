import apiClient from "../axios";

export function getMovieDetail(slug, config = {}) {
  return apiClient.get(`/movies/${slug}`, config);
}

export function getMovieScheduleOptions(slug, config = {}) {
  return apiClient.get(`/movies/${slug}/schedule-options`, config);
}

export function getFilteredMovieSchedules(slug, filter = {}, config = {}) {
  const params = {
    ...(config.params ?? {}),
  };

  if (filter.date) params.date = filter.date;
  if (filter.time) params.time = filter.time;
  if (filter.location) params.location = filter.location;

  return apiClient.get(`/movies/${slug}/schedules`, {
    ...config,
    params,
  });
}

export function getMovieLocations(config = {}) {
  return apiClient.get("/movies/locations", config);
}

export function getMovieShowtimes(config = {}) {
  return apiClient.get("/movies/showtimes", config);
}
