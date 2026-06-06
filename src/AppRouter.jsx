import { Route, Routes } from "react-router";

import LandingPage from "./pages/LandingPage";
import HomeMoviePage from "./pages/HomeMoviePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movies" element={<HomeMoviePage />} />
    </Routes>
  );
}

export default AppRouter;
