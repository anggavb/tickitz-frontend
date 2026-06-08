import { useLocation, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthLayout from '../../layouts/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import StepProgres from '../../components/auth/signup/StepProgres';
import Toast from '../../components/ui/Toast';

import { activate, resetAuthState } from '../../redux/slice/authSlice';

import { FourSquare } from 'react-loading-indicators';

function ActivationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;
  const isRegistered = location.state?.isRegistered;

  const { loading, error, success } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');

    if (code.length !== 6 || loading) return;

    setIsSubmitted(true);

    dispatch(
      activate({
        email,
        otp: code,
      }),
    );
  };

  useEffect(() => {
    if (!isRegistered) {
      navigate('/auth/signup', { replace: true });
      return;
    }

    if (isSubmitted && success) {
      const timer = setTimeout(() => {
        navigate('/auth/signup/verified', {
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

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <AuthLayout>
      {error && <Toast message={error} type="error" onClose={() => dispatch(resetAuthState())} />}

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <FourSquare color={['#bb2d00', '#ee3900', '#ff5722', '#ff7e55']} />
        </div>
      )}

      <img src="/assets/logo.png" alt="tickitz logo" className="w-60 mb-2 mx-auto" />

      <AuthCard>
        <StepProgres step={2} />

        <div className="flex flex-col items-center text-center mt-8">
          <img src="/assets/auth/signup/email-sent.svg" alt="OTP" className="w-32 h-32 mt-6 object-contain mb-6" />

          <h2 className="text-2xl font-semibold text-gray-800">Enter Verification Code</h2>

          <p className="text-gray-500 mt-3">We’ve sent a 6-digit verification code to your email. Please enter it below.</p>

          <p className="mt-4 text-sm text-gray-700">Sent to:</p>

          <p className="font-semibold text-primary">{email || 'No email found'}</p>

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
                className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !isOtpComplete}
            className="w-full h-14 mt-8 bg-primary text-white rounded-md font-semibold hover:bg-transparent hover:text-primary hover:border-primary border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button disabled={loading} className="mt-4 text-sm text-primary hover:underline disabled:opacity-50">
            Resend Code
          </button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default ActivationPage;
