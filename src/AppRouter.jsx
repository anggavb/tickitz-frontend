import { Route, Routes } from "react-router";

import LandingPage from "@/pages/LandingPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}

export default AppRouter;
