import { Route, Routes } from "react-router";

import LandingPage from "./pages/LandingPage";
import HomeMoviePage from "./pages/HomeMoviePage";
import AdminMoviePage from "./pages/AdminMoviePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movies" element={<HomeMoviePage />} />
      <Route path="/admin/movies" element={<AdminMoviePage />} />
    </Routes>
  );
}

export default AppRouter;
