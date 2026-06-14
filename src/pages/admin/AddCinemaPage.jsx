import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import SweetAlert from "../../components/ui/SweetAlert";
import env from "@/utils/env";

const API_BASE_URL = env.baseAPI;

function AddShowtimePage() {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [times, setTimes] = useState([
    // load from backend
  ]);
  const [showtimeHistory, setShowtimeHistory] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groupShowtimeHistory = (rows) => {
    if (!Array.isArray(rows)) return [];

    const groups = {};
    rows.forEach((row) => {
      const cinemaId = row.cinema_id || row.cinemaId || row.cinema?.id;
      const priceValue = row.price ?? row.price_amount ?? row.priceValue ?? 0;
      const showtime = row.showtime || row.Showtime || row.showTime || "";
      const showDate = row.show_date || row.ShowDate || row.showDate || "";

      // Group by cinema_id and price only, collect times separately
      const key = `${cinemaId}||${priceValue}`;

      if (!groups[key]) {
        groups[key] = {
          id: key,
          cinemaId,
          cinemaName:
            row.cinema_name ||
            row.cinema?.name ||
            row.cinemaName ||
            row.name ||
            "Cinema",
          price: priceValue,
          times: showtime ? [showtime] : [],
          startDate: showDate,
          endDate: showDate,
        };
      } else {
        // Add unique showtime to the group
        if (showtime && !groups[key].times.includes(showtime)) {
          groups[key].times.push(showtime);
        }
        // Update date range
        if (showDate) {
          if (!groups[key].startDate || showDate < groups[key].startDate) {
            groups[key].startDate = showDate;
          }
          if (!groups[key].endDate || showDate > groups[key].endDate) {
            groups[key].endDate = showDate;
          }
        }
      }
    });

    // Sort times in each group
    Object.values(groups).forEach((group) => {
      group.times.sort();
    });

    return Object.values(groups);
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/cinemas`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.data)) {
          setCinemas(data.data);
        } else if (res.ok && Array.isArray(data)) {
          setCinemas(data);
        } else {
          setCinemas([]);
        }
      } catch (error) {
        console.error("Failed to fetch cinemas", error);
        setCinemas([]);
      }
    };

    fetchCinemas();
    // fetch showtime options from public endpoint
    const fetchTimes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movies/showtimes`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        let list = [];
        if (res.ok && Array.isArray(data.data)) {
          list = data.data.map(
            (i) => i.showtime || i.Showtime || i.showTime || i,
          );
        } else if (res.ok && Array.isArray(data)) {
          list = data.map((i) => i.showtime || i.Showtime || i.showTime || i);
        }
        // ensure strings and filter falsy
        setTimes(list.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch showtimes", error);
        setTimes([]);
      }
    };

    fetchTimes();
    // fetch existing showtimes for this movie (admin)
    const fetchShowtimes = async () => {
      if (!movieId) return;
      try {
        const res = await fetch(
          `${API_BASE_URL}/admin/movies/${movieId}/showtimes`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          },
        );
        const data = await res.json();
        let list = [];
        if (res.ok && Array.isArray(data.data)) {
          list = data.data;
        } else if (res.ok && Array.isArray(data)) {
          list = data;
        }
        setShowtimeHistory(
          groupShowtimeHistory(Array.isArray(list) ? list : []),
        );
      } catch (error) {
        console.error("Failed to fetch movie showtimes", error);
        setShowtimeHistory([]);
      }
    };

    fetchShowtimes();
  }, [token, movieId]);

  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCinema) {
      await SweetAlert.error({
        title: "Validation",
        text: "Please select a cinema.",
      });
      return;
    }
    if (!startDate || !endDate) {
      await SweetAlert.error({
        title: "Validation",
        text: "Please select a date range.",
      });
      return;
    }
    if (selectedTimes.length === 0) {
      await SweetAlert.error({
        title: "Validation",
        text: "Please select at least one showtime.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        cinema_id: Number(selectedCinema),
        start_date: startDate,
        end_date: endDate,
        times: selectedTimes,
        price: Number(price),
      };

      const res = await fetch(
        `${API_BASE_URL}/admin/movies/${movieId}/showtimes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (res.ok) {
        await SweetAlert.success({
          title: "Saved",
          text: "Showtimes saved successfully.",
        });
        // refresh history and clear form so the new chip appears
        try {
          const refetch = await fetch(
            `${API_BASE_URL}/admin/movies/${movieId}/showtimes`,
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            },
          );
          const refData = await refetch.json();
          if (refetch.ok && Array.isArray(refData.data))
            setShowtimeHistory(groupShowtimeHistory(refData.data));
          else if (refetch.ok && Array.isArray(refData))
            setShowtimeHistory(groupShowtimeHistory(refData));
        } catch (err) {
          console.error("Failed to refresh showtime history", err);
        }

        // reset form
        setSelectedCinema("");
        setStartDate("");
        setEndDate("");
        setSelectedTimes([]);
        setPrice("");
      } else {
        await SweetAlert.error({
          title: "Error",
          text: data.message || "Failed to save showtimes.",
        });
      }
    } catch (error) {
      console.error(error);
      await SweetAlert.error({
        title: "Error",
        text: "Failed to save showtimes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadHistory = (item) => {
    if (!item) return;
    if (item.cinemaId) setSelectedCinema(String(item.cinemaId));
    if (item.startDate) setStartDate(item.startDate);
    if (item.endDate) setEndDate(item.endDate);
    setSelectedTimes(Array.isArray(item.times) ? item.times : []);
    if (item.price !== undefined) setPrice(String(item.price));
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <section className="mx-auto max-w-3xl bg-white p-6 md:p-8">
        <h1 className="mb-6 text-2xl font-semibold text-slate-800">
          Add Showtimes
        </h1>
        {showtimeHistory && showtimeHistory.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {showtimeHistory.map((h) => {
              const label = h.startDate
                ? `${h.cinemaName} • ${h.startDate}${h.endDate ? ` - ${h.endDate}` : ""}`
                : h.cinemaName;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => handleLoadHistory(h)}
                  className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-500">Cinema</label>
            <select
              value={selectedCinema}
              onChange={(e) => setSelectedCinema(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            >
              <option value="">-- Select Cinema --</option>
              {cinemas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-500">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-500">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-500">Price</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-500">
              Showtimes
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {times.map((time) => (
                <label key={time} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTimes.includes(time)}
                    onChange={() => toggleTime(time)}
                  />
                  <span className="text-sm text-slate-700">{time}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/movies")}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm text-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddShowtimePage;
