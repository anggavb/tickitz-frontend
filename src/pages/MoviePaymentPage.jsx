import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg",
  },
];

const paymentInfo = [
  { label: "DATE & TIME", value: "Tuesday, 07 July 2026 at 02:00pm" },
  { label: "MOVIE TITLE", value: "Echoes of Jakarta" },
  { label: "CINEMA NAME", value: "CineOne21 Cinema" },
  { label: "NUMBER OF TICKETS", value: "3 pieces" },
];

function MoviePaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const steps = ["Dates And Time", "Seat", "Payment"];

  const onSubmit = (data) => {
    if (!selectedPayment) {
      alert("Please choose a payment method");
      return;
    }

    const payload = {
      ...data,
      phone: `+62${data.phone}`,
      paymentMethod: selectedPayment,
    };

    console.log("Payment submitted:", payload);

    alert("Form submitted successfully!");
  };

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl space-y-8 rounded-2xl bg-white px-6 py-8 shadow-sm"
        >
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
                  placeholder="Jonas El Rodriguez"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Full name must be at least 3 characters",
                    },
                  })}
                />

                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
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
                  placeholder="jonasrodri123@gmail.com"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email format is invalid",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <div
                  className={`flex overflow-hidden rounded-lg border transition focus-within:border-primary focus-within:ring-2 focus-within:ring-indigo-100 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <span className="flex select-none items-center border-r border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                    +62
                  </span>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="81445687121"
                    className="flex-1 bg-white px-4 py-3 text-sm text-gray-900 outline-none"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{9,14}$/,
                        message: "Phone number must be 9-14 digits",
                      },
                    })}
                  />
                </div>

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Payment Method
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                    className="max-h-6 max-w-20.5 object-contain"
                  />
                </button>
              ))}
            </div>

            {!selectedPayment && (
              <p className="mt-2 text-xs text-gray-400">
                Please choose one payment method before submitting.
              </p>
            )}
          </section>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white transition hover:bg-primary/90 active:scale-[0.99]"
          >
            Pay your order
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default MoviePaymentPage;
