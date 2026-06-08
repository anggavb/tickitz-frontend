import { Route, Routes } from "react-router";

import LandingPage from "./pages/LandingPage";
import HomeMoviePage from "./pages/HomeMoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import AdminMoviePage from "./pages/AdminMoviePage";
import AddMoviePage from "./pages/AddMoviePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movies" element={<HomeMoviePage />} />
      <Route path="/movies/details" element={<MovieDetailPage />} />
      <Route path="/admin/movies" element={<AdminMoviePage />} />
      <Route path="/admin/movies/add" element={<AddMoviePage />} />
    </Routes>
  );
}

export default AppRouter;
