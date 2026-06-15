import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProfileEdit } from "../../context/profileEditContext";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/slice/profileSlice";
import { changePassword, logout } from "../../redux/slice/authSlice";
import { FourSquare } from "react-loading-indicators";
import { useNavigate } from "react-router";

function SettingPage() {
  const {
    showEditModal,
    setShowEditModal,
    isEditing,
    setIsEditing,
    selectedPhoto,
    setSelectedPhoto,
    setPreviewPhoto,
  } = useProfileEdit();
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataProfile: user, loadingProfile } = useSelector(
    (state) => state.profile,
  );

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
  }, [dispatch, user]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.first_name ?? "",
      lastName: user.last_name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      password: "",
      confirmPassword: "",
    });
  }, [user, reset]);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const handleCancel = () => {
    reset({
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: "",
      confirmPassword: "",
    });

    setSelectedPhoto(null);
    setPreviewPhoto(null);

    setIsEditing(false);
    setShowEditModal(false);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

      if (data.password) {
        formData.append("password", data.password);
      }

      if (selectedPhoto) {
        formData.append("photo", selectedPhoto);
      }

      await dispatch(updateProfile(formData)).unwrap();

      await dispatch(getProfile());

      setSelectedPhoto(null);
      setPreviewPhoto(null);

      setIsEditing(false);
      setShowEditModal(false);
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  const renderFields = () => (
    <>
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-slate-700 mb-6">
          Details Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-slate-500">First Name</label>

            <input
              disabled={!isEditing}
              className="w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500"
              {...register("firstName")}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Last Name</label>

            <input
              disabled={!isEditing}
              className="w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500"
              {...register("lastName")}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">E-mail</label>

            <input
              type="email"
              disabled={true}
              className={`w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Format email tidak valid",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-slate-500">Phone Number</label>

            <div className="mt-2 flex items-center border rounded-xl h-[54px] px-4 bg-white">
              <span className="text-slate-600 text-lg pr-5">+62</span>

              <div className="w-px h-8 bg-slate-300" />

              <input
                type="text"
                disabled={!isEditing}
                className="flex-1 ml-5 outline-none bg-transparent disabled:text-slate-500"
                {...register("phone")}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer bg-primary text-white px-8 py-3 mt-3 rounded-xl hover:bg-orange-600 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer bg-red-600 text-white px-8 py-3 mt-3 rounded-xl hover:bg-red-700 transition"
              >
                Cancel Edit
              </button>

              <button
                type="submit"
                className="cursor-pointer bg-blue-600 mt-3 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Update Profile
              </button>
            </>
          )}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-slate-700 mb-6">
          Account and Privacy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-slate-500">New Password</label>

            <input
              type="password"
              disabled={!isPasswordEditing}
              placeholder="Write your password"
              className={`w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 ${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                validate: (v) =>
                  !v || v.length >= 8 || "Password minimal 8 karakter",
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-slate-500">Confirm Password</label>

            <input
              type="password"
              disabled={!isPasswordEditing}
              placeholder="Confirm your password"
              className={`w-full border rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 ${errors.confirmPassword ? "border-red-500" : ""}`}
              {...register("confirmPassword", {
                validate: (v) => {
                  if (password && !v) return "Confirm password must be filled";

                  if (!password && v) return "Password must be filled";

                  if (password && v && password !== v)
                    return "New password and confirm password not match";

                  return true;
                },
              })}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          {!isPasswordEditing ? (
            <button
              type="button"
              onClick={() => setIsPasswordEditing(true)}
              className="cursor-pointer bg-primary text-white px-6 py-2 mt-3 text-sm rounded-xl"
            >
              Change Password
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  reset({
                    ...watch(),
                    password: "",
                    confirmPassword: "",
                  });

                  setIsPasswordEditing(false);
                }}
                className="cursor-pointer bg-red-600 text-white text-sm px-6 py-2 mt-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={async () => {
                  const valid = await trigger(["password", "confirmPassword"]);
                  if (!valid) return;

                  if (!password) return;

                  await dispatch(
                    changePassword({
                      new_password: password,
                    }),
                  ).unwrap();
                  console.log("before logout");
                  dispatch(logout());
                  console.log("after logout");

                  navigate("/auth/signin");

                  setIsPasswordEditing(false);
                }}
                className="cursor-pointer bg-blue-600 text-white text-sm px-6 py-2 mt-3 rounded-xl"
              >
                Update Password
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );

  if (loadingProfile) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <FourSquare color={["#bb2d00", "#ee3900", "#ff5722", "#ff7e55"]} />
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hidden md:flex flex-col space-y-6"
      >
        {renderFields(false)}
      </form>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 py-6 overflow-y-auto md:hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg space-y-6 pb-6"
          >
            {renderFields(true)}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default SettingPage;
