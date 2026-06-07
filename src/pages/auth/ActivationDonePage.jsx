import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import AuthWrapper from '../../components/auth/AuthWrapper';
import AuthCard from '../../components/auth/AuthCard';
import StepProgres from '../../components/auth/signup/StepProgres';

function ActivationDonePage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  // countdown + redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/auth/login');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <AuthWrapper>
      <img src="/assets/logo.png" alt="tickitz logo" className="w-60 mb-2 mx-auto" />

      <AuthCard>
        <StepProgres step={3} />

        <div className="flex flex-col items-center text-center mt-8">
          <img src="/assets/auth/signup/verified.svg" alt="Account Activated" className="w-32 h-32 mt-6 object-contain mb-6" />

          <h2 className="text-2xl font-semibold text-gray-800">Account Activated</h2>

          <p className="text-gray-500 mt-3 max-w-sm">
            Your account has been successfully activated. You can now log in and start booking your favorite movies.
          </p>

          <Link
            to="/auth/login"
            className="
              w-full
              h-14
              mt-8
              bg-primary
              text-white
              rounded-md
              font-semibold
              border
              border-transparent
              transition-all
              hover:bg-transparent
              hover:text-primary
              hover:border-primary
              flex
              items-center
              justify-center
            "
          >
            Login Now
          </Link>

          {/* COUNTDOWN */}
          <p className="text-sm text-gray-400 mt-4">
            Redirecting to login in <span className="font-semibold">{countdown}</span> seconds...
          </p>
        </div>
      </AuthCard>
    </AuthWrapper>
  );
}

export default ActivationDonePage;
