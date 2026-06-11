import React from "react";
import { useNavigate } from "react-router";
import HomeLayout from "../layouts/HomeLayout";

function MovieTicketResult() {
  const navigate = useNavigate();

  const ticketData = {
    movie: {
      title: "Echoes of Jakarta",
      image_poster:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
    },
    selectedDate: "07 Jul",
    selectedTime: "2:00 PM",
    selectedSeats: ["C4", "C5", "C6"],
    count: 3,
    totalPayment: 75000,
  };

  const movie = ticketData.movie;

  const title = movie.title || movie.name;
  const date = ticketData.selectedDate;
  const time = ticketData.selectedTime;
  const seats = ticketData.selectedSeats;
  const count = ticketData.count;
  const total = ticketData.totalPayment;

  const qrImage = "/qr-ticket.jpeg";

  const heroImage =
    movie.background_image ||
    movie.image_background ||
    movie.image_poster ||
    movie.image;

  const formatCurrency = (value) => {
    if (typeof value === "number") {
      return `Rp ${value.toLocaleString("id-ID")}`;
    }

    return value;
  };

  const handleDownload = () => {
    window.print();
  };

  const handleDone = () => {
    navigate("/");
  };

  return (
    <HomeLayout>
      <main className="grid min-h-[calc(100vh-86px)] grid-cols-1 print:block lg:grid-cols-[1.15fr_0.85fr]">
        <section
          className="relative flex min-h-130 items-center bg-cover bg-center px-6 py-14 text-white print:hidden md:px-16 lg:min-h-[calc(100vh-86px)]"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/75" />

          <div className="relative z-10 max-w-3xl">
            <h2 className="mb-10 text-5xl font-bold tracking-tight md:text-7xl">
              Tickitz
            </h2>

            <h1 className="mb-6 text-4xl font-semibold leading-tight md:text-6xl">
              Thankyou For Purchasing
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/70 md:text-2xl">
              Lorem ipsum dolor sit amet consectetur. Quam pretium pretium
              tempor integer sed magna et.
            </p>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-5 text-base font-semibold text-white transition hover:text-primary md:text-xl"
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
                <img
                  src={qrImage}
                  alt="Ticket QR Code"
                  className="h-40 w-40 object-contain md:h-44 md:w-44"
                />
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

                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-400">
                    Date
                  </p>
                  <p className="font-semibold text-gray-900">{date}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-400">
                    Time
                  </p>
                  <p className="font-semibold text-gray-900">{time}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-400">
                    Count
                  </p>
                  <p className="font-semibold text-gray-900">{count} pcs</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-400">
                    Seats
                  </p>
                  <p className="font-semibold text-gray-900">
                    {seats.join(", ")}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between rounded border border-gray-200 px-6 py-4">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 print:hidden">
              <button
                type="button"
                onClick={handleDownload}
                className="flex w-full items-center justify-center gap-4 rounded border border-primary py-4 text-base font-bold text-primary transition hover:bg-primary hover:text-white"
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
                className="w-full rounded bg-primary py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)] transition hover:bg-blue-700"
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

export default MovieTicketResult;
