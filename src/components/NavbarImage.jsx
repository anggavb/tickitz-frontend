import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import searchIcon from "../assets/images/search1.png";
import { logoutUser } from "../redux/slice/authSlice";
import logoutIcon from "../assets/images/logout.png";
import SweetAlert from "@/components/ui/SweetAlert";
import { getProfile } from "../redux/slice/profileSlice";
import { FourSquare } from "react-loading-indicators";
import {
  DEFAULT_PROFILE_PHOTO,
  getProfilePhotoSrc,
} from "@/utils/profilePhoto";

function NavbarImage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { dataProfile } = useSelector((state) => state.profile);
  const imageUrl = getProfilePhotoSrc(dataProfile?.photo || user?.photo);

  useEffect(() => {
    if (!dataProfile) {
      dispatch(getProfile());
    }
  }, [dataProfile, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const confirmed = await SweetAlert.confirm({
        title: "Logout",
        text: "Are you sure you want to logout?",
        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",
        reverseButtons: false,
      });

      if (!confirmed) return;

      await dispatch(logoutUser()).unwrap();
      setIsDropdownOpen(false);
      SweetAlert.success({
        title: "Logged out",
        text: "You have been logged out.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      SweetAlert.error({ text: "Failed to logout. Please try again." });
    }
  };

  {
    loading && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <FourSquare color={["#bb2d00", "#ee3900", "#ff5722", "#ff7e55"]} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 md:gap-5">
      <button type="button">
        <img src={searchIcon} alt="Search" className="h-5 w-5" />
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={imageUrl}
            alt="Profile"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = DEFAULT_PROFILE_PHOTO;
            }}
            className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
            <Link
              to="/profile"
              className={
                user?.role === "user"
                  ? "block px-4 py-3 text-left text-gray-700 hover:bg-gray-100"
                  : "hidden"
              }
            >
              Profile
            </Link>
            <Link
              to="/admin/dashboard"
              className={
                user?.role === "admin"
                  ? "block px-4 py-3 text-left text-gray-700 hover:bg-gray-100"
                  : "hidden"
              }
            >
              Admin Dashboard
            </Link>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center gap-2 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <img src={logoutIcon} alt="Logout" className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarImage;
