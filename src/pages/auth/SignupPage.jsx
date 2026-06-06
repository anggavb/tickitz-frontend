import React, { useState } from 'react';
import AuthWrapper from '../../components/auth/AuthWrapper';
import AuthCard from '../../components/auth/AuthCard';
import StepProgres from '../../components/auth/signup/StepProgres';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // TODO: Hit API Register

    navigate('/auth/activation');
  };

  return (
    <AuthWrapper>
      <img src="/assets/logo.png" alt="tickitz logo" className="w-60 mb-2 mx-auto" />

      <AuthCard>
        <StepProgres step={1} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-8">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format',
                },
              })}
              className={`
                w-full
                h-14
                border
                rounded-md
                px-5
                text-sm
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-primary
                ${errors.email ? 'border-red-500' : 'border-gray-300'}
              `}
            />

            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className={`
                  w-full
                  h-14
                  border
                  rounded-md
                  px-5
                  pr-12
                  text-sm
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}
                `}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-gray-600
                  transition
                "
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* CHECKBOX */}
          <div>
            <label className="flex items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                {...register('agree', {
                  required: 'You must agree to terms & conditions',
                })}
              />
              I agree to terms & conditions
            </label>

            {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree.message}</p>}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              h-14
              bg-primary
              text-white
              rounded-md
              font-semibold
              transition-all
              border
              border-transparent
              hover:bg-transparent
              hover:border-primary
              hover:text-primary
            "
          >
            Join For Free Now
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary font-medium underline">
            Log in
          </Link>
        </p>

        <div className="flex items-center my-3">
          <div className="flex-1 h-px bg-gray-300" />

          <span className="px-4 text-sm text-gray-400 whitespace-nowrap">or</span>

          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* SOCIAL LOGIN */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="
              h-14
              bg-white
              rounded-lg
              shadow-md
              hover:shadow-lg
              transition-all
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <img src="/assets/auth/oauth/google.png" alt="Google" className="w-6 h-6 object-contain" />
            <span className="text-base font-medium text-gray-400">Google</span>
          </button>

          <button
            type="button"
            className="
              h-14
              bg-white
              rounded-lg
              shadow-md
              hover:shadow-lg
              transition-all
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <img src="/assets/auth/oauth/facebook.png" alt="Facebook" className="w-6 h-6 object-contain" />
            <span className="text-base font-medium text-gray-400">Facebook</span>
          </button>
        </div>
      </AuthCard>
    </AuthWrapper>
  );
}

export default SignupPage;
