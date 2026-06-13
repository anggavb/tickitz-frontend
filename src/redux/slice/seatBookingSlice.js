import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getMovieCinemaSeats,
  getOrderDetail,
  getOrderPaymentMethods,
  updateOrderPayment,
  updateOrderSeats,
} from "../../utils/api/seatBookingApi";
import {
  formatCurrency,
  formatDate,
  formatTimeToAmPm,
  getApiData,
  getErrorMessage,
  normalizeOrderDetail,
  normalizePaymentMethods,
  normalizeSeats,
} from "../../utils/api/seatBookingMappers";

function getInitialState() {
  return {
    order: null,
    seatsByCode: {},
    seatCodesByRow: {},
    rowLabels: [],
    selectedSeatCodes: [],
    paymentMethods: [],
    selectedPaymentMethod: "",
    paymentReceipt: null,
    paymentModalOpen: false,
    loadingOrder: false,
    loadingSeats: false,
    savingSeats: false,
    loadingPaymentMethods: false,
    submittingPayment: false,
    errorOrder: null,
    errorSeats: null,
    errorCheckout: null,
    errorPaymentMethods: null,
    errorPayment: null,
    success: false,
    message: "",
  };
}

function applySeatPayload(state, payload) {
  state.seatsByCode = payload.seatsByCode;
  state.seatCodesByRow = payload.seatCodesByRow;
  state.rowLabels = payload.rowLabels;
}

function isCanceledRequest(error) {
  return (
    error?.code === "ERR_CANCELED" ||
    error?.name === "CanceledError" ||
    error?.message === "canceled"
  );
}

function ignoreCanceledRequest(error) {
  if (isCanceledRequest(error)) throw error;
}

export const fetchSeatBookingPage = createAsyncThunk(
  "seatBooking/fetchBookingPage",
  async (orderId, thunkAPI) => {
    try {
      const orderResponse = await getOrderDetail(orderId, {
        signal: thunkAPI.signal,
      });
      const order = normalizeOrderDetail(getApiData(orderResponse, {}));
      const seatsResponse = await getMovieCinemaSeats(order.movieCinemaId, {
        signal: thunkAPI.signal,
      });

      return {
        order,
        seats: normalizeSeats(getApiData(seatsResponse, [])),
      };
    } catch (error) {
      ignoreCanceledRequest(error);
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to load booking data."),
      );
    }
  },
);

export const fetchPaymentPage = createAsyncThunk(
  "seatBooking/fetchPaymentPage",
  async (orderId, thunkAPI) => {
    try {
      const [orderResponse, methodsResponse] = await Promise.all([
        getOrderDetail(orderId, { signal: thunkAPI.signal }),
        getOrderPaymentMethods(orderId, { signal: thunkAPI.signal }),
      ]);

      return {
        order: normalizeOrderDetail(getApiData(orderResponse, {})),
        paymentMethods: normalizePaymentMethods(getApiData(methodsResponse, [])),
      };
    } catch (error) {
      ignoreCanceledRequest(error);
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to load payment data."),
      );
    }
  },
);

export const fetchTicketResult = createAsyncThunk(
  "seatBooking/fetchTicketResult",
  async (orderId, thunkAPI) => {
    try {
      const response = await getOrderDetail(orderId, { signal: thunkAPI.signal });

      return normalizeOrderDetail(getApiData(response, {}));
    } catch (error) {
      ignoreCanceledRequest(error);
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to load ticket data."),
      );
    }
  },
);

export const saveSelectedSeats = createAsyncThunk(
  "seatBooking/saveSelectedSeats",
  async (orderId, thunkAPI) => {
    const { selectedSeatCodes } = thunkAPI.getState().seatBooking;

    try {
      await updateOrderSeats(orderId, selectedSeatCodes, {
        signal: thunkAPI.signal,
      });
      const response = await getOrderDetail(orderId, {
        signal: thunkAPI.signal,
      });

      return normalizeOrderDetail(getApiData(response, {}));
    } catch (error) {
      ignoreCanceledRequest(error);
      if (error.response?.status === 409) {
        try {
          const { order } = thunkAPI.getState().seatBooking;
          const seatsResponse = await getMovieCinemaSeats(order?.movieCinemaId, {
            signal: thunkAPI.signal,
          });

          return thunkAPI.rejectWithValue({
            status: 409,
            message: getErrorMessage(
              error,
              "Some selected seats are no longer available.",
            ),
            seats: normalizeSeats(getApiData(seatsResponse, [])),
          });
        } catch {
          return thunkAPI.rejectWithValue({
            status: 409,
            message: getErrorMessage(
              error,
              "Some selected seats are no longer available.",
            ),
          });
        }
      }

      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: getErrorMessage(error, "Failed to save selected seats."),
      });
    }
  },
);

export const submitOrderPayment = createAsyncThunk(
  "seatBooking/submitPayment",
  async ({ orderId, formData }, thunkAPI) => {
    const { selectedPaymentMethod } = thunkAPI.getState().seatBooking;
    const normalizedPhone = String(formData.phone ?? "").replace(/^0+/, "");

    try {
      const response = await updateOrderPayment(
        orderId,
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: `+62${normalizedPhone}`,
          payment_method: selectedPaymentMethod,
        },
        { signal: thunkAPI.signal },
      );
      const rawData = getApiData(response, {});
      const orderResponse = await getOrderDetail(orderId, {
        signal: thunkAPI.signal,
      });

      return {
        order: normalizeOrderDetail(getApiData(orderResponse, rawData)),
      };
    } catch (error) {
      ignoreCanceledRequest(error);
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: getErrorMessage(error, "Failed to submit payment."),
      });
    }
  },
);

const seatBookingSlice = createSlice({
  name: "seatBooking",
  initialState: getInitialState(),
  reducers: {
    resetSeatBookingState: () => getInitialState(),
    toggleSeat: (state, action) => {
      const seatCodes = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const displaySeatCode = seatCodes.join("-");
      const seat =
        state.seatsByCode[displaySeatCode] || state.seatsByCode[seatCodes[0]];

      if (!seat || seat.isSold) return;

      const isSelected = seatCodes.every((seatCode) =>
        state.selectedSeatCodes.includes(seatCode),
      );

      if (isSelected) {
        state.selectedSeatCodes = state.selectedSeatCodes.filter(
          (currentSeatCode) => !seatCodes.includes(currentSeatCode),
        );
        return;
      }

      seatCodes.forEach((seatCode) => {
        if (!state.selectedSeatCodes.includes(seatCode)) {
          state.selectedSeatCodes.push(seatCode);
        }
      });
    },
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
      state.errorPayment = null;
    },
    closePaymentModal: (state) => {
      state.paymentModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatBookingPage.pending, (state) => {
        state.loadingOrder = true;
        state.loadingSeats = true;
        state.errorOrder = null;
        state.errorSeats = null;
        state.errorCheckout = null;
      })
      .addCase(fetchSeatBookingPage.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.loadingSeats = false;
        state.order = action.payload.order;
        state.selectedSeatCodes = action.payload.order.seats;
        applySeatPayload(state, action.payload.seats);
      })
      .addCase(fetchSeatBookingPage.rejected, (state, action) => {
        state.loadingOrder = false;
        state.loadingSeats = false;
        if (action.meta.aborted || isCanceledRequest(action.error)) return;
        state.errorOrder = action.payload || action.error.message;
      })
      .addCase(fetchPaymentPage.pending, (state) => {
        state.loadingOrder = true;
        state.loadingPaymentMethods = true;
        state.errorOrder = null;
        state.errorPaymentMethods = null;
        state.errorPayment = null;
      })
      .addCase(fetchPaymentPage.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.loadingPaymentMethods = false;
        state.order = action.payload.order;
        state.paymentMethods = action.payload.paymentMethods;
      })
      .addCase(fetchPaymentPage.rejected, (state, action) => {
        state.loadingOrder = false;
        state.loadingPaymentMethods = false;
        if (action.meta.aborted || isCanceledRequest(action.error)) return;
        state.errorOrder = action.payload || action.error.message;
      })
      .addCase(fetchTicketResult.pending, (state) => {
        state.loadingOrder = true;
        state.errorOrder = null;
      })
      .addCase(fetchTicketResult.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.order = action.payload;
      })
      .addCase(fetchTicketResult.rejected, (state, action) => {
        state.loadingOrder = false;
        if (action.meta.aborted || isCanceledRequest(action.error)) return;
        state.errorOrder = action.payload || action.error.message;
      })
      .addCase(saveSelectedSeats.pending, (state) => {
        state.savingSeats = true;
        state.errorCheckout = null;
      })
      .addCase(saveSelectedSeats.fulfilled, (state, action) => {
        state.savingSeats = false;
        state.order = action.payload;
        state.selectedSeatCodes = action.payload.seats;
      })
      .addCase(saveSelectedSeats.rejected, (state, action) => {
        state.savingSeats = false;
        if (action.meta.aborted || isCanceledRequest(action.error)) return;
        state.errorCheckout =
          action.payload?.message ||
          action.payload ||
          action.error.message ||
          "Failed to save selected seats.";

        if (action.payload?.seats) {
          applySeatPayload(state, action.payload.seats);
          const soldSeatCodes = Object.values(action.payload.seats.seatsByCode)
            .filter((seat) => seat.isSold)
            .flatMap((seat) => seat.seatCodes ?? [seat.code]);
          state.selectedSeatCodes = state.selectedSeatCodes.filter(
            (seatCode) => !soldSeatCodes.includes(seatCode),
          );
        }
      })
      .addCase(submitOrderPayment.pending, (state) => {
        state.submittingPayment = true;
        state.errorPayment = null;
      })
      .addCase(submitOrderPayment.fulfilled, (state, action) => {
        state.submittingPayment = false;
        state.order = action.payload.order;
      })
      .addCase(submitOrderPayment.rejected, (state, action) => {
        state.submittingPayment = false;
        if (action.meta.aborted || isCanceledRequest(action.error)) return;
        state.errorPayment =
          action.payload?.message ||
          action.payload ||
          action.error.message ||
          "Failed to submit payment.";
      });
  },
});

export const {
  closePaymentModal,
  resetSeatBookingState,
  setSelectedPaymentMethod,
  toggleSeat,
} = seatBookingSlice.actions;

const selectSeatBookingState = (state) => state.seatBooking;

export const selectSeatGrid = createSelector(
  [selectSeatBookingState],
  ({ rowLabels, seatCodesByRow, seatsByCode, selectedSeatCodes }) =>
    rowLabels.map((row) =>
      seatCodesByRow[row].map((seatCode) => {
        const seat = seatsByCode[seatCode];

        return {
          ...seat,
          isSelected: (seat.seatCodes ?? [seatCode]).every((code) =>
            selectedSeatCodes.includes(code),
          ),
        };
      }),
    ),
);

export const selectSelectedSeatText = createSelector(
  [selectSeatBookingState],
  ({ selectedSeatCodes }) =>
    selectedSeatCodes.length > 0
      ? [...selectedSeatCodes].sort().join(", ")
      : "-",
);

export const selectTicketPrice = createSelector(
  [selectSeatBookingState],
  ({ order }) => Number(order?.ticketPrice || 0),
);

export const selectTotalPayment = createSelector(
  [selectSeatBookingState, selectTicketPrice],
  ({ selectedSeatCodes, order }, ticketPrice) => {
    const apiTotal = Number(order?.totalPayment || 0);

    if (apiTotal > 0 && selectedSeatCodes.length === Number(order?.seatCount || 0)) {
      return apiTotal;
    }

    return selectedSeatCodes.length * ticketPrice;
  },
);

export const selectCanCheckout = createSelector(
  [selectSeatBookingState],
  ({ selectedSeatCodes, savingSeats }) =>
    selectedSeatCodes.length > 0 && !savingSeats,
);

export const selectPaymentInfoRows = createSelector(
  [selectSeatBookingState],
  ({ order }) => [
    {
      label: "DATE & TIME",
      value: `${formatDate(order?.selectedDate)} at ${formatTimeToAmPm(
        order?.selectedTime,
      )}`,
    },
    { label: "MOVIE TITLE", value: order?.movie?.title ?? "-" },
    { label: "CINEMA NAME", value: order?.cinemaName || "-" },
    { label: "NUMBER OF TICKETS", value: `${order?.seatCount ?? 0} pieces` },
  ],
);

export const selectSeatBookingView = createSelector(
  [
    selectSeatBookingState,
    selectSeatGrid,
    selectSelectedSeatText,
    selectTicketPrice,
    selectTotalPayment,
    selectCanCheckout,
  ],
  (state, seatGrid, selectedSeatText, ticketPrice, totalPayment, canCheckout) => ({
    ...state,
    seatGrid,
    selectedSeatText,
    ticketPrice,
    totalPayment,
    canCheckout,
    formattedTicketPrice: formatCurrency(ticketPrice),
    formattedTotalPayment: formatCurrency(totalPayment),
  }),
);

export const selectPaymentView = createSelector(
  [selectSeatBookingState, selectPaymentInfoRows],
  (state, paymentInfoRows) => ({
    ...state,
    paymentInfoRows,
    totalPayment: Number(state.order?.totalPayment || 0),
    formattedTotalPayment: formatCurrency(state.order?.totalPayment),
  }),
);

export const selectTicketResultView = createSelector(
  [selectSeatBookingState],
  (state) => ({
    ...state,
    title: state.order?.movie?.title ?? "-",
    date: formatDate(state.order?.selectedDate),
    time: formatTimeToAmPm(state.order?.selectedTime),
    seats: state.order?.seats ?? [],
    count: state.order?.seatCount ?? state.order?.seats?.length ?? 0,
    total: state.order?.totalPayment,
    formattedTotal: formatCurrency(state.order?.totalPayment),
    heroImage: state.order?.movie?.background || state.order?.movie?.poster || "",
    qrImage: state.order?.qrImage || "",
  }),
);

export default seatBookingSlice.reducer;
