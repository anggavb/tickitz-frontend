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
  firstFilter,
  secondFilter,
  data,
}) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold text-slate-900">{title}</h2>

      <div className="mb-10 flex flex-wrap gap-4">
        <div className="relative">
          <select className="h-12 w-50 appearance-none rounded-lg bg-slate-100 px-4 pr-12 text-slate-600">
            <option>{firstFilter}</option>
          </select>

          <img
            src={arrowDownIcon}
            alt="Arrow Down"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
          />
        </div>

        <div className="relative">
          <select className="h-12 w-40 appearance-none rounded-lg bg-slate-100 px-4 pr-12 text-slate-600">
            <option>{secondFilter}</option>
          </select>

          <img
            src={arrowDownIcon}
            alt="Arrow Down"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
          />
        </div>

        <button className="cursor-pointer h-12 rounded-lg bg-primary px-8 text-white hover:bg-primary/90">
          Filter
        </button>
      </div>

      <p className="mb-6 text-sm text-slate-700">{subtitle}</p>

      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
