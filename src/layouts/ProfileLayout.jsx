import React from 'react';
import { Outlet, useLocation } from 'react-router';
import ProfileNavbar from '../components/ProfileNavbar';
import ProfileHeader from '../components/profile/ProfileHeader';
import SideProfile from '../components/profile/SideProfile';
import { ProfileEditProvider } from '../context/ProfileEditContext.jsx';

function ProfileLayout() {
  const { pathname } = useLocation();
  const isHistory = pathname === '/profile/history';

  return (
    <ProfileEditProvider>
      <ProfileNavbar />

      <section className="bg-mainbg px-4 md:px-10 py-6 md:py-10 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside
            className={`
              md:col-span-3
              order-2 md:order-1
              ${isHistory ? 'hidden md:block' : ''}
            `}
          >
            <SideProfile />
          </aside>

          <main
            className={`
              space-y-6
              order-1 md:order-2
              ${isHistory ? 'md:col-span-9' : 'md:col-span-9'}
            `}
          >
            <ProfileHeader />
            <Outlet />
          </main>
        </div>
      </section>
    </ProfileEditProvider>
  );
}

export default ProfileLayout;
