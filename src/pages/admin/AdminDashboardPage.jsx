import SalesChartCard from "../../components/SalesChartCard";

import {
  salesChartData,
  ticketSalesData,
} from "../../data/dashboardData";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <SalesChartCard
          title="Sales Chart"
          subtitle="Avengers: End Game"
          firstFilter="Movies Name"
          secondFilter="Weekly"
          data={salesChartData}
        />

        <SalesChartCard
          title="Ticket Sales"
          subtitle="Adventure, Purwokerto"
          firstFilter="Category"
          secondFilter="Location"
          data={ticketSalesData}
        />
      </div>
    </main>
  );
}
