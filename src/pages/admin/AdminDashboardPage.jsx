import { useState, useEffect, useCallback } from "react";
import SalesChartCard from "../../components/SalesChartCard";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default function AdminDashboardPage() {
  const [salesChartData, setSalesChartData] = useState([]);
  const [ticketSalesData, setTicketSalesData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [errorChart, setErrorChart] = useState(null);
  const [errorTickets, setErrorTickets] = useState(null);

  const [chartFilters, setChartFilters] = useState({
    movieName: "",
    period: "daily",
  });

  const [chartFiltersDraft, setChartFiltersDraft] = useState({
    movieName: "",
    period: "daily",
  });

  const [ticketFilters, setTicketFilters] = useState({
    category: "",
    location: "",
  });

  const [ticketFiltersDraft, setTicketFiltersDraft] = useState({
    category: "",
    location: "",
  });

  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/movies?limit=100&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (data.success && data.data) {
        setMovies(data.data.map((m) => m.name));
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  const fetchLocations = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/locations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        setLocations(data.data.map((l) => l.location));
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  }, []);

  const fetchSalesChart = useCallback(async () => {
    setLoadingChart(true);
    setErrorChart(null);
    try {
      const params = new URLSearchParams();
      if (chartFilters.movieName) {
        params.append("movie_name", chartFilters.movieName);
      }
      params.append("period", chartFilters.period);

      const response = await fetch(
        `${API_BASE_URL}/admin/dashboard/sales-chart?${params.toString()}`,
      );
      const data = await response.json();

      if (data.success) {
        const transformedData = data.data.points.map((point) => ({
          period: point.period,
          sales: point.revenue,
        }));
        setSalesChartData(transformedData);
      } else {
        setErrorChart("Failed to fetch sales chart data");
      }
    } catch (error) {
      setErrorChart(error.message);
    } finally {
      setLoadingChart(false);
    }
  }, [chartFilters]);

  const fetchTicketSales = useCallback(async () => {
    setLoadingTickets(true);
    setErrorTickets(null);
    try {
      const params = new URLSearchParams();
      if (ticketFilters.category) {
        params.append("category", ticketFilters.category);
      }
      if (ticketFilters.location) {
        params.append("location", ticketFilters.location);
      }

      const response = await fetch(
        `${API_BASE_URL}/admin/dashboard/ticket-sales?${params.toString()}`,
      );
      const data = await response.json();

      if (data.success) {
        const transformedData = data.data.map((point) => ({
          period: point.period,
          sales: point.revenue,
          tickets: point.ticket_count,
        }));
        setTicketSalesData(transformedData);
      } else {
        setErrorTickets("Failed to fetch ticket sales data");
      }
    } catch (error) {
      setErrorTickets(error.message);
    } finally {
      setLoadingTickets(false);
    }
  }, [ticketFilters]);

  useEffect(() => {
    const loadData = async () => {
      await fetchMovies();
      await fetchCategories();
      await fetchLocations();
    };

    void loadData();
  }, [fetchMovies, fetchCategories, fetchLocations]);

  useEffect(() => {
    const loadSales = async () => {
      await fetchSalesChart();
    };

    void loadSales();
  }, [fetchSalesChart]);

  useEffect(() => {
    const loadTicketSales = async () => {
      await fetchTicketSales();
    };

    void loadTicketSales();
  }, [fetchTicketSales]);

  const handleChartFilterChange = (type, value) => {
    setChartFiltersDraft((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleChartFilterApply = () => {
    setChartFilters(chartFiltersDraft);
  };

  const handleTicketFilterChange = (type, value) => {
    setTicketFiltersDraft((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleTicketFilterApply = () => {
    setTicketFilters(ticketFiltersDraft);
  };

  const formatPeriodLabel = (p) => {
    if (!p) return "";
    return p.charAt(0).toUpperCase() + p.slice(1);
  };

  const chartSubtitle = `${chartFilters.movieName || "All Movies"}, ${formatPeriodLabel(
    chartFilters.period || "daily",
  )}`;

  const ticketSubtitle = [
    ticketFilters.category || "All Categories",
    ticketFilters.location || "All Locations",
  ].join(", ");

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <SalesChartCard
          title="Sales Chart"
          subtitle={chartSubtitle}
          loading={loadingChart}
          error={errorChart}
          filters={chartFiltersDraft}
          onFilterChange={handleChartFilterChange}
          onFilterApply={handleChartFilterApply}
          filterOptions={{
            movieNames: movies,
            periods: ["daily", "weekly", "monthly"],
          }}
          data={salesChartData}
          dataKey="sales"
          chartDataKey="sales"
        />

        <SalesChartCard
          title="Ticket Sales"
          subtitle={ticketSubtitle}
          loading={loadingTickets}
          error={errorTickets}
          filters={ticketFiltersDraft}
          onFilterChange={handleTicketFilterChange}
          onFilterApply={handleTicketFilterApply}
          filterOptions={{
            categories,
            locations,
          }}
          data={ticketSalesData}
          dataKey="tickets"
          chartDataKey="sales"
        />
      </div>
    </main>
  );
}
