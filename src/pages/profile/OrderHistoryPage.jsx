// import { useSelector } from 'react-redux';
import { FiChevronDown } from 'react-icons/fi';

function OrderHistoryPage() {
  //   const { orderHistory } = useSelector((state) => state.auth);

  const fallbackOrders = [
    {
      id: 1,
      movieTitle: 'Spider-Man: Homecoming',
      cinema: 'CineOne21',
      date: 'Tuesday, 07 July 2020',
      time: '04:30pm',
      ticketStatus: 'active',
      paymentStatus: 'unpaid',
    },
    {
      id: 2,
      movieTitle: 'Avengers: End Game',
      cinema: 'ebv.id',
      date: 'Monday, 14 June 2020',
      time: '02:00pm',
      ticketStatus: 'used',
      paymentStatus: 'paid',
    },
    {
      id: 3,
      movieTitle: 'Avengers: End Game',
      cinema: 'ebv.id',
      date: 'Monday, 14 June 2020',
      time: '02:00pm',
      ticketStatus: 'used',
      paymentStatus: 'paid',
    },
  ];

  const orders = fallbackOrders;

  return (
    <div className="space-y-4 md:space-y-5">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 border-b pb-4 md:pb-5">
            <div>
              <p className="text-xs text-slate-400 mb-1">
                {order.date} - {order.time}
              </p>

              <h2 className="text-base md:text-xl font-semibold text-slate-800">{order.movieTitle}</h2>
            </div>

            <div className="text-sm md:text-lg font-bold text-slate-700">{order.cinema}</div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 md:pt-5">
            <div className="flex gap-2 flex-wrap">
              <span
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium ${
                  order.ticketStatus === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {order.ticketStatus === 'active' ? 'Ticket active' : 'Ticket used'}
              </span>

              <span
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium ${
                  order.paymentStatus === 'paid' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-500'
                }`}
              >
                {order.paymentStatus === 'paid' ? 'Paid' : 'Not Paid'}
              </span>
            </div>

            <button className="flex items-center gap-2 text-xs md:text-sm text-slate-400 hover:text-slate-600 transition">
              Show Details
              <FiChevronDown />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistoryPage;
