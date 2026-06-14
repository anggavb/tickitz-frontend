import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FourSquare } from "react-loading-indicators";
import { useNavigate, useSearchParams } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import Toast from "../../components/ui/Toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/slice/authSlice";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const dispatch = useDispatch();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    clearErrors("confirmPassword");

    if (!token) {
      setError("password", {
        type: "manual",
        message: "Invalid or missing reset token.",
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        resetPassword({
          token,
          new_password: data.password,
        }),
      ).unwrap();

      setToast({
        show: true,
        message: "Password reset successfully! Redirecting to login...",
        type: "success",
      });

      reset();

      setTimeout(() => {
        navigate("/auth/signin");
      }, 2000);
    } catch (error) {
      console.error(error);

      setError("password", {
        type: "manual",
        message:
          error?.message || "Failed to reset password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <FourSquare color={["#bb2d00", "#ee3900", "#ff5722", "#ff7e55"]} />
        </div>
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}

      <img
        src="/assets/logo.png"
        alt="tickitz logo"
        className="mx-auto mb-2 w-60"
      />

      <AuthCard>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 flex flex-col gap-8"
        >
          {/* PASSWORD FIELD */}
          <div className="relative">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              New Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`h-14 w-full rounded-md border px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="absolute left-0 -bottom-5 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD FIELD */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                className={`h-14 w-full rounded-md border px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="absolute left-0 -bottom-5 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full cursor-pointer rounded-md border border-primary bg-primary font-semibold text-white transition-all hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Processing..." : "Set New Password"}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
