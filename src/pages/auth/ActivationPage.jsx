import AuthWrapper from '../../components/auth/AuthWrapper';
import AuthCard from '../../components/auth/AuthCard';
import StepProgres from '../../components/auth/signup/StepProgres';

function ActivationPage() {
  return (
    <AuthWrapper>
      <img src="/assets/logo.png" alt="tickitz logo" className="w-60 mb-2 mx-auto" />

      <AuthCard>
        <StepProgres step={2} />

        <div className="flex flex-col items-center text-center mt-8">
          <img src="/assets/auth/signup/email-sent.svg" alt="Email Verification" className="w-32 h-32 mt-6 object-contain mb-6" />

          <h2 className="text-2xl font-semibold text-gray-800">Check Your Email</h2>

          <p className="text-gray-500 mt-3 max-w-sm">
            We've sent an activation link to your email address. Please check your inbox and click the link to activate your account.
          </p>

          <p className="mt-4 text-sm text-gray-700">Sent to:</p>

          <p className="font-semibold text-primary">user@example.com</p>

          <button
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
            "
          >
            Resend Activation Email
          </button>

          <button
            className="
              mt-4
              text-sm
              text-primary
              hover:underline
            "
          >
            Change Email Address
          </button>
        </div>
      </AuthCard>
    </AuthWrapper>
  );
}

export default ActivationPage;
