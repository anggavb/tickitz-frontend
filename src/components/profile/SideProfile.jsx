import React from 'react';
import { FiCamera } from 'react-icons/fi';
import profileImage from '../../assets/images/profile.png';
import { useProfileEdit } from '../../context/profileEditContext';

function SideProfile() {
  const { setShowEditModal } = useProfileEdit();

  const user = null;

  const name = user?.name || 'Jonas El Rodriguez';
  const loyalty_tier = user?.loyalty_tier || 'Moviegoers';
  const points = user?.points ?? 320;
  const targetPoints = 1000;
  const progress = Math.min((points / targetPoints) * 100, 100);

  const handleChangePhoto = () => {
    document.getElementById('profile-upload')?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log('Selected file:', file);

    // TODO:
    // Upload ke backend di sini
    // Contoh:
    // const formData = new FormData();
    // formData.append('photo', file);
    // await api.post('/profile/photo', formData);
  };

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
        <div className="relative group">
          <img src={user?.avatar || profileImage} alt="Profile" className="h-36 w-36 md:h-44 md:w-44 rounded-full object-cover shadow-md" />

          {/* Hover Overlay */}
          <div
            onClick={handleChangePhoto}
            className="
              absolute inset-0
              rounded-full
              bg-black/50
              opacity-0
              group-hover:opacity-100
              transition-all duration-200
              flex flex-col items-center justify-center
              cursor-pointer
            "
          >
            <FiCamera className="text-white text-2xl mb-1" />
            <span className="text-white text-xs font-medium">Change Photo</span>
          </div>

          {/* Hidden File Input */}
          <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-800">{name}</h2>

        <p className="text-sm text-slate-500">{loyalty_tier}</p>
      </div>

      {/* Loyalty Section */}
      <div className="mt-6">
        <p className="text-sm font-medium text-slate-600 mb-2">Loyalty Points</p>

        <div className="bg-gradient-to-r from-primary to-indigo-500 text-white rounded-xl p-4 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">{loyalty_tier}</p>

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
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Mobile Edit Button */}
      <button
        onClick={() => setShowEditModal(true)}
        className="mt-6 md:hidden w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition font-medium"
      >
        Edit Profile
      </button>
    </section>
  );
}

export default SideProfile;
