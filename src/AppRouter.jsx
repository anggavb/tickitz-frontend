import { Route, Routes } from 'react-router';

import LandingPage from './pages/LandingPage';
import HomeMoviePage from './pages/HomeMoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import AdminMoviePage from './pages/AdminMoviePage';
import SignupPage from './pages/auth/SignupPage';
import ActivationPage from './pages/auth/ActivationPage';
import ActivationDonePage from './pages/auth/ActivationDonePage';
import SigninPage from './pages/auth/SigninPage';
import AddMoviePage from "./pages/AddMoviePage";

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
      <Route path="/admin/movies" element={<AdminMoviePage />} />
      <Route path="/admin/movies/add" element={<AddMoviePage />} />
    </Routes>
  );
}

export default AppRouter;
