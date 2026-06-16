import { Navigate, Route, Routes, matchPath, useLocation } from "react-router";

import LandingPage from "./pages/LandingPage";
import HomeMoviePage from "./pages/HomeMoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import AdminMoviePage from "./pages/admin/AdminMoviePage";
import SignupPage from "./pages/auth/SignupPage";
import ActivationPage from "./pages/auth/ActivationPage";
import ActivationDonePage from "./pages/auth/ActivationDonePage";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AddMoviePage from "./pages/admin/AddMoviePage";
import AddCinemaPage from "./pages/admin/AddCinemaPage";
import ProfileLayout from "./layouts/ProfileLayout";
import SettingPage from "./pages/profile/SettingPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import OrderHistoryPage from "./pages/profile/OrderHistoryPage";
import SeatBookingPage from "./pages/SeatBookingPage";
import MoviePaymentPage from "./pages/MoviePaymentPage";
import MovieTicketResult from "./pages/MovieTicketResult";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import useAxiosAuthToken from "./hooks/useAxiosAuthToken";
import usePageTitle from "./hooks/usePageTitle";

const PAGE_TITLES = [
  { path: "/", title: "Home" },
  { path: "/auth/signup", title: "Sign Up" },
  { path: "/auth/signup/activation", title: "Activation" },
  { path: "/auth/signup/verified", title: "Activation Done" },
  { path: "/auth/signin", title: "Sign In" },
  { path: "/auth/forgot-password", title: "Forgot Password" },
  { path: "/auth/reset-password", title: "Reset Password" },
  { path: "/movies", title: "Movies" },
  { path: "/movies/:slug", title: "Movie Detail" },
  { path: "/orders/:orderId/booking", title: "Seat Booking" },
  { path: "/orders/:orderId/payment", title: "Payment" },
  { path: "/orders/:orderId/result", title: "Ticket Result" },
  { path: "/admin", title: "Admin Dashboard" },
  { path: "/admin/dashboard", title: "Admin Dashboard" },
  { path: "/admin/movies", title: "Admin Movies" },
  { path: "/admin/movies/add", title: "Add Movie" },
  { path: "/admin/movies/:id/cinema/add", title: "Add Cinema" },
  { path: "/admin/movies/:id/edit", title: "Edit Movie" },
  { path: "/admin/movies/:id/view", title: "View Movie" },
  { path: "/profile", title: "Profile Setting" },
  { path: "/profile/setting", title: "Profile Setting" },
  { path: "/profile/history", title: "Order History" },
];

function PageTitleUpdater() {
  const { pathname } = useLocation();
  const page = PAGE_TITLES.find(({ path }) =>
    matchPath({ path, end: true }, pathname),
  );

  usePageTitle(page?.title);

  return null;
}

function AppRouter() {
  useAxiosAuthToken();

  return (
    <>
      <PageTitleUpdater />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth">
          <Route path="signup">
            <Route path="" element={<SignupPage />} />
            <Route path="activation" element={<ActivationPage />} />
            <Route path="verified" element={<ActivationDonePage />} />
          </Route>
          <Route path="signin" element={<SigninPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="/movies" element={<HomeMoviePage />} />
        <Route path="/movies/:slug" element={<MovieDetailPage />} />
        <Route path="/orders/:orderId/booking" element={<SeatBookingPage />} />
        <Route path="/orders/:orderId/payment" element={<MoviePaymentPage />} />
        <Route path="/orders/:orderId/result" element={<MovieTicketResult />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="movies" element={<AdminMoviePage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="movies/add" element={<AddMoviePage />} />
          <Route path="movies/:id/cinema/add" element={<AddCinemaPage />} />
          <Route path="movies/:id/edit" element={<AddMoviePage />} />
          <Route path="movies/:id/view" element={<AddMoviePage viewOnly />} />
        </Route>
        <Route path="/profile" element={<ProfileLayout />}>
          <Route path="" element={<Navigate to="/profile/setting" replace />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="history" element={<OrderHistoryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
