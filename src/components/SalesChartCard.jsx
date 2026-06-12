import arrowDownIcon from "../assets/images/arrow-down-2.png";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function SalesChartCard({
  title,
  subtitle,
  loading = false,
  error = null,
  filters = {},
  onFilterChange = null,
  onFilterApply = null,
  filterOptions = {},
  data = [],
  chartDataKey = "sales",
}) {
  const formatRupiah = (value) => {
    if (value == null) return "";
    const n = Number(value);
    if (Number.isNaN(n)) return value;
    return "Rp " + n.toLocaleString("id-ID");
  };
  const handleFirstFilterChange = (e) => {
    if (onFilterChange) {
      const filterKey =
        title === "Sales Chart" ? "movieName" : "category";
      onFilterChange(filterKey, e.target.value);
    }
  };

  const handleSecondFilterChange = (e) => {
    if (onFilterChange) {
      const filterKey =
        title === "Sales Chart" ? "period" : "location";
      onFilterChange(filterKey, e.target.value);
    }
  };

  const handlePeriodChange = (e) => {
    if (onFilterChange) {
      onFilterChange("period", e.target.value);
    }
  };

  const getFirstFilterOptions = () => {
    if (title === "Sales Chart") {
      return filterOptions.movieNames || [];
    }
    return filterOptions.categories || [];
  };

  const getSecondFilterOptions = () => {
    if (title === "Sales Chart") {
      return filterOptions.periods || [];
    }
    return filterOptions.locations || [];
  };

  const getFirstFilterValue = () => {
    return title === "Sales Chart"
      ? filters.movieName || ""
      : filters.category || "";
  };

  const getSecondFilterValue = () => {
    return title === "Sales Chart"
      ? filters.period || "weekly"
      : filters.location || "";
  };

  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold text-slate-900">{title}</h2>

      <div className="mb-10 flex flex-wrap gap-4">
        <div className="relative">
          <select
            value={getFirstFilterValue()}
            onChange={handleFirstFilterChange}
            className="h-12 w-50 appearance-none rounded-lg bg-slate-100 px-4 pr-12 text-slate-600"
          >
            <option value="">
              {title === "Sales Chart"
                ? "Movies Name"
                : "Category"}
            </option>
            {getFirstFilterOptions().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <img
            src={arrowDownIcon}
            alt="Arrow Down"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
          />
        </div>

        {title === "Sales Chart" ? (
          <>
            <div className="relative">
              <select
                value={filters.period || "weekly"}
                onChange={handlePeriodChange}
                className="h-12 w-40 appearance-none rounded-lg bg-slate-100 px-4 pr-12 text-slate-600"
              >
                {(filterOptions.periods || []).map((period) => (
                  <option key={period} value={period}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </option>
                ))}
              </select>

              <img
                src={arrowDownIcon}
                alt="Arrow Down"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
              />
            </div>
            <button
              type="button"
              onClick={onFilterApply}
              className="cursor-pointer h-12 rounded-lg bg-primary px-8 text-white hover:bg-primary/90"
            >
              Filter
            </button>
          </>
        ) : (
          <>
            <div className="relative">
              <select
                value={getSecondFilterValue()}
                onChange={handleSecondFilterChange}
                className="h-12 w-40 appearance-none rounded-lg bg-slate-100 px-4 pr-12 text-slate-600"
              >
                <option value="">Location</option>
                {getSecondFilterOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <img
                src={arrowDownIcon}
                alt="Arrow Down"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
              />
            </div>
            <button
              type="button"
              onClick={onFilterApply}
              className="cursor-pointer h-12 rounded-lg bg-primary px-8 text-white hover:bg-primary/90"
            >
              Filter
            </button>
          </>
        )}
      </div>

      <p className="mb-6 text-sm text-slate-700">{subtitle}</p>

      {loading && (
        <div className="h-87.5 flex items-center justify-center">
          <p className="text-slate-500">Loading chart data...</p>
        </div>
      )}

      {error && (
        <div className="h-87.5 flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="h-87.5">
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500">No data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="period" />
                <YAxis width={80} tickFormatter={(value) => formatRupiah(value)} />
                <Tooltip formatter={(value) => formatRupiah(value)} />

                <Area
                  type="monotone"
                  dataKey={chartDataKey}
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </section>
  );
}