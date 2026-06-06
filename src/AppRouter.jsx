import { Route, Routes } from 'react-router';

import LandingPage from '@/pages/LandingPage';
import HomeMoviePage from '@/pages/HomeMoviePage';
import SignupPage from './pages/auth/SignupPage';
import ActivationPage from './pages/auth/ActivationPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth">
        <Route path="signup" element={<SignupPage />} />
        <Route path="activation" element={<ActivationPage />} />
      </Route>
      <Route path="/movies" element={<HomeMoviePage />} />
    </Routes>
  );
}

export default AppRouter;
