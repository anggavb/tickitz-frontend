import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileEdit } from '../../context/profileEditContext';

function SettingPage() {
  const { showEditModal, setShowEditModal } = useProfileEdit();
  const [isEditing, setIsEditing] = useState(false);
  const user = null;

  const profileData = {
    firstName: user?.firstName ?? 'Jonas',
    lastName: user?.lastName ?? 'El Rodriguez',
    email: user?.email ?? 'jonasrodrigu123@gmail.com',
    phone: user?.phone ?? '81445687121',
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: { ...profileData, password: '', confirmPassword: '' },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    reset({ ...profileData, password: '', confirmPassword: '' });
  }, [user]);

  useEffect(() => {
    if (confirmPassword) trigger('confirmPassword');
  }, [password, confirmPassword]);

  const handleCancel = () => {
    reset({ ...profileData, password: '', confirmPassword: '' });
    setIsEditing(false);
    setShowEditModal(false);
  };

  const onSubmit = (data) => {
    const payload = { firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone };
    if (data.password) payload.password = data.password;
    console.log(payload);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const renderFields = (isModal) => (
    <>
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-slate-700 mb-6">Details Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-slate-500">First Name</label>
            <input
              disabled={!isModal && !isEditing}
              className="w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500"
              {...register('firstName')}
            />
          </div>
          <div>
            <label className="text-sm text-slate-500">Last Name</label>
            <input
              disabled={!isModal && !isEditing}
              className="w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500"
              {...register('lastName')}
            />
          </div>
          <div>
            <label className="text-sm text-slate-500">E-mail</label>
            <input
              type="email"
              disabled={!isModal && !isEditing}
              className={`w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500 ${errors.email ? 'border-red-500' : ''}`}
              {...register('email', { required: 'Email wajib diisi', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Format email tidak valid' } })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm text-slate-500">Phone Number</label>
            <div className="mt-2 flex items-center border rounded-xl h-[54px] px-4 bg-white">
              <span className="text-slate-600 text-lg pr-5">+62</span>
              <div className="w-px h-8 bg-slate-300" />
              <input
                type="text"
                disabled={!isModal && !isEditing}
                className="flex-1 ml-5 outline-none bg-transparent disabled:text-slate-500"
                {...register('phone')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-slate-700 mb-6">Account and Privacy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-slate-500">New Password</label>
            <input
              type="password"
              disabled={!isModal && !isEditing}
              placeholder="Write your password"
              className={`w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 ${errors.password ? 'border-red-500' : ''}`}
              {...register('password', { validate: (v) => !v || v.length >= 8 || 'Password minimal 8 karakter' })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="text-sm text-slate-500">Confirm Password</label>
            <input
              type="password"
              disabled={!isModal && !isEditing}
              placeholder="Confirm your password"
              className={`w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              {...register('confirmPassword', {
                validate: (v) => {
                  if (password && !v) return 'Confirm password must be filled';
                  if (!password && v) return 'Password must be filled';
                  if (password && v && password !== v) return 'New password and confirm password not match';
                  return true;
                },
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <form onSubmit={handleSubmit(onSubmit)} className="hidden md:flex flex-col space-y-6">
        {renderFields(false)}

        {/* Actions */}
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Cancel Edit
              </button>
              <button type="submit" className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
                Update Profile
              </button>
            </>
          )}
        </div>
      </form>

      {/* Mobile modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 py-6 overflow-y-auto md:hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6 pb-6">
            {renderFields(true)}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Cancel
              </button>
              <button type="submit" className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default SettingPage;
