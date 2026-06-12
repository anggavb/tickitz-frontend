import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import SweetAlert from "../../components/ui/SweetAlert";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function AddShowtimePage() {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [times, setTimes] = useState([
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, [token]);

  const toggleTime = (time) => {
    setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCinema) {
      await SweetAlert.error({ title: "Validation", text: "Please select a cinema." });
      return;
    }
    if (!startDate || !endDate) {
      await SweetAlert.error({ title: "Validation", text: "Please select a date range." });
      return;
    }
    if (selectedTimes.length === 0) {
      await SweetAlert.error({ title: "Validation", text: "Please select at least one showtime." });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        cinema_id: Number(selectedCinema),
        start_date: startDate,
        end_date: endDate,
        times: selectedTimes,
        price,
      };

      const res = await fetch(`${API_BASE_URL}/admin/movies/${movieId}/showtimes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        await SweetAlert.success({ title: "Saved", text: "Showtimes saved successfully." });
        navigate('/admin/movies');
      } else {
        await SweetAlert.error({ title: "Error", text: data.message || "Failed to save showtimes." });
      }
    } catch (error) {
      console.error(error);
      await SweetAlert.error({ title: "Error", text: "Failed to save showtimes." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <section className="mx-auto max-w-3xl bg-white p-6 md:p-8">
        <h1 className="mb-6 text-2xl font-semibold text-slate-800">Add Showtimes</h1>

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
              <label className="mb-2 block text-sm text-slate-500">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-500">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-500">Price</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-500">Showtimes</label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {times.map((time) => (
                <label key={time} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedTimes.includes(time)} onChange={() => toggleTime(time)} />
                  <span className="text-sm text-slate-700">{time}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={isSubmitting} className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Submit'}
            </button>

            <button type="button" onClick={() => navigate('/admin/movies')} className="rounded-xl border border-slate-200 px-5 py-3 text-sm text-slate-600">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddShowtimePage;
