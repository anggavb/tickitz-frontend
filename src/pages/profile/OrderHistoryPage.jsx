import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
function OrderHistoryPage() {
  // const { orderHistory } = useSelector((state) => state.auth);
  const [copiedId, setCopiedId] = useState(null);

  const [openId, setOpenId] = useState(null);

  const fallbackOrders = [
    {
      id: 1,
      movieTitle: 'Spider-Man: Homecoming',
      cinema: 'CineOne21',
      date: 'Tuesday, 07 July 2020',
      time: '04:30pm',
      ticketStatus: 'active',
      paymentStatus: 'unpaid',
      total: 30,
      vaNumber: '12321328913829724',
      deadline: 'June 23, 2023',
      tickets: [],
    },
    {
      id: 2,
      movieTitle: 'Avengers: End Game',
      cinema: 'ebv.id',
      date: 'Monday, 14 June 2020',
      time: '02:00pm',
      ticketStatus: 'used',
      paymentStatus: 'paid',
      total: 30,
      tickets: [
        { id: 1, seat: 'C4', category: 'PG-13' },
        { id: 2, seat: 'C5', category: 'PG-13' },
        { id: 3, seat: 'C6', category: 'PG-13' },
      ],
    },
  ];

  const orders = fallbackOrders;

  const toggleDetail = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl shadow-sm">
          {/* HEADER */}
          <div className="flex justify-between items-start p-4 sm:p-5 border-b border-gray-300">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                {order.date} - {order.time}
              </p>
              <h2 className="text-sm sm:text-lg font-semibold">{order.movieTitle}</h2>
            </div>

            <p className="font-bold text-xs sm:text-sm text-gray-700">{order.cinema}</p>
          </div>

          {/* STATUS */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-stretch sm:items-center p-4 sm:p-5">
            {/* STATUS BADGES */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <span
                className={`w-full sm:w-auto text-center px-3 py-1 sm:px-5 sm:py-2 rounded-md text-[10px] sm:text-sm ${
                  order.ticketStatus === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {order.ticketStatus === 'active' ? 'Ticket active' : 'Ticket used'}
              </span>

              <span
                className={`w-full sm:w-auto text-center px-3 py-1 sm:px-5 sm:py-2 rounded-md text-[10px] sm:text-sm ${
                  order.paymentStatus === 'paid' ? 'bg-primary/20 text-primary' : 'bg-red-200 text-red-500'
                }`}
              >
                {order.paymentStatus === 'paid' ? 'Paid' : 'Not Paid'}
              </span>
            </div>

            {/* BUTTON */}
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
              {order.paymentStatus === 'unpaid' && (
                <div className="pt-4 sm:pt-5">
                  <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Ticket Information</h3>

                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400">No. Rekening Virtual :</p>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-semibold text-xs sm:text-sm">{order.vaNumber}</span>

                        <button
                          onClick={() => handleCopy(order.vaNumber, order.id)}
                          className={`px-2 py-1 sm:px-3 sm:py-1 rounded text-[10px] sm:text-sm border transition ${
                            copiedId === order.id
                              ? 'bg-gray-200 text-gray-500 border-gray-300'
                              : 'border-primary text-primary hover:bg-orange-500 hover:text-white hover:border-orange-500'
                          }`}
                        >
                          {copiedId === order.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-gray-400">Total Payment :</p>
                      <p className="text-primary font-semibold">${order.total}</p>
                    </div>

                    <p className="text-gray-400 text-[10px] sm:text-xs">
                      Pay this payment bill before it is due, on <span className="text-red-500">{order.deadline}</span>
                    </p>

                    <button className="mt-2 sm:mt-3 bg-primary text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded text-xs sm:text-sm hover:bg-orange-500">
                      Cek Pembayaran
                    </button>
                  </div>
                </div>
              )}

              {/* PAID */}
              {order.paymentStatus === 'paid' && (
                <div className="pt-4 sm:pt-5">
                  <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Ticket Information</h3>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* QR */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-300 flex items-center justify-center text-[10px]">QR CODE</div>

                    {/* RIGHT */}
                    <div className="flex-1">
                      {order.tickets?.length > 0 ? (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                            <div>
                              <p className="text-gray-400">Category</p>
                              <p>{order.tickets[0].category}</p>
                            </div>

                            <div>
                              <p className="text-gray-400">Time</p>
                              <p>{order.time}</p>
                            </div>

                            <div>
                              <p className="text-gray-400">Seats</p>
                              <p>{order.tickets.map((t) => t.seat).join(', ')}</p>
                            </div>

                            <div>
                              <p className="text-gray-400">Total</p>
                              <p className="font-semibold">${order.total}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                            <div>
                              <p className="text-gray-400">Movie</p>
                              <p>{order.movieTitle}</p>
                            </div>

                            <div>
                              <p className="text-gray-400">Date</p>
                              <p>{order.date}</p>
                            </div>

                            <div>
                              <p className="text-gray-400">Count</p>
                              <p>{order.tickets.length} pcs</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-400 text-xs">No ticket data available</p>
                      )}
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
