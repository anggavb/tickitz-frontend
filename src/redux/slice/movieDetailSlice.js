import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import apiClient from '@/utils/axios';
import {
  getFilteredMovieSchedules,
  getMovieDetail,
  getMovieLocations,
  getMovieScheduleOptions,
  getMovieShowtimes,
} from '@/utils/api/movieDetailApi';
import {
  getCinemaList,
  getLocalDateValue,
  getLocalTimeValue,
  isPastDateValue,
  isPastTimeForDate,
  normalizeDateOptions,
  normalizeLocationOptions,
  normalizeMovieDetail,
  normalizeSchedules,
  normalizeTimeOptions,
} from '@/utils/api/movieDetailMappers';
import {
  getErrorMessage,
  getSettledData,
  isCanceledRequest,
} from '@/utils/api/movieDetailRequestUtils';

const CINEMA_PER_PAGE = 4;

const EMPTY_FILTER = {
  date: '',
  time: '',
  location: '',
};

function getCurrentDateTime() {
  const now = new Date();

  return {
    currentDateValue: getLocalDateValue(now),
    currentTimeValue: getLocalTimeValue(now),
  };
}

function getInitialState() {
  return {
    movie: null,
    dateOptions: [],
    locationOptions: [],
    timeOptions: [],
    cinemaSchedules: [],
    filter: { ...EMPTY_FILTER },
    appliedFilter: { ...EMPTY_FILTER },
    selectedDate: '',
    selectedTime: '',
    selectedLocation: '',
    selectedCinemaId: '',
    selectedMovieCinemaId: '',
    currentPage: 1,
    hasFiltered: false,
    hideInitialScheduleError: false,
    detailLoading: true,
    detailError: '',
    scheduleLoading: false,
    scheduleError: '',
    scheduleWarning: '',
    bookingLoading: false,
    bookingError: '',
    ...getCurrentDateTime(),
  };
}

const resetSelectedSchedule = (state) => {
  state.selectedDate = '';
  state.selectedTime = '';
  state.selectedLocation = '';
  state.selectedCinemaId = '';
  state.selectedMovieCinemaId = '';
};

const resetFilterResult = (state) => {
  state.hasFiltered = false;
  state.cinemaSchedules = [];
  state.currentPage = 1;
  resetSelectedSchedule(state);
};

export const fetchMovieDetailPage = createAsyncThunk(
  'movieDetail/fetchPage',
  async (slug, thunkAPI) => {
    try {
      const movieResponse = await getMovieDetail(slug, {
        signal: thunkAPI.signal,
      });

      const [scheduleOptionResult, locationResult, timeResult] =
        await Promise.allSettled([
          getMovieScheduleOptions(slug, { signal: thunkAPI.signal }),
          getMovieLocations({ signal: thunkAPI.signal }),
          getMovieShowtimes({ signal: thunkAPI.signal }),
        ]);

      const rawMovie = movieResponse.data?.data ?? movieResponse.data;
      const rawScheduleOptions = getSettledData(scheduleOptionResult, {});
      const rawLocations = getSettledData(locationResult, []);
      const rawTimes = getSettledData(timeResult, []);
      const hasScheduleWarning =
        scheduleOptionResult.status === 'rejected' ||
        locationResult.status === 'rejected' ||
        timeResult.status === 'rejected';

      return {
        movie: normalizeMovieDetail(rawMovie),
        dateOptions: normalizeDateOptions(rawScheduleOptions),
        locationOptions: normalizeLocationOptions(rawLocations),
        timeOptions: normalizeTimeOptions(rawTimes),
        scheduleWarning: hasScheduleWarning
          ? 'Some schedule options failed to load. You can still try filtering.'
          : '',
      };
    } catch (error) {
      if (isCanceledRequest(error)) throw error;

      return thunkAPI.rejectWithValue(getErrorMessage(error, 'Something went wrong'));
    }
  },
);

export const fetchFilteredMovieSchedules = createAsyncThunk(
  'movieDetail/fetchFilteredSchedules',
  async ({ slug }, thunkAPI) => {
    const { movieDetail } = thunkAPI.getState();
    const nextAppliedFilter = { ...movieDetail.filter };

    if (
      !nextAppliedFilter.date &&
      !nextAppliedFilter.time &&
      !nextAppliedFilter.location
    ) {
      return thunkAPI.rejectWithValue({
        kind: 'validation',
        message: 'Choose at least one date, time, or location first.',
      });
    }

    if (isPastDateValue(nextAppliedFilter.date, movieDetail.currentDateValue)) {
      return thunkAPI.rejectWithValue({
        kind: 'validation',
        message: 'Choose a date that has not passed.',
      });
    }

    if (
      isPastTimeForDate(
        nextAppliedFilter.time,
        nextAppliedFilter.date,
        movieDetail.currentDateValue,
        movieDetail.currentTimeValue,
      )
    ) {
      return thunkAPI.rejectWithValue({
        kind: 'validation',
        message: 'Choose a time that has not passed.',
      });
    }

    try {
      const scheduleResponse = await getFilteredMovieSchedules(
        slug,
        nextAppliedFilter,
        { signal: thunkAPI.signal },
      );
      const rawSchedules = scheduleResponse.data?.data ?? scheduleResponse.data;

      return {
        appliedFilter: nextAppliedFilter,
        cinemaSchedules: normalizeSchedules(rawSchedules),
      };
    } catch (error) {
      if (isCanceledRequest(error)) throw error;

      return thunkAPI.rejectWithValue({
        kind: 'request',
        appliedFilter: nextAppliedFilter,
        message: getErrorMessage(error, 'Failed to load cinema schedules.'),
      });
    }
  },
);

export const createMovieDetailOrder = createAsyncThunk(
  'movieDetail/createOrder',
  async (_, thunkAPI) => {
    const { selectedMovieCinemaId } = thunkAPI.getState().movieDetail;

    try {
      const response = await apiClient.post('/orders', {
        movie_cinema_id: Number(selectedMovieCinemaId),
      });

      return response.data?.data ?? response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: getErrorMessage(error, 'Please try again later.'),
      });
    }
  },
);

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState: getInitialState(),
  reducers: {
    resetMovieDetailState: () => getInitialState(),
    updateCurrentDateTime: (state) => {
      Object.assign(state, getCurrentDateTime());
    },
    setFilterDate: (state, action) => {
      state.filter.date = action.payload;

      if (
        state.filter.time &&
        isPastTimeForDate(
          state.filter.time,
          action.payload,
          state.currentDateValue,
          state.currentTimeValue,
        )
      ) {
        state.filter.time = '';
      }
    },
    setFilterTime: (state, action) => {
      state.filter.time = action.payload;
    },
    setFilterLocation: (state, action) => {
      state.filter.location = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    selectCinema: (state, action) => {
      const cinema = action.payload;
      const firstShowtime = cinema?.showtimes?.[0];

      if (!cinema || !firstShowtime) return;

      const nextDate = state.appliedFilter.date || firstShowtime.showDate || '';
      const nextTime = state.appliedFilter.time || firstShowtime.timeValue || '';
      const nextLocation = state.appliedFilter.location || cinema.location || '';

      state.selectedCinemaId = cinema.id;
      state.selectedDate = nextDate;
      state.selectedTime = nextTime;
      state.selectedLocation = nextLocation;
      state.selectedMovieCinemaId = String(firstShowtime.movieCinemaID);
      state.filter.date = nextDate;
      state.filter.time = nextTime;
      state.filter.location = nextLocation;
    },
    selectShowtime: (state, action) => {
      const { cinema, showtime } = action.payload;

      if (!cinema || !showtime) return;

      const nextDate = state.appliedFilter.date || showtime.showDate || '';
      const nextTime = showtime.timeValue;
      const nextLocation = state.appliedFilter.location || cinema.location || '';

      state.selectedCinemaId = cinema.id;
      state.selectedDate = nextDate;
      state.selectedTime = nextTime;
      state.selectedLocation = nextLocation;
      state.selectedMovieCinemaId = String(showtime.movieCinemaID);
      state.filter.date = nextDate;
      state.filter.time = nextTime;
      state.filter.location = nextLocation;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetailPage.pending, (state) => {
        state.detailLoading = true;
        state.detailError = '';
        state.scheduleWarning = '';
      })
      .addCase(fetchMovieDetailPage.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.movie = action.payload.movie;
        state.dateOptions = action.payload.dateOptions;
        state.locationOptions = action.payload.locationOptions;
        state.timeOptions = action.payload.timeOptions;
        state.scheduleWarning = action.payload.scheduleWarning;
      })
      .addCase(fetchMovieDetailPage.rejected, (state, action) => {
        state.detailLoading = false;

        if (action.meta.aborted) return;

        state.movie = null;
        state.detailError = action.payload || action.error.message || 'Something went wrong';
      })
      .addCase(fetchFilteredMovieSchedules.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = '';
        state.hideInitialScheduleError = true;
      })
      .addCase(fetchFilteredMovieSchedules.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.cinemaSchedules = action.payload.cinemaSchedules;
        state.hasFiltered = true;
        state.appliedFilter = action.payload.appliedFilter;
        state.currentPage = 1;
        resetSelectedSchedule(state);
      })
      .addCase(fetchFilteredMovieSchedules.rejected, (state, action) => {
        state.scheduleLoading = false;

        if (action.meta.aborted) return;

        state.scheduleError =
          action.payload?.message ||
          action.error.message ||
          'Failed to load cinema schedules.';

        if (action.payload?.kind === 'request') {
          state.cinemaSchedules = [];
          state.hasFiltered = true;
          state.appliedFilter = action.payload.appliedFilter;
          state.currentPage = 1;
          resetSelectedSchedule(state);
          return;
        }

        resetFilterResult(state);
      })
      .addCase(createMovieDetailOrder.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = '';
      })
      .addCase(createMovieDetailOrder.fulfilled, (state) => {
        state.bookingLoading = false;
      })
      .addCase(createMovieDetailOrder.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError =
          action.payload?.message || action.error.message || 'Please try again later.';
      });
  },
});

export const {
  resetMovieDetailState,
  selectCinema,
  selectShowtime,
  setCurrentPage,
  setFilterDate,
  setFilterLocation,
  setFilterTime,
  updateCurrentDateTime,
} = movieDetailSlice.actions;

const selectMovieDetailState = (state) => state.movieDetail;

export const selectMovieDetailPageState = createSelector(
  [selectMovieDetailState],
  (movieDetail) => ({
    movie: movieDetail.movie,
    dateOptions: movieDetail.dateOptions,
    locationOptions: movieDetail.locationOptions,
    timeOptions: movieDetail.timeOptions,
    filterDate: movieDetail.filter.date,
    filterTime: movieDetail.filter.time,
    filterLocation: movieDetail.filter.location,
    loading: movieDetail.detailLoading,
    error: movieDetail.detailError,
    scheduleLoading: movieDetail.scheduleLoading,
    scheduleError:
      movieDetail.scheduleError ||
      (!movieDetail.hideInitialScheduleError ? movieDetail.scheduleWarning : ''),
    hasFiltered: movieDetail.hasFiltered,
    currentPage: movieDetail.currentPage,
    selectedCinemaId: movieDetail.selectedCinemaId,
    selectedDate: movieDetail.selectedDate,
    selectedTime: movieDetail.selectedTime,
    selectedLocation: movieDetail.selectedLocation,
    selectedMovieCinemaId: movieDetail.selectedMovieCinemaId,
    bookingLoading: movieDetail.bookingLoading,
    currentDateValue: movieDetail.currentDateValue,
    currentTimeValue: movieDetail.currentTimeValue,
  }),
);

export const selectSelectableDateOptions = createSelector(
  [selectMovieDetailState],
  (movieDetail) =>
    movieDetail.dateOptions.filter(
      (date) => !isPastDateValue(date, movieDetail.currentDateValue),
    ),
);

export const selectIsTimeOptionDisabled = createSelector(
  [selectMovieDetailState],
  (movieDetail) => (timeValue, dateValue = movieDetail.filter.date) =>
    isPastTimeForDate(
      timeValue,
      dateValue,
      movieDetail.currentDateValue,
      movieDetail.currentTimeValue,
    ),
);

export const selectSelectedTimeLabel = createSelector(
  [selectMovieDetailState],
  (movieDetail) =>
    movieDetail.timeOptions.find(
      (timeOption) => timeOption.value === movieDetail.selectedTime,
    )?.label ?? movieDetail.selectedTime,
);

export const selectAppliedTimeLabel = createSelector(
  [selectMovieDetailState],
  (movieDetail) =>
    movieDetail.timeOptions.find(
      (timeOption) => timeOption.value === movieDetail.appliedFilter.time,
    )?.label ?? movieDetail.appliedFilter.time,
);

export const selectCinemaList = createSelector(
  [selectMovieDetailState],
  (movieDetail) =>
    getCinemaList(
      movieDetail.cinemaSchedules,
      movieDetail.appliedFilter.date,
      movieDetail.appliedFilter.time,
      movieDetail.appliedFilter.location,
    ),
);

export const selectSelectedCinema = createSelector(
  [selectCinemaList, selectMovieDetailState],
  (cinemaList, movieDetail) =>
    cinemaList.find((cinema) => cinema.id === movieDetail.selectedCinemaId) ??
    null,
);

export const selectSelectedShowtime = createSelector(
  [selectSelectedCinema, selectMovieDetailState],
  (selectedCinema, movieDetail) =>
    selectedCinema?.showtimes.find(
      (showtime) =>
        String(showtime.movieCinemaID) ===
        String(movieDetail.selectedMovieCinemaId),
    ) ?? null,
);

export const selectSelectedPrice = createSelector(
  [selectSelectedShowtime, selectSelectedCinema],
  (selectedShowtime, selectedCinema) =>
    selectedShowtime?.price ?? selectedCinema?.price ?? '',
);

export const selectCanBook = createSelector(
  [selectMovieDetailState, selectSelectedCinema],
  (movieDetail, selectedCinema) =>
    Boolean(
      movieDetail.selectedDate &&
        movieDetail.selectedTime &&
        movieDetail.selectedLocation &&
        selectedCinema &&
        movieDetail.selectedMovieCinemaId,
    ),
);

export const selectTotalPages = createSelector([selectCinemaList], (cinemaList) =>
  Math.ceil(cinemaList.length / CINEMA_PER_PAGE),
);

export const selectPages = createSelector([selectTotalPages], (totalPages) =>
  Array.from({ length: totalPages }, (_, index) => index + 1),
);

export const selectVisibleCinemas = createSelector(
  [selectCinemaList, selectMovieDetailState],
  (cinemaList, movieDetail) => {
    const startIndex = (movieDetail.currentPage - 1) * CINEMA_PER_PAGE;
    const endIndex = startIndex + CINEMA_PER_PAGE;

    return cinemaList.slice(startIndex, endIndex);
  },
);

export const selectEmptyScheduleMessage = createSelector(
  [selectMovieDetailState, selectAppliedTimeLabel],
  (movieDetail, appliedTimeLabel) => {
    const { date, time, location } = movieDetail.appliedFilter;
    const isFilterApplied = Boolean(date || time || location);

    if (!isFilterApplied) return 'No cinema schedule available.';
    if (location && time && date) {
      return `No cinema available in ${location} at ${appliedTimeLabel} on ${date}.`;
    }
    if (location && time) {
      return `No cinema available in ${location} at ${appliedTimeLabel}.`;
    }
    if (location && date) return `No cinema available in ${location} on ${date}.`;
    if (time && date) return `No cinema available at ${appliedTimeLabel} on ${date}.`;
    if (location) return `No cinema available in ${location}.`;
    if (time) return `No cinema available at ${appliedTimeLabel}.`;
    if (date) return `No cinema available on ${date}.`;

    return 'No cinema schedule matches your filter.';
  },
);

export const selectMovieDetailScheduleState = createSelector(
  [
    selectMovieDetailPageState,
    selectSelectableDateOptions,
    selectIsTimeOptionDisabled,
    selectCinemaList,
    selectVisibleCinemas,
    selectEmptyScheduleMessage,
    selectTotalPages,
    selectPages,
    selectSelectedCinema,
    selectSelectedTimeLabel,
    selectSelectedPrice,
    selectCanBook,
  ],
  (
    pageState,
    selectableDateOptions,
    isTimeOptionDisabled,
    cinemaList,
    visibleCinemas,
    emptyScheduleMessage,
    totalPages,
    pages,
    selectedCinema,
    selectedTimeLabel,
    selectedPrice,
    canBook,
  ) => ({
    ...pageState,
    selectableDateOptions,
    isTimeOptionDisabled,
    cinemaList,
    visibleCinemas,
    emptyScheduleMessage,
    totalPages,
    pages,
    selectedCinema,
    selectedTimeLabel,
    selectedPrice,
    canBook,
    activeCinemaId: selectedCinema?.id ?? '',
  }),
);

export default movieDetailSlice.reducer;
