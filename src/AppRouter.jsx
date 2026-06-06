import { Route, Routes } from "react-router";

import LandingPage from "@/pages/LandingPage";
import HomeMoviePage from "@/pages/HomeMoviePage";
import MovieDetailPage from "@/pages/MovieDetailPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movies" element={<HomeMoviePage />} />
      <Route path="/movies/details" element={<MovieDetailPage />} />
    </Routes>
  );
}

export default AppRouter;
