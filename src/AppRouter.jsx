import { Route, Routes } from "react-router";

import HomeMoviePage from "@/pages/HomeMoviePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeMoviePage />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}

export default AppRouter;