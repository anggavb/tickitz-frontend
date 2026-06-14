import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import {
  fetchTicketResult,
  resetSeatBookingState,
  selectTicketResultView,
} from "../redux/slice/seatBookingSlice";
import { getOrderQr } from "../utils/api/seatBookingApi";

function MovieTicketResult() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qrImageUrl, setQrImageUrl] = useState("");
  const ticket = useSelector(selectTicketResultView);
  const {
    loadingOrder,
    errorOrder,
    title,
    date,
    time,
    seats,
    count,
    formattedTotal,
    heroImage,
    order,
  } = ticket;

  useEffect(() => {
    if (!orderId) return undefined;

    const controller = new AbortController();
    const promise = dispatch(fetchTicketResult(orderId));
    let objectUrl = "";

    getOrderQr(orderId, { signal: controller.signal })
      .then((response) => {
        objectUrl = URL.createObjectURL(response.data);
        setQrImageUrl(objectUrl);
      })
      .catch(() => {
        setQrImageUrl("");
      });

    return () => {
      controller.abort();
      promise.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      dispatch(resetSeatBookingState());
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    if (loadingOrder || !order?.status) return;
    if (order.status === "waiting") {
      navigate(`/orders/${orderId}/payment`, { replace: true });
      return;
    }
    if (order.status === "pending") {
      navigate(`/orders/${orderId}/booking`, { replace: true });
    }
  }, [loadingOrder, navigate, order?.status, orderId]);

  const handleDownload = () => {
    window.print();
  };

  const handleDone = () => {
    navigate("/");
  };

  if (loadingOrder) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-white px-5">
          <p className="text-sm font-medium text-neutral-500">
            Loading ticket...
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
              Failed to load ticket
            </h1>
            <p className="mt-2 text-sm text-red-500">{errorOrder}</p>
          </div>
        </section>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <main className="grid min-h-[calc(100vh-86px)] grid-cols-1 print:block lg:grid-cols-[1.15fr_0.85fr]">
        <section
          className="relative flex min-h-130 items-center bg-neutral-900 bg-cover bg-center px-6 py-14 text-white print:hidden md:px-16 lg:min-h-[calc(100vh-86px)]"
          style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
        >
          <div className="absolute inset-0 bg-black/75" />

          <div className="relative z-10 max-w-3xl">
            <h2 className="mb-10 text-5xl font-bold tracking-tight md:text-7xl">
              Tickitz
            </h2>

            <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-6xl">
              Thank you For Purchasing
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/70 md:text-2xl">
              Your ticket is ready. Download it before arriving at the cinema.
            </p>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex cursor-pointer items-center gap-5 text-base font-semibold text-white transition hover:text-primary md:text-xl"
            >
              Please Download Your Ticket
              <span className="text-2xl">→</span>
            </button>
          </div>
        </section>

        <section className="flex items-center justify-center bg-mainbg px-5 py-12 print:bg-white print:px-0 print:py-0 md:px-10">
          <div className="w-full max-w-md print:max-w-none">
            <div className="relative mx-auto rounded-xl bg-white px-8 pb-8 pt-12 shadow-sm print:w-105 print:max-w-full print:shadow-none">
              <div className="flex justify-center">
                {qrImageUrl ? (
                  <img
                    src={qrImageUrl}
                    alt="Ticket QR Code"
                    className="h-40 w-40 object-contain md:h-44 md:w-44"
                  />
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded bg-neutral-100 text-xs font-semibold text-neutral-400 md:h-44 md:w-44">
                    QR unavailable
                  </div>
                )}
              </div>

              <div className="relative my-10 border-t border-dashed border-gray-300">
                <span className="absolute -left-11 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-mainbg print:bg-white" />
                <span className="absolute -right-11 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-mainbg print:bg-white" />
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-7 text-sm">
                <div className="col-span-full">
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-400">
                    Movie
                  </p>
                  <p className="truncate font-semibold text-gray-900 md:text-2xl">
                    {title}
                  </p>
                </div>

                <TicketField label="Date" value={date} />
                <TicketField label="Time" value={time} />
                <TicketField label="Count" value={`${count} pcs`} />
                <TicketField label="Seats" value={seats.join(", ") || "-"} />
              </div>

              <div className="mt-10 flex items-center justify-between rounded border border-gray-200 px-6 py-4">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  {formattedTotal}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 print:hidden">
              <button
                type="button"
                onClick={handleDownload}
                className="flex w-full cursor-pointer items-center justify-center gap-4 rounded border border-primary py-4 text-base font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
                Download
              </button>

              <button
                type="button"
                onClick={handleDone}
                className="w-full cursor-pointer rounded bg-primary py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)] transition hover:bg-primary/80"
              >
                Done
              </button>
            </div>
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}

function TicketField({ label, value }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium tracking-wide text-gray-400">
        {label}
      </p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default MovieTicketResult;
