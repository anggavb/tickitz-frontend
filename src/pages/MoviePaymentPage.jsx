import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FourSquare } from "react-loading-indicators";
import { useNavigate, useParams } from "react-router";
import StepProgres from "../components/auth/signup/StepProgres";
import HomeLayout from "../layouts/HomeLayout";
import {
  fetchPaymentPage,
  resetSeatBookingState,
  selectPaymentView,
  setSelectedPaymentMethod,
  submitOrderPayment,
} from "../redux/slice/seatBookingSlice";

const steps = ["Dates And Time", "Seat", "Payment"];

function MoviePaymentPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payment = useSelector(selectPaymentView);
  const [paymentError, setPaymentError] = useState("");
  const {
    loadingOrder,
    loadingPaymentMethods,
    submittingPayment,
    errorOrder,
    errorPaymentMethods,
    errorPayment,
    paymentInfoRows,
    paymentMethods,
    selectedPaymentMethod,
    formattedTotalPayment,
    order,
  } = payment;

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

  useEffect(() => {
    if (!orderId) return undefined;

    const promise = dispatch(fetchPaymentPage(orderId));

    return () => {
      promise.abort();
      dispatch(resetSeatBookingState());
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    if (loadingOrder || loadingPaymentMethods || !order?.status) return;
    if (order.status === "paid") {
      navigate(`/orders/${orderId}/result`, { replace: true });
      return;
    }
    if (order.status === "pending" || (order.seats ?? []).length === 0) {
      navigate(`/orders/${orderId}/booking`, { replace: true });
    }
  }, [
    loadingOrder,
    loadingPaymentMethods,
    navigate,
    order?.seats,
    order?.status,
    orderId,
  ]);

  const onSubmit = async (data) => {
    if (!selectedPaymentMethod) {
      setPaymentError("Please choose one payment method before submitting.");
      return;
    }

    setPaymentError("");

    try {
      await dispatch(submitOrderPayment({ orderId, formData: data })).unwrap();
      navigate(`/orders/${orderId}/result`);
    } catch {
      // The slice stores the payment error for rendering.
    }
  };

  if (loadingOrder || loadingPaymentMethods) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-white px-5">
          <p className="text-sm font-medium text-neutral-500">
            Loading payment data...
          </p>
        </section>
      </HomeLayout>
    );
  }

  if (submittingPayment) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen flex-col items-center justify-center gap-5 bg-white px-5">
          <FourSquare color={["#bb2d00", "#ee3900", "#ff5722", "#ff7e55"]} />
          <p className="text-sm font-medium text-neutral-500">
            Processing payment...
          </p>
        </section>
      </HomeLayout>
    );
  }

  if (errorOrder) {
    return (
      <HomeLayout>
        <section className="flex min-h-screen items-center justify-center bg-white px-5">
          <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-5 text-center">
            <h1 className="text-base font-semibold text-red-600">
              Failed to load payment
            </h1>
            <p className="mt-2 text-sm text-red-500">{errorOrder}</p>
          </div>
        </section>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="flex min-h-screen items-start justify-center bg-mainbg px-4 py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl space-y-8 rounded-2xl bg-white px-6 py-8 shadow-sm"
        >
          <section className="mx-auto mb-8 flex max-w-4xl items-center justify-center gap-20 text-center">
            <StepProgres step={3} steps={steps} />
          </section>

          <section>
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Payment Info
            </h2>

            <div className="divide-y divide-gray-100">
              {paymentInfoRows.map(({ label, value }) => (
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
                <p className="text-sm font-bold text-gray-900">
                  {formattedTotalPayment}
                </p>
              </div>
            </div>
          </section>

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
                  placeholder="Full name"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-orange-100 ${
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
                  placeholder="email@example.com"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-orange-100 ${
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
                  className={`flex overflow-hidden rounded-lg border transition focus-within:border-primary focus-within:ring-2 focus-within:ring-orange-100 ${
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
                        value: /^0?[0-9]{9,14}$/,
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

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Payment Method
            </h2>

            {errorPaymentMethods ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
                {errorPaymentMethods}
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => {
                      dispatch(setSelectedPaymentMethod(method.id));
                      setPaymentError("");
                    }}
                    aria-label={method.label}
                    className={`flex h-14 items-center justify-center rounded-lg border bg-white px-3 text-sm font-semibold text-gray-700 transition ${
                      selectedPaymentMethod === method.id
                        ? "border-primary ring-2 ring-orange-100"
                        : "border-gray-200 hover:border-primary"
                    }`}
                  >
                    {method.logoUrl ? (
                      <img
                        src={method.logoUrl}
                        alt={method.label}
                        className="max-h-6 max-w-20 object-contain"
                      />
                    ) : (
                      method.label
                    )}
                  </button>
                ))}
              </div>
            )}

            {(paymentError || errorPayment) && (
              <p className="mt-2 text-xs text-red-500">
                {paymentError || errorPayment}
              </p>
            )}
          </section>

          <button
            type="submit"
            disabled={submittingPayment || paymentMethods.length === 0}
            className="w-full rounded-xl bg-primary py-4 text-sm font-semibold text-white transition hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submittingPayment ? "Submitting payment..." : "Pay your order"}
          </button>
        </form>

      </div>
    </HomeLayout>
  );
}

export default MoviePaymentPage;
