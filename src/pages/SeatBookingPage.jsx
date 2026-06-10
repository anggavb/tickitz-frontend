import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import HomeLayout from "../layouts/HomeLayout";

const API_BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const fallbackMovie = {
  title: "Untitled Movie",
  poster:
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80",
  genres: [],
};

const seatRows = ["A", "B", "C", "D", "E", "F", "G"];
const seatNumbers = Array.from({ length: 14 }, (_, index) => index + 1);

const soldSeats = [
  "A6",
  "A12",
  "B2",
  "B3",
  "C9",
  "C12",
  "D2",
  "D9",
  "D12",
  "E5",
  "F13",
  "G3",
];

const loveNestPairs = [{ first: "F10", second: "F11", label: "F10-F11" }];

const allLoveNestSeats = loveNestPairs.flatMap((pair) => [
  pair.first,
  pair.second,
]);

function buildAssetUrl(path) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeMovie(rawMovie) {
  const posterPath =
    rawMovie?.poster ?? rawMovie?.image_poster ?? rawMovie?.image ?? "";

  return {
    title: rawMovie?.title ?? rawMovie?.name ?? fallbackMovie.title,
    poster: buildAssetUrl(posterPath) || fallbackMovie.poster,
    genres:
      rawMovie?.genres ??
      rawMovie?.genres_categories ??
      rawMovie?.categories ??
      [],
  };
}

function formatTimeToAmPm(time) {
  if (!time) return "-";

  const [hourValue, minute = "00"] = String(time).split(":");
  const hour = Number(hourValue);

  if (Number.isNaN(hour)) return time;

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${period}`;
}

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat(window.navigator.languages?.[0] ?? "en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "Rp0";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

function SeatBookingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedDate = state?.selectedDate ?? "";
  const selectedTime = state?.selectedTime ?? "";
  const selectedLocation = state?.selectedLocation ?? "";
  const selectedCinema = state?.selectedCinema ?? null;

  const [movie, setMovie] = useState(() =>
    state?.movie ? normalizeMovie(state.movie) : fallbackMovie,
  );

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(!state?.movie);
  const [error, setError] = useState("");

  const ticketPrice = Number(
    state?.price ??
      selectedCinema?.price ??
      selectedCinema?.ticket_price ??
      selectedCinema?.movie_price ??
      0,
  );

  const totalPayment = selectedSeats.length * ticketPrice;

  const genres = Array.isArray(movie.genres) ? movie.genres : [];

  const cinemaName =
    selectedCinema?.name ??
    selectedCinema?.cinema_name ??
    selectedLocation ??
    "Cinema";

  const selectedSeatText =
    selectedSeats.length > 0 ? [...selectedSeats].sort().join(", ") : "-";

  const moviePoster = movie.poster || fallbackMovie.poster;

  const seatMap = useMemo(() => {
    return seatRows.map((row) => {
      const rowSeats = [];
      let skipNext = false;

      for (let i = 0; i < seatNumbers.length; i++) {
        if (skipNext) {
          skipNext = false;
          continue;
        }

        const seatCode = `${row}${seatNumbers[i]}`;

        const loveNestMatch = loveNestPairs.find(
          (pair) => pair.first === seatCode,
        );

        if (loveNestMatch) {
          rowSeats.push({
            row,
            number: seatNumbers[i],
            code: loveNestMatch.label,
            isSold: false,
            isLoveNest: true,
            isSelected: false,
            isMerged: true,
          });

          skipNext = true;
        } else {
          rowSeats.push({
            row,
            number: seatNumbers[i],
            code: seatCode,
            isSold: soldSeats.includes(seatCode),
            isLoveNest: allLoveNestSeats.includes(seatCode),
            isSelected: selectedSeats.includes(seatCode),
            isMerged: false,
          });
        }
      }

      return rowSeats;
    });
  }, [selectedSeats]);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/movies/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch movie detail");
        }

        const result = await response.json();
        const rawMovie = result?.data ?? result;

        setMovie(normalizeMovie(rawMovie));
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchMovieDetail();
    }
  }, [slug]);

  const handleSeatClick = (seat) => {
    if (seat.isSold || seat.isLoveNest) return;

    setSelectedSeats((currentSeats) => {
      if (currentSeats.includes(seat.code)) {
        return currentSeats.filter((seatCode) => seatCode !== seat.code);
      }

      return [...currentSeats, seat.code];
    });
  };

  const handleChangeMovie = () => {
    navigate(`/movies/${slug}`);
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;

    const bookingPayload = {
      movieSlug: slug,
      movieTitle: movie.title,
      cinemaName,
      location: selectedLocation,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
      ticketPrice,
      totalPayment,
    };

    console.log("Booking payload:", bookingPayload);

    setSelectedSeats([]);
  };

  if (loading) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-[#A7ADC5] px-5">
          <p className="text-sm font-medium text-neutral-700">
            Loading booking page...
          </p>
        </section>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-[#A7ADC5] px-5">
          <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-5 text-center">
            <h1 className="text-base font-semibold text-red-600">
              Failed to load movie
            </h1>

            <p className="mt-2 text-sm text-red-500">{error}</p>

            <button
              type="button"
              onClick={handleChangeMovie}
              className="mt-5 h-10 rounded bg-primary px-7 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Back to movie detail
            </button>
          </div>
        </section>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <main className="min-h-screen bg-[#A7ADC5] px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mx-auto mb-8 flex max-w-4xl items-center justify-center gap-20 text-center">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
              ✓
            </div>

            <p className="mt-3 text-sm font-semibold text-neutral-700">
              Dates And Time
            </p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-base font-bold text-white">
              2
            </div>

            <p className="mt-3 text-sm font-semibold text-neutral-700">Seat</p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white/80">
              3
            </div>

            <p className="mt-3 text-sm font-semibold text-transparent">
              Payment
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_380px]">
          <section className="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6 lg:px-8">
            <div className="rounded border border-neutral-200 p-4">
              <div className="grid gap-4 sm:grid-cols-[210px_1fr_auto] sm:items-center">
                <img
                  src={moviePoster}
                  alt={movie.title}
                  className="h-28 w-full rounded object-cover sm:w-52"
                />

                <div>
                  <h1 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                    {movie.title}
                  </h1>

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

                  <p className="mt-4 text-sm text-neutral-700 sm:text-base">
                    Regular - {formatTimeToAmPm(selectedTime)}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-primary">
                    {formatPrice(ticketPrice)} / ticket
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

            <div className="mt-10 overflow-x-auto pb-4">
              <div className="mx-auto flex min-w-160 flex-col items-center justify-center">
                <p className="text-center text-sm font-medium text-neutral-500">
                  Screen
                </p>

                <div className="mt-4 h-1.5 w-115 rounded-full bg-neutral-300 shadow-inner" />

                <div className="mt-10 grid gap-3">
                  {seatMap.map((rowSeats, rowIndex) => {
                    const leftHalf = rowSeats.filter(
                      (seat) => seat.number <= 7,
                    );
                    const rightHalf = rowSeats.filter(
                      (seat) => seat.number > 7,
                    );

                    return (
                      <div
                        key={seatRows[rowIndex]}
                        className="grid grid-cols-[24px_repeat(7,28px)_32px_repeat(7,28px)] items-center gap-2"
                      >
                        <span className="text-center text-sm font-bold text-neutral-400">
                          {seatRows[rowIndex]}
                        </span>

                        {leftHalf.map((seat) => (
                          <SeatButton
                            key={seat.code}
                            seat={seat}
                            onClick={() => handleSeatClick(seat)}
                          />
                        ))}

                        <span />

                        {rightHalf.map((seat) => (
                          <SeatButton
                            key={seat.code}
                            seat={seat}
                            onClick={() => handleSeatClick(seat)}
                          />
                        ))}
                      </div>
                    );
                  })}

                  <div className="mt-2 grid grid-cols-[24px_repeat(7,28px)_32px_repeat(7,28px)] items-center gap-2">
                    <span />

                    {seatNumbers.slice(0, 7).map((number) => (
                      <span
                        key={number}
                        className="text-center text-xs font-semibold text-neutral-400"
                      >
                        {number}
                      </span>
                    ))}

                    <span />

                    {seatNumbers.slice(7).map((number) => (
                      <span
                        key={number}
                        className="text-center text-xs font-semibold text-neutral-400"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
                  {cinemaName}
                </h2>
              </div>

              <div className="space-y-5 px-6 pb-8">
                <SummaryRow label="Movie selected" value={movie.title} />

                <SummaryRow
                  label={formatDate(selectedDate)}
                  value={formatTimeToAmPm(selectedTime)}
                />

                <SummaryRow
                  label="One ticket price"
                  value={formatPrice(ticketPrice)}
                />

                <SummaryRow label="Seat choosed" value={selectedSeatText} />
              </div>

              <div className="border-t border-neutral-100 px-6 py-7">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-neutral-900">
                    Total Payment
                  </p>

                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(totalPayment)}
                  </p>
                </div>
              </div>
            </section>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={selectedSeats.length === 0}
              className="h-16 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Checkout now
            </button>
          </aside>
        </section>
      </main>
    </HomeLayout>
  );
}

function SeatButton({ seat, onClick }) {
  let seatClass = "bg-neutral-200 hover:bg-primary/30";
  let spanClass = "h-7 w-7";

  if (seat.isMerged) {
    spanClass = "h-7 w-[64px] col-span-2 rounded-md";
  }

  if (seat.isSold) {
    seatClass = "cursor-not-allowed bg-[#737798]";
  } else if (seat.isSelected) {
    seatClass = "bg-primary text-white";
  } else if (seat.isLoveNest) {
    seatClass = "cursor-not-allowed bg-pink-400";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={seat.isSold || seat.isLoveNest}
      aria-label={`Seat ${seat.code}`}
      className={`rounded transition-all ${spanClass} ${seatClass}`}
    />
  );
}

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
