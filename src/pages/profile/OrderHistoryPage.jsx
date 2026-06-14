import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getOrderHistory } from "../../redux/slice/orderSlice";
import { getOrderQr } from "../../utils/api/seatBookingApi";
import { FourSquare } from "react-loading-indicators";
import env from "@/utils/env";

function OrderHistoryPage() {
  const dispatch = useDispatch();

  const { dataHistory, loadingHistory } = useSelector((state) => state.order);
  console.log(dataHistory?.data?.data);
  const [copiedId, setCopiedId] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [qrImages, setQrImages] = useState({});

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  const orders = dataHistory?.data || [];

  const toggleDetail = async (id) => {
    const isOpening = openId !== id;

    setOpenId(isOpening ? id : null);

    if (isOpening) {
      await loadQr(id);
    }
  };
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };
  useEffect(() => {
    return () => {
      Object.values(qrImages).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [qrImages]);

  if (loadingHistory) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <FourSquare color={["#bb2d00", "#ee3900", "#ff5722", "#ff7e55"]} />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <p className="text-gray-500">No order history found</p>
      </div>
    );
  }

  const loadQr = async (orderId) => {
    try {
      if (qrImages[orderId]) return;

      const response = await getOrderQr(orderId);

      const imageUrl = URL.createObjectURL(response.data);

      setQrImages((prev) => ({
        ...prev,
        [orderId]: imageUrl,
      }));
    } catch (error) {
      console.error("Failed to load QR", error);
    }
  };

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${datePart} - ${timePart}`;
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl shadow-sm">
          {/* HEADER */}
          <div className="flex justify-between items-start p-4 sm:p-5 border-b border-gray-300">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                {formatDateTime(order.order_date)}
              </p>

              <h2 className="text-sm sm:text-lg font-semibold">
                {order.movie_name}
              </h2>
            </div>

            {/* <p className="font-bold text-xs sm:text-sm text-gray-700">
              {order.cinema_name}
            </p> */}
            <img
              src={env.baseAPI + order.cinema_logo}
              alt={order.cinema_name}
            />
          </div>

          {/* STATUS */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-stretch sm:items-center p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <span
                className={`w-full sm:w-auto text-center px-3 py-1 sm:px-5 sm:py-2 rounded-md text-[10px] sm:text-sm ${
                  order.payment_status === "paid"
                    ? "bg-primary/20 text-primary"
                    : "bg-red-200 text-red-500"
                }`}
              >
                {order.payment_status === "paid" ? "Paid" : "Not Paid"}
              </span>
            </div>

            <button
              onClick={() => toggleDetail(order.id)}
              className="w-full sm:w-auto flex justify-center items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-orange-500 mt-1 sm:mt-0"
            >
              Show Details
              {openId === order.id ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>

          {/* DETAIL */}
          {openId === order.id && (
            <div className="px-4 sm:px-5 pb-4 sm:pb-5">
              {/* UNPAID */}
              {order.payment_status !== "paid" && (
                <div className="pt-4 sm:pt-5">
                  <h3 className="text-sm font-semibold mb-4">
                    Ticket Information
                  </h3>

                  {/* CARD */}
                  <div className="space-y-4">
                    {/* VA ROW */}
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-xs sm:text-sm">
                        No. Rekening Virtual :
                      </p>

                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-xs sm:text-sm text-gray-800">
                          {order.payment_reference}
                        </p>

                        <button
                          onClick={() =>
                            handleCopy(order.payment_reference, order.id)
                          }
                          className={`px-3 py-1 rounded border text-xs transition ${
                            copiedId === order.id
                              ? "bg-gray-200 text-gray-500 border-gray-300"
                              : "border-primary text-primary hover:bg-primary hover:text-white"
                          }`}
                        >
                          {copiedId === order.id ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    {/* TOTAL ROW */}
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Total Payment :
                      </p>

                      <p className="text-primary font-bold text-sm sm:text-base">
                        Rp. {order.total_payment?.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* DEADLINE INFO */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Pay this payment bill before it is due, on{" "}
                      <span className="text-red-500 font-medium">
                        {formatDateTime(order.expired_at)}
                      </span>
                      . If the bill has not been paid by the specified time, it
                      will be forfeited
                    </p>

                    {/* BUTTON */}
                    <Link to={`/orders/${order.id}/payment`}>
                      <button className="bg-primary text-white px-5 py-2 rounded text-sm hover:bg-orange-500 transition">
                        Cek Pembayaran
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* PAID */}
              {order.payment_status === "paid" && (
                <div className="pt-4 sm:pt-5">
                  <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                    Ticket Information
                  </h3>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28">
                      {qrImages[order.id] ? (
                        <img
                          src={qrImages[order.id]}
                          alt="QR Code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          Loading...
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                        <div>
                          <p className="text-gray-400">Time</p>
                          <p>{order.show_time}</p>
                        </div>

                        <div>
                          <p className="text-gray-400">Seats</p>
                          <p>{order.seats || "-"}</p>
                        </div>

                        <div>
                          <p className="text-gray-400">Total</p>
                          <p className="font-semibold">
                            Rp. {order.total_payment?.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="text-gray-400">Movie</p>
                          <p>{order.movie_name}</p>
                        </div>

                        <div>
                          <p className="text-gray-400">Date</p>
                          <p>
                            {new Date(order.show_date).toLocaleDateString(
                              "id-ID",
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400">Count</p>
                          <p>{order.seat_count} pcs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderHistoryPage;
