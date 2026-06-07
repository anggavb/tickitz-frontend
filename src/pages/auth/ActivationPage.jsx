import { useLocation, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthWrapper from '../../components/auth/AuthWrapper';
import AuthCard from '../../components/auth/AuthCard';
import StepProgres from '../../components/auth/signup/StepProgres';

import { activate } from '../../redux/slice/authSlice';

function ActivationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;

  const { loading, error, success, message } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(''));
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

    dispatch(
      activate({
        email,
        otp: code,
      }),
    );
  };

  // ✅ redirect kalau sukses
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/auth/verified');
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <AuthWrapper>
      <img src="/assets/logo.png" alt="tickitz logo" className="w-60 mb-2 mx-auto" />

      <AuthCard>
        <StepProgres step={2} />

        <div className="flex flex-col items-center text-center mt-8">
          <img src="/assets/auth/signup/email-sent.svg" alt="OTP" className="w-32 h-32 mt-6 object-contain mb-6" />

          <h2 className="text-2xl font-semibold text-gray-800">Enter Verification Code</h2>

          <p className="text-gray-500 mt-3">We’ve sent a 6-digit verification code to your email. Please enter it below.</p>

          <p className="mt-4 text-sm text-gray-700">Sent to:</p>
          <p className="font-semibold text-primary">{email || 'No email found'}</p>

          {/* OTP INPUT */}
          <div className="flex gap-3 mt-8">
            {otp.map((data, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 mt-8 bg-primary text-white rounded-md font-semibold hover:bg-transparent hover:text-primary hover:border-primary border transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          {/* ERROR / SUCCESS */}
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          {success && <p className="text-green-500 text-sm mt-3">{message || 'OTP verified successfully'}</p>}

          <button className="mt-4 text-sm text-primary hover:underline">Resend Code</button>
        </div>
      </AuthCard>
    </AuthWrapper>
  );
}

export default ActivationPage;
