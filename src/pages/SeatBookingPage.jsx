import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import StepProgres from "../components/auth/signup/StepProgres";
import HomeLayout from "../layouts/HomeLayout";
import {
  fetchSeatBookingPage,
  resetSeatBookingState,
  saveSelectedSeats,
  selectSeatBookingView,
  toggleSeat,
} from "../redux/slice/seatBookingSlice";
import {
  formatDate,
  formatTimeToAmPm,
} from "../utils/api/seatBookingMappers";

const steps = ["Dates And Time", "Seat", "Payment"];
const seatNumbers = Array.from({ length: 14 }, (_, index) => index + 1);

function SeatBookingPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booking = useSelector(selectSeatBookingView);
  const {
    order,
    seatGrid,
    selectedSeatCodes,
    selectedSeatText,
    formattedTicketPrice,
    formattedTotalPayment,
    loadingOrder,
    loadingSeats,
    savingSeats,
    errorOrder,
    errorCheckout,
    canCheckout,
  } = booking;

  useEffect(() => {
    if (!orderId) return undefined;

    const promise = dispatch(fetchSeatBookingPage(orderId));

    return () => {
      promise.abort();
      dispatch(resetSeatBookingState());
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    if (loadingOrder || loadingSeats || !order?.status) return;
    if (order.status === "waiting") navigate(`/orders/${orderId}/payment`, { replace: true });
    if (order.status === "paid") navigate(`/orders/${orderId}/result`, { replace: true });
  }, [loadingOrder, loadingSeats, navigate, order?.status, orderId]);

  const handleChangeMovie = () => {
    navigate("/movies");
  };

  const handleCheckout = async () => {
    if (!canCheckout) return;

    try {
      await dispatch(saveSelectedSeats(orderId)).unwrap();
      navigate(`/orders/${orderId}/payment`);
    } catch {
      // The slice stores checkout errors and refreshes seat availability on 409.
    }
  };

  if (loadingOrder || loadingSeats) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-white px-5">
          <p className="text-sm font-medium text-neutral-500">
            Loading seat booking...
          </p>
        </section>
      </HomeLayout>
    );
  }

  if (errorOrder) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-white px-5">
          <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-5 text-center">
            <h1 className="text-base font-semibold text-red-600">
              Failed to load booking
            </h1>
            <p className="mt-2 text-sm text-red-500">{errorOrder}</p>
          </div>
        </section>
      </HomeLayout>
    );
  }

  const genres = order?.movie?.genres ?? [];
  const moviePoster = order?.movie?.poster;
  const hasSeats = seatGrid.length > 0;

  return (
    <HomeLayout>
      <section className="mx-auto mb-8 flex max-w-4xl items-center justify-center gap-20 text-center">
        <StepProgres step={2} steps={steps} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_380px]">
        <section className="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 lg:px-8">
          <div className="rounded border border-neutral-200 p-4">
            <div className="grid gap-4 sm:grid-cols-[210px_1fr_auto] sm:items-center">
              {moviePoster ? (
                <img
                  src={moviePoster}
                  alt={order?.movie?.title ?? "Movie poster"}
                  className="h-28 w-full rounded object-cover sm:w-52"
                />
              ) : (
                <div className="flex h-28 w-full items-center justify-center rounded bg-neutral-100 text-xs font-semibold text-neutral-400 sm:w-52">
                  No Poster
                </div>
              )}

              <div>
                <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                  {order?.movie?.title ?? "-"}
                </h1>

                {genres.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-400"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-sm text-neutral-700 sm:text-base">
                  Regular - {formatTimeToAmPm(order?.selectedTime)}
                </p>
              </div>

              <button
                type="button"
                onClick={handleChangeMovie}
                className="h-10 rounded bg-primary px-7 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Change
              </button>
            </div>
          </div>

          <h2 className="mt-10 text-2xl font-bold text-neutral-900">
            Choose Your Seat
          </h2>

          {errorCheckout && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
              {errorCheckout}
            </p>
          )}

          {hasSeats ? (
            <div className="mt-10 overflow-x-auto pb-4">
              <div className="mx-auto flex min-w-[760px] flex-col items-center justify-center">
                <p className="text-center text-sm font-medium text-neutral-500">
                  Screen
                </p>

                <div className="mt-4 h-1.5 w-[620px] rounded-full bg-neutral-100 shadow-inner" />

                <div className="mt-10 grid gap-3">
                  {seatGrid.map((rowSeats) => (
                    <div
                      key={rowSeats[0]?.row}
                      className="grid grid-cols-[24px_repeat(7,28px)_32px_repeat(7,28px)] items-center gap-2"
                    >
                      <span className="text-center text-sm font-bold text-neutral-400">
                        {rowSeats[0]?.row}
                      </span>

                      {rowSeats
                        .filter((seat) => seat.number <= 7)
                        .map((seat) => (
                        <SeatButton
                          key={seat.code}
                          code={seat.code}
                          label={seat.label}
                          isSold={seat.isSold}
                          isLoveNest={seat.isLoveNest}
                          isSelected={seat.isSelected}
                          isMerged={seat.isMerged}
                          colSpan={seat.colSpan}
                          onClick={() =>
                            dispatch(toggleSeat(seat.seatCodes ?? [seat.code]))
                          }
                        />
                      ))}

                      <span />

                      {rowSeats
                        .filter((seat) => seat.number > 7)
                        .map((seat) => (
                        <SeatButton
                          key={seat.code}
                          code={seat.code}
                          label={seat.label}
                          isSold={seat.isSold}
                          isLoveNest={seat.isLoveNest}
                          isSelected={seat.isSelected}
                          isMerged={seat.isMerged}
                          colSpan={seat.colSpan}
                          onClick={() =>
                            dispatch(toggleSeat(seat.seatCodes ?? [seat.code]))
                          }
                        />
                      ))}
                    </div>
                  ))}

                  <div className="mt-8 grid grid-cols-[24px_repeat(7,28px)_32px_repeat(7,28px)] items-center gap-2">
                    <span />

                    {seatNumbers.slice(0, 7).map((number) => (
                      <span
                        key={number}
                        className="text-center text-xs font-semibold text-neutral-500"
                      >
                        {number}
                      </span>
                    ))}

                    <span />

                    {seatNumbers.slice(7).map((number) => (
                      <span
                        key={number}
                        className="text-center text-xs font-semibold text-neutral-500"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-8 text-center">
              <p className="text-sm font-semibold text-neutral-700">
                No seat layout available.
              </p>
            </div>
          )}

          <section className="mt-10">
            <h3 className="text-xl font-semibold text-neutral-900">
              Seating key
            </h3>

            <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-neutral-600">
              <SeatLegend label="Available" className="bg-neutral-200" />
              <SeatLegend label="Selected" className="bg-primary" />
              <SeatLegend label="Love nest" className="bg-pink-400" />
              <SeatLegend label="Sold" className="bg-[#737798]" />
            </div>
          </section>
        </section>

        <aside className="space-y-5">
          <section className="rounded-lg bg-white shadow-sm">
            <div className="px-6 py-8 text-center">
              <p className="text-2xl font-black italic text-primary">
                CineOne21
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
                {order?.cinemaName || "-"}
              </h2>
            </div>

            <div className="space-y-5 px-6 pb-8">
              <SummaryRow label="Movie selected" value={order?.movie?.title ?? "-"} />
              <SummaryRow
                label={formatDate(order?.selectedDate)}
                value={formatTimeToAmPm(order?.selectedTime)}
              />
              <SummaryRow label="One ticket price" value={formattedTicketPrice} />
              <SummaryRow label="Seat choosed" value={selectedSeatText} />
            </div>

            <div className="border-t border-neutral-100 px-6 py-7">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-neutral-900">
                  Total Payment
                </p>
                <p className="text-2xl font-bold text-primary">
                  {formattedTotalPayment}
                </p>
              </div>
            </div>
          </section>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={!canCheckout || selectedSeatCodes.length === 0}
            className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingSeats ? "Saving seats..." : "Checkout now"}
          </button>
        </aside>
      </section>
    </HomeLayout>
  );
}

const SeatButton = memo(function SeatButton({
  code,
  label,
  isSold,
  isLoveNest,
  isSelected,
  isMerged,
  colSpan,
  onClick,
}) {
  let seatClass = "bg-neutral-200 hover:bg-primary/30";
  const gridColumn = isMerged ? `span ${Math.max(colSpan, 2)}` : undefined;
  const width = isMerged ? 28 * Math.max(colSpan, 2) + 8 * (colSpan - 1) : 28;

  if (isSold) {
    seatClass = "cursor-not-allowed bg-[#737798]";
  } else if (isSelected) {
    seatClass = "bg-primary text-white";
  } else if (isLoveNest) {
    seatClass = "bg-pink-400 hover:bg-pink-500";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isSold}
      aria-label={`Seat ${label || code}`}
      title={label || code}
      style={{ width, gridColumn }}
      className={`h-7 rounded transition-all ${seatClass}`}
    />
  );
});

function SeatLegend({ label, className }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-7 w-7 rounded ${className}`} />
      <span>{label}</span>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-5 text-sm">
      <p className="text-left font-medium text-neutral-500">{label}</p>
      <p className="text-right font-semibold text-neutral-900">{value}</p>
    </div>
  );
}

export default SeatBookingPage;
