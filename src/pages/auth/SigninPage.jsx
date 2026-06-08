import React, { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import AuthLayout from '../../layouts/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import Toast from '../../components/ui/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/slice/authSlice';
import { FourSquare } from 'react-loading-indicators';

function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log(user);

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
      console.log(data);
      await dispatch(signin(data)).unwrap();
    } catch (err) {
      console.log(err);
      setToast({
        show: true,
        message: typeof err === 'string' ? err : err?.message || 'Registration failed',
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back👋</h1>

          <p className="mt-4 text-gray-400 text-base leading-relaxed">Sign in with your data that you entered during your registration</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8 mt-8">
          {/* EMAIL */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
              })}
              className={`w-full h-14 border rounded-md px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            {errors.email && <p className="absolute left-0 -bottom-5 text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className="relative">
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
                className={`w-full h-14 border rounded-md px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
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

            {errors.password && <p className="absolute left-0 -bottom-5 text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end -mt-4">
            <Link to="/auth/forgot-password" className="text-primary text-sm">
              Forgot your password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full cursor-pointer h-14 bg-primary text-white rounded-md font-semibold hover:bg-transparent hover:text-primary border hover:border-primary transition-all"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">Or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="h-14 border border-gray-200 rounded-md bg-white shadow-sm flex items-center justify-center gap-3 hover:shadow-md transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-gray-500">Google</span>
          </button>

          <button
            type="button"
            className="h-14 border border-gray-200 rounded-md bg-white shadow-sm flex items-center justify-center gap-3 hover:shadow-md transition"
          >
            <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5" />
            <span className="text-gray-500">Facebook</span>
          </button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

export default SigninPage;
