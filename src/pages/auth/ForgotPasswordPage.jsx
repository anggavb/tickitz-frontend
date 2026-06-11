import React, { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';

import AuthLayout from '../../layouts/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import Toast from '../../components/ui/Toast';
import logo from '../../assets/logo.png';
import { FourSquare } from 'react-loading-indicators';

function ForgotPasswordPage() {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'error',
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
      console.log(data);
      // TODO: Call forgot password API
      setToast({
        show: true,
        message: 'Reset instructions sent to your email',
        type: 'success',
      });
    } catch (err) {
      console.log(err);
      setToast({
        show: true,
        message: typeof err === 'string' ? err : err?.message || 'Failed to send reset link',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <FourSquare color={['#bb2d00', '#ee3900', '#ff5722', '#ff7e55']} />
        </div>
      )}
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}

      <AuthCard className="max-w-md mx-auto">
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Tickitz Logo" className="h-12" />
        </div>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Fill Out Form Correctly</h1>
          <div className="flex items-center mt-3">
            <span className="text-primary text-xl">👋</span>
          </div>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">We will send reset instructions to your email.</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 mt-8">
          {/* EMAIL */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter Your Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full h-14 border rounded-md px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            {errors.email && <p className="absolute left-0 -bottom-5 text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full cursor-pointer h-14 bg-primary text-white rounded-md font-semibold hover:bg-transparent hover:text-primary border hover:border-primary transition-all mt-4"
          >
            Submit
          </button>
        </form>

        {/* BACK TO LOGIN LINK */}
        <div className="flex justify-center mt-6">
          <span className="text-gray-400 text-sm">
            Remember your password?{' '}
            <Link to="/auth/signin" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </span>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
