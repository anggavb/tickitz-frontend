import React from 'react';
import profileImage from '../../assets/images/profile.png';
import { useProfileEdit } from '../../context/profileEditContext';

function SideProfile() {
  const { setShowEditModal } = useProfileEdit();

  const user = null;

  const name = user?.name || 'Jonas El Rodriguez';
  const role = user?.role || 'Moviegoers';
  const points = user?.points ?? 320;
  const targetPoints = 1000;
  const progress = Math.min((points / targetPoints) * 100, 100);

  return (
    <section className="py-4 px-4 flex flex-col bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-slate-700 text-sm">INFO</p>
        <button className="p-2 rounded-full hover:bg-slate-100 transition" aria-label="More options">
          <span className="text-2xl leading-none font-bold text-slate-600">⋯</span>
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center mt-4">
        <img src={user?.avatar || profileImage} alt="Profile" className="h-36 w-36 md:h-44 md:w-44 rounded-full object-cover shadow-md" />
        <h2 className="mt-4 text-lg font-semibold text-slate-800">{name}</h2>
        <p className="text-sm text-slate-500">{role}</p>
      </div>

      {/* Loyalty Section */}
      <div className="mt-6">
        <p className="text-sm font-medium text-slate-600 mb-2">Loyalty Points</p>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl p-4 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">{role}</p>
              <p className="text-2xl font-bold">
                {points} <span className="text-sm font-normal">points</span>
              </p>
            </div>
            <div className="text-yellow-300 text-2xl">★</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <p className="text-xs text-slate-500 mb-1">{targetPoints - points} points become a master</p>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Tombol Edit Profile — mobile only */}
      <button
        onClick={() => setShowEditModal(true)}
        className="mt-6 md:hidden w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
      >
        Edit Profile
      </button>
    </section>
  );
}

export default SideProfile;
