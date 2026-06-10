import React, { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import StepProgres from "../components/auth/signup/StepProgres";

const paymentMethods = [
  {
    id: "gpay",
    label: "G Pay",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
  },
  {
    id: "visa",
    label: "VISA",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_(2021%E2%80%93present).svg",
  },
  {
    id: "gopay",
    label: "GoPay",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
  },
  {
    id: "paypal",
    label: "PayPal",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    id: "dana",
    label: "DANA",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
  },
  {
    id: "bca",
    label: "BCA",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
  },
  {
    id: "bri",
    label: "Bank BRI",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/BANK_BRI_logo_%28vertical%29.svg",
  },
  {
    id: "ovo",
    label: "OVO",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
  },
];

const paymentInfo = [
  { label: "DATE & TIME", value: "Tuesday, 07 July 2026 at 02:00pm" },
  { label: "MOVIE TITLE", value: "Spider-Man: Homecoming" },
  { label: "CINEMA NAME", value: "CineOne21 Cinema" },
  { label: "NUMBER OF TICKETS", value: "3 pieces" },
];

function MoviePaymentPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!selectedPayment) {
      alert("Please choose a payment method");
      return;
    }

    console.log("Form submitted:", {
      ...form,
      paymentMethod: selectedPayment,
    });

    alert("Form submitted successfully!");
  };

  const steps = ["Dates And Time", "Seat", "Payment"];

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-4xl space-y-8 rounded-2xl bg-white px-6 py-8 shadow-sm">
          <section className="mx-auto mb-8 flex max-w-4xl items-center justify-center gap-20 text-center">
            <StepProgres step={3} steps={steps} />
          </section>

          {/* Payment Info */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Payment Info
            </h2>

            <div className="divide-y divide-gray-100">
              {paymentInfo.map(({ label, value }) => (
                <div key={label} className="py-4">
                  <p className="mb-1 text-xs font-semibold tracking-widest text-primary">
                    {label}
                  </p>
                  <p className="text-sm text-gray-900">{value}</p>
                </div>
              ))}

              <div className="py-4">
                <p className="mb-1 text-xs font-semibold tracking-widest text-primary">
                  TOTAL PAYMENT
                </p>
                <p className="text-sm font-bold text-gray-900">$30,00</p>
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section>
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jonas El Rodriguez"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jonasrodri123@gmail.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <div className="flex overflow-hidden rounded-lg border border-gray-300 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-indigo-100">
                  <span className="flex select-none items-center border-r border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    +62
                  </span>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="81445687121"
                    className="flex-1 bg-white px-4 py-3 text-sm text-gray-900 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Payment Method
            </h2>

            <div className="grid grid-cols-4 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedPayment(method.id)}
                  aria-label={method.label}
                  className={`flex h-14 items-center justify-center rounded-lg border bg-white px-3 transition ${
                    selectedPayment === method.id
                      ? "border-primary ring-2 ring-indigo-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={method.logoUrl}
                    alt={method.label}
                    className="max-h-6 max-w-[82px] object-contain"
                  />
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white transition hover:bg-primary/90 active:scale-[0.99]"
          >
            Pay your order
          </button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default MoviePaymentPage;
