import { buildAssetUrl, getTimeValue } from "./movieDetailMappers";

export function getApiData(response, fallbackValue = null) {
  return response?.data?.data ?? response?.data ?? fallbackValue;
}

export function getErrorMessage(error, fallbackMessage) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallbackMessage
  );
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
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

function getRows(rawData, keys = []) {
  if (Array.isArray(rawData)) return rawData;
  if (Array.isArray(rawData?.data)) return rawData.data;

  for (const key of keys) {
    if (Array.isArray(rawData?.[key])) return rawData[key];
    if (Array.isArray(rawData?.data?.[key])) return rawData.data[key];
  }

  return [];
}

function getBooleanValue(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    return ["true", "1", "yes", "sold", "booked"].includes(
      value.trim().toLowerCase(),
    );
  }

  return false;
}

export function formatCurrency(value) {
  if (value === null || value === undefined || value === "") return "-";

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) return String(value);

  return `Rp ${numericValue.toLocaleString("id-ID")}`;
}

export function formatTimeToAmPm(time) {
  if (!time) return "-";

  const timeValue = getTimeValue(time);
  const [hourValue, minute = "00"] = timeValue.split(":");
  const hour = Number(hourValue);

  if (Number.isNaN(hour)) return String(time);

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${period}`;
}

export function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return String(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function normalizeOrderDetail(rawOrder = {}) {
  const order = rawOrder?.order ?? rawOrder;
  const movie = order?.movie ?? rawOrder?.movie ?? {};
  const cinema =
    order?.cinema ?? order?.selectedCinema ?? order?.movie_cinema?.cinema ?? {};
  const movieCinema = order?.movie_cinema ?? order?.movieCinema ?? {};
  const payment = order?.payment ?? rawOrder?.payment ?? {};
  const ticket = order?.ticket ?? rawOrder?.ticket ?? {};
  const rawGenres =
    movie?.genres ??
    movie?.genres_categories ??
    movie?.categories ??
    order?.movie_genres ??
    [];
  const posterPath =
    movie?.poster ??
    movie?.image_poster ??
    movie?.image ??
    order?.movie_poster ??
    "";
  const backgroundPath =
    movie?.background ??
    movie?.background_image ??
    movie?.image_background ??
    movie?.image_poster ??
    order?.movie_background ??
    posterPath;
  const seats = toArray(
    order?.seats ??
      order?.selected_seats ??
      order?.selectedSeats ??
      ticket?.seats,
  );

  return {
    id: String(order?.id ?? rawOrder?.id ?? ""),
    status: order?.status ?? order?.order_status ?? "",
    movie: {
      title: movie?.title ?? movie?.name ?? order?.movie_name ?? "-",
      poster: buildAssetUrl(posterPath),
      background: buildAssetUrl(backgroundPath),
      genres: (Array.isArray(rawGenres) ? rawGenres : [rawGenres])
        .map(normalizeGenre)
        .filter(Boolean),
    },
    selectedDate:
      order?.show_date ??
      order?.showDate ??
      movieCinema?.show_date ??
      movieCinema?.showDate ??
      "",
    selectedTime:
      order?.show_time ??
      order?.showtime ??
      movieCinema?.show_time ??
      movieCinema?.showtime ??
      "",
    selectedLocation:
      order?.location ?? cinema?.location ?? cinema?.city ?? "",
    cinemaName:
      order?.cinema_name ??
      cinema?.name ??
      cinema?.cinema_name ??
      movieCinema?.cinema_name ??
      "",
    movieCinemaId:
      order?.movie_cinema_id ?? order?.movieCinemaId ?? movieCinema?.id ?? "",
    ticketPrice:
      order?.ticket_price ??
      order?.price ??
      movieCinema?.price ??
      order?.movie_price ??
      "",
    seats,
    seatCount: order?.seat_count ?? order?.seatCount ?? seats.length,
    totalPayment:
      order?.total_payment ??
      order?.totalPayment ??
      payment?.total_payment ??
      payment?.totalPayment ??
      "",
    paymentReference:
      order?.payment_reference ??
      payment?.payment_reference ??
      payment?.virtual_account ??
      payment?.virtualAccount ??
      "",
    expiredAt:
      order?.expired_at ??
      payment?.expired_at ??
      payment?.due_date ??
      payment?.dueDate ??
      "",
    qrImage: buildAssetUrl(
      ticket?.qr_image ??
        ticket?.qrImage ??
        order?.qr_image ??
        order?.qrImage ??
        "",
    ),
    paymentStatus: order?.payment_status ?? payment?.status ?? "",
    ticketStatus: order?.ticket_status ?? ticket?.status ?? "",
  };
}

function normalizeSeatCode(rawSeat) {
  return String(
    rawSeat?.code ??
      rawSeat?.seat_code ??
      rawSeat?.seatCode ??
      rawSeat?.name ??
      rawSeat?.label ??
      "",
  ).trim();
}

function normalizeSeatRow(rawSeat, code) {
  return String(rawSeat?.row ?? rawSeat?.seat_row ?? code.match(/^[A-Za-z]+/)?.[0] ?? "");
}

function normalizeSeatNumber(rawSeat, code) {
  const rawNumber =
    rawSeat?.number ??
    rawSeat?.seat_number ??
    rawSeat?.seatNumber ??
    code.match(/\d+/)?.[0] ??
    "";

  return Number(rawNumber);
}

export function normalizeSeats(rawSeats = []) {
  const rows = getRows(rawSeats, ["seats", "layout", "seat_layout", "seatLayout"]);
  const flatSeats = rows.flatMap((row) => {
    const nestedSeats = row?.seats ?? row?.items;

    if (!Array.isArray(nestedSeats)) return row;

    return nestedSeats.map((seat) => ({
      ...seat,
      row: seat?.row ?? row?.row ?? row?.label ?? row?.name,
    }));
  });
  const normalizedSeats = flatSeats
    .map((rawSeat) => {
      const code = normalizeSeatCode(rawSeat);

      if (!code) return null;

      const row = normalizeSeatRow(rawSeat, code);
      const number = normalizeSeatNumber(rawSeat, code);
      const status = String(
        rawSeat?.status ?? rawSeat?.seat_status ?? "",
      ).toLowerCase();
      const type = String(rawSeat?.type ?? rawSeat?.seat_type ?? "").toLowerCase();
      const explicitSold =
        rawSeat?.isSold ??
        rawSeat?.is_sold ??
        rawSeat?.sold ??
        rawSeat?.is_booked ??
        rawSeat?.booked;
      const explicitLoveNest =
        rawSeat?.isLoveNest ?? rawSeat?.is_love_nest ?? rawSeat?.love_nest;
      const isSold = Boolean(
        getBooleanValue(explicitSold) ||
          status === "sold" ||
          status === "booked" ||
          status === "unavailable",
      );
      const isLoveNest = Boolean(
        getBooleanValue(explicitLoveNest) ||
          type === "love_nest" ||
          type === "lovenest",
      );

      return {
        code,
        row,
        number: Number.isNaN(number) ? 0 : number,
        label: rawSeat?.display_label ?? rawSeat?.displayLabel ?? code,
        isSold,
        isLoveNest,
        isMerged: Boolean(rawSeat?.isMerged ?? rawSeat?.is_merged),
        colSpan: 1,
        seatCodes: [code],
      };
    })
    .filter(Boolean);

  const seatsByRow = normalizedSeats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});
  const seatsByCode = {};
  const seatCodesByRow = {};

  Object.keys(seatsByRow).forEach((row) => {
    const rowSeats = seatsByRow[row].sort(
      (a, b) => a.number - b.number || a.code.localeCompare(b.code),
    );
    const displaySeats = [];

    for (let index = 0; index < rowSeats.length; index += 1) {
      const seat = rowSeats[index];
      const nextSeat = rowSeats[index + 1];

      if (
        seat.isLoveNest &&
        nextSeat?.isLoveNest &&
        nextSeat.number === seat.number + 1
      ) {
        const mergedCode = `${seat.code}-${nextSeat.code}`;

        displaySeats.push({
          ...seat,
          code: mergedCode,
          label: mergedCode,
          isSold: seat.isSold || nextSeat.isSold,
          isMerged: true,
          colSpan: 2,
          seatCodes: [seat.code, nextSeat.code],
        });
        index += 1;
        continue;
      }

      displaySeats.push(seat);
    }

    seatCodesByRow[row] = [];
    displaySeats.forEach((seat) => {
      seatsByCode[seat.code] = seat;
      seatCodesByRow[row].push(seat.code);
    });
  });

  return {
    seatsByCode,
    seatCodesByRow,
    rowLabels: Object.keys(seatCodesByRow).sort(),
  };
}

export function normalizePaymentMethods(rawMethods = []) {
  return getRows(rawMethods, ["payment_methods", "paymentMethods", "methods"])
    .map((method) => {
      const id = String(method?.id ?? method?.code ?? method?.value ?? "").trim();
      const label = String(method?.label ?? method?.name ?? method?.title ?? id).trim();
      const logoUrl = buildAssetUrl(
        method?.logoUrl ?? method?.logo_url ?? method?.logo ?? method?.image ?? "",
      );

      if (!id) return null;

      return { id, label, logoUrl };
    })
    .filter(Boolean);
}
