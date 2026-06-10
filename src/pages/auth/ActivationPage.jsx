import { useLocation, useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import StepProgres from "../../components/auth/signup/StepProgres";
import Toast from "../../components/ui/Toast";

import {
  activate,
  requestNewOTP,
  resetAuthState,
} from "../../redux/slice/authSlice";

import { FourSquare } from "react-loading-indicators";

function ActivationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;
  const isRegistered = location.state?.isRegistered;
  const steps = ["Fill Form", "Activate", "Done"];

  const { loading, error, success } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [countdown, setCountdown] = useState(0);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");

    if (code.length !== 6 || loading) return;

    setIsSubmitted(true);

    dispatch(
      activate({
        email,
        otp: code,
      }),
    );
  };

  const handleResendOTP = async () => {
    if (!email || loading || countdown > 0) return;

    try {
      const result = await dispatch(requestNewOTP({ email })).unwrap();

      setCountdown(30);

      setToast({
        show: true,
        type: "success",
        message: result?.message || "OTP sent successfully",
      });

      dispatch(resetAuthState());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setToast({
        show: true,
        type: "error",
        message: error,
      });

      setOtp(new Array(6).fill(""));

      dispatch(resetAuthState());
    }, 0);

    return () => clearTimeout(timer);
  }, [error, dispatch]);

  useEffect(() => {
    if (!isRegistered) {
      navigate("/auth/signup", { replace: true });
      return;
    }

    if (isSubmitted && success) {
      const timer = setTimeout(() => {
        navigate("/auth/signup/verified", {
          replace: true,
          state: {
            isActive: true,
            isRegistered: true,
          },
        });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [success, isSubmitted, navigate, isRegistered]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const isOtpComplete = otp.every((d) => d !== "");

  return (
    <AuthLayout>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, type: "", message: "" })}
        />
      )}

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <FourSquare color={["#bb2d00", "#ee3900", "#ff5722", "#ff7e55"]} />
        </div>
      )}

      <img
        src="/assets/logo.png"
        alt="tickitz logo"
        className="w-60 mb-2 mx-auto"
      />

      <AuthCard>
        <StepProgres step={2} steps={steps} />

        <div className="flex flex-col items-center text-center mt-8">
          <img
            src="/assets/auth/signup/email-sent.svg"
            className="w-32 h-32 mt-6 mb-6"
          />

          <h2 className="text-2xl font-semibold">Enter Verification Code</h2>

          <p className="text-gray-500 mt-3">
            We sent a 6-digit code to your email
          </p>

          <p className="mt-4 font-semibold text-primary">{email}</p>

          <div className="flex gap-3 mt-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                disabled={loading}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border rounded-md"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !isOtpComplete}
            className="w-full cursor-pointer h-14 mt-8 bg-primary text-white rounded-md disabled:opacity-50"
          >
            Verify OTP
          </button>

          <button
            onClick={handleResendOTP}
            disabled={loading || countdown > 0}
            className="mt-4 text-sm text-primary"
          >
            {countdown > 0 ? `Resend Code (${countdown}s)` : "Resend Code"}
          </button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default ActivationPage;
