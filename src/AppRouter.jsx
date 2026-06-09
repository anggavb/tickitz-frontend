import { Navigate, Route, Routes } from 'react-router';

import LandingPage from './pages/LandingPage';
import HomeMoviePage from './pages/HomeMoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import AdminMoviePage from './pages/admin/AdminMoviePage';
import SignupPage from './pages/auth/SignupPage';
import ActivationPage from './pages/auth/ActivationPage';
import ActivationDonePage from './pages/auth/ActivationDonePage';
import SigninPage from './pages/auth/SigninPage';
import AddMoviePage from './pages/admin/AddMoviePage';
import ProfileLayout from './layouts/ProfileLayout';
import SettingPage from './pages/profile/SettingPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import OrderHistoryPage from './pages/profile/OrderHistoryPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth">
        <Route path="signup">
          <Route path="" element={<SignupPage />} />
          <Route path="activation" element={<ActivationPage />} />
          <Route path="verified" element={<ActivationDonePage />} />
        </Route>

        <Route path="signin" element={<SigninPage />} />
      </Route>
      <Route path="/movies" element={<HomeMoviePage />} />
      <Route path="/movies/details" element={<MovieDetailPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="movies" element={<AdminMoviePage />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="movies/add" element={<AddMoviePage />} />
      </Route>
      <Route path="/profile" element={<ProfileLayout />}>
        <Route path="setting" element={<SettingPage />} />
        <Route path="history" element={<OrderHistoryPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
