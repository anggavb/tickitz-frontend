import { Route, Routes } from "react-router";

import PageHomeMovie from "@/pages/PageHomeMovie";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PageHomeMovie />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}

export default AppRouter;