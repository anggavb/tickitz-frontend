import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import StepProgres from "../../components/auth/signup/StepProgres";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { resetAuthState, signup } from "../../redux/slice/authSlice";
import Toast from "../../components/ui/Toast";
import { FourSquare } from "react-loading-indicators";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = ["Fill Form", "Activate", "Done"];

  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const finalData = {
        ...data,
        is_agree: true,
      };

      await dispatch(signup(finalData)).unwrap();

      dispatch(resetAuthState());

      navigate("/auth/signup/activation", {
        state: {
          email: data.email,
          isRegistered: true,
        },
      });
    } catch (err) {
      setToast({
        show: true,
        message:
          typeof err === "string" ? err : err?.message || "Registration failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
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
        className="w-60 mb-2 mx-auto"
      />

      <AuthCard>
        <StepProgres step={1} steps={steps} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-8 mt-8"
        >
          {/* EMAIL */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className={`w-full h-14 border rounded-md px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="absolute left-0 -bottom-5 text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full h-14 border rounded-md px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="absolute left-0 -bottom-5 text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* AGREEMENT */}
          <div className="relative">
            <label className="flex items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                {...register("agree", {
                  required: "You must agree to terms & conditions",
                })}
              />
              I agree to terms & conditions
            </label>

            {errors.agree && (
              <p className="absolute left-0 -bottom-5 text-red-500 text-xs">
                {errors.agree.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 cursor-pointer bg-primary text-white rounded-md font-semibold hover:bg-transparent hover:text-primary border hover:border-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Join For Free Now
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="text-primary font-medium underline"
          >
            Sign in
          </Link>
        </p>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">Or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="h-14 border border-gray-200 rounded-md bg-white shadow-sm cursor-pointer flex items-center justify-center gap-3 hover:shadow-md transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-500">Google</span>
          </button>

          <button
            type="button"
            className="h-14 border border-gray-200 rounded-md bg-white cursor-pointer shadow-sm flex items-center justify-center gap-3 hover:shadow-md transition"
          >
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span className="text-gray-500">Facebook</span>
          </button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default SignupPage;
