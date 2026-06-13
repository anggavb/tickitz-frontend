import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {useSelector} from 'react-redux';
import SweetAlert from "../../components/ui/SweetAlert";
import Toast from "../../components/ui/Toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function AddMoviePage({ viewOnly = false }) {
  const { token } = useSelector((state) => state.auth);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [durationHour, setDurationHour] = useState("");
  const [durationMinute, setDurationMinute] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [castInput, setCastInput] = useState("");
  const [casts, setCasts] = useState([]);
  const [availableCasts, setAvailableCasts] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const navigate = useNavigate();
  const { id } = useParams();
  const isViewMode = Boolean(id) && viewOnly;
  const isEditMode = Boolean(id) && !viewOnly;
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const [categoriesResponse, castsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/categories`),
          fetch(`${API_BASE_URL}/admin/casts`),
        ]);

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData?.success && Array.isArray(categoriesData.data)) {
            setAvailableCategories(categoriesData.data);
          }
        }

        if (castsResponse.ok) {
          const castsData = await castsResponse.json();
          if (castsData?.success && Array.isArray(castsData.data)) {
            setAvailableCasts(castsData.data);
          }
        }
      } catch (error) {
        console.error("Failed to load suggestions", error);
      }
    };

    fetchSuggestions();
  }, []);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!isEditMode && !isViewMode) return;
      const movieId = parseInt(id, 10);
      if (Number.isNaN(movieId)) return;

      setIsLoadingDetail(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/admin/movies/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load movie data");
        }

        const movie = data.data;
        setName(movie.name || "");
        setReleaseDate(movie.release_date || "");
        const totalDuration = movie.duration_in_minute || 0;
        setDurationHour(String(Math.floor(totalDuration / 60)));
        setDurationMinute(String(totalDuration % 60));
        setDirectorName(movie.director_name || "");
        setSynopsis(movie.synopsis || "");
        setCategories(Array.isArray(movie.categories) ? movie.categories : []);
        setCasts(Array.isArray(movie.casts) ? movie.casts : []);
        setExistingImageUrl(movie.image ? `${API_BASE_URL}${movie.image}` : "");
      } catch (error) {
        console.error(error);
        setToastType("error");
        setToastMessage("Failed to load movie data.");
      } finally {
        setIsLoadingDetail(false);
      }
    };

    fetchMovieDetail();
  }, [id, isEditMode, isViewMode,token]);

  if ((isEditMode || isViewMode) && isLoadingDetail) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading movie data...</p>
      </main>
    );
  }

  const handleImageChange = (event) => {
    if (viewOnly) return;
    const file = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const addCategory = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (categories.some((item) => item.toLowerCase() === trimmed.toLowerCase()))
      return;
    setCategories((prev) => [...prev, trimmed]);
  };

  const addCast = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (casts.some((item) => item.toLowerCase() === trimmed.toLowerCase()))
      return;
    setCasts((prev) => [...prev, trimmed]);
  };

  const handleCategoryKeyDown = (event) => {
    if (viewOnly) return;
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addCategory(categoryInput.replace(/,$/, ""));
      setCategoryInput("");
    }
  };

  const handleCastKeyDown = (event) => {
    if (viewOnly) return;
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addCast(castInput.replace(/,$/, ""));
      setCastInput("");
    }
  };

  // const removeCategory = (value) => {
  //   setCategories((prev) => prev.filter((item) => item !== value));
  // };

  // const removeCast = (value) => {
  //   setCasts((prev) => prev.filter((item) => item !== value));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToastMessage("");

    if (viewOnly) return;

    const hours = parseInt(durationHour || "0", 10);
    const minutes = parseInt(durationMinute || "0", 10);
    const totalDuration = hours * 60 + minutes;

    if (!name || !releaseDate || totalDuration <= 0) {
      setToastType("error");
      setToastMessage(
        "Please fill in the movie name, release date, and duration.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("release_date", releaseDate);
    formData.append("duration_in_minute", String(totalDuration));
    formData.append("director_name", directorName);
    formData.append("synopsis", synopsis);

    if (image) {
      formData.append("image", image);
    }

    categories.forEach((category) => {
      formData.append("categories", category);
    });
    casts.forEach((cast) => {
      formData.append("cast", cast);
    });

    try {
      const movieId = id ? parseInt(id, 10) : null;
      const response = await fetch(
        isEditMode
          ? `${API_BASE_URL}/admin/movies/${movieId}`
          : `${API_BASE_URL}/admin/movies`,
        {
          method: isEditMode ? "PATCH" : "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        if (isEditMode) {
          await SweetAlert.success({
            title: "Success",
            text: "Movie updated successfully.",
          });

          navigate("/admin/movies");
          return;
        }

        setToastType("success");
        setToastMessage("Movie saved successfully.");

        setName("");
        setReleaseDate("");
        setDurationHour("");
        setDurationMinute("");
        setDirectorName("");
        setSynopsis("");
        setCategoryInput("");
        setCategories([]);
        setCastInput("");
        setCasts([]);
        setImage(null);
        setExistingImageUrl("");
      } else {
        setToastType("error");
        setToastMessage(data.message || "Failed to save movie.");
      }
    } catch (error) {
      console.error(error);
      setToastType("error");
      setToastMessage("Failed to save movie.");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-100 p-4 md:p-8">
        <section className="mx-auto max-w-3xl bg-white p-6 md:p-8">
          <h1 className="mb-8 text-2xl font-semibold text-slate-800">
            {isViewMode
              ? `View (${name || "Movie"})`
              : isEditMode
                ? `Edit (${name || "Movie"})`
                : "Add New Movie"}
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Upload */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_140px] lg:items-center">
              <div>
                <label className="mb-2 block text-sm text-slate-500">
                  Upload Image
                </label>

                <input
                  id="movie-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={viewOnly}
                />

                {!viewOnly && (
                  <label
                    htmlFor="movie-image"
                    className="inline-block cursor-pointer rounded-md bg-primary px-4 py-2 text-xs text-white"
                  >
                    Upload
                  </label>
                )}

                {image && (
                  <p className="mt-2 text-sm text-slate-500">
                    Selected: {image.name}
                  </p>
                )}
              </div>

              {existingImageUrl && !image && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center">
                  <p className="mb-2 text-sm text-slate-500">Current image</p>
                  <img
                    src={existingImageUrl}
                    alt="Current movie thumbnail"
                    className="mx-auto h-32 w-32 rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            {/* Movie Name */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">
                Movie Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Spider-Man: Homecoming"
                readOnly={viewOnly}
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">
                Category
              </label>

              <input
                list="category-list"
                type="text"
                value={categoryInput}
                onChange={(event) => setCategoryInput(event.target.value)}
                onKeyDown={handleCategoryKeyDown}
                onBlur={() => {
                  if (!viewOnly && categoryInput.trim()) {
                    addCategory(categoryInput);
                    setCategoryInput("");
                  }
                }}
                placeholder="Type and press Enter to add category"
                readOnly={viewOnly}
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
              <datalist id="category-list">
                {availableCategories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>

              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Release Date + Duration */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-500">
                  Release Date
                </label>

                <input
                  type="date"
                  value={releaseDate}
                  onChange={(event) => setReleaseDate(event.target.value)}
                  className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500">
                  Duration (hours / minutes)
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="0"
                    value={durationHour}
                    onChange={(event) => setDurationHour(event.target.value)}
                    placeholder="2"
                    readOnly={viewOnly}
                    className="rounded-md border border-slate-200 px-4 py-3 text-center outline-none focus:border-primary"
                  />

                  <input
                    type="number"
                    min="0"
                    value={durationMinute}
                    onChange={(event) => setDurationMinute(event.target.value)}
                    placeholder="13"
                    readOnly={viewOnly}
                    className="rounded-md border border-slate-200 px-4 py-3 text-center outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Director */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">
                Director Name
              </label>

              <input
                type="text"
                value={directorName}
                onChange={(event) => setDirectorName(event.target.value)}
                placeholder="Jon Watts"
                readOnly={viewOnly}
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Cast */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Cast</label>

              <input
                list="cast-list"
                type="text"
                value={castInput}
                onChange={(event) => setCastInput(event.target.value)}
                onKeyDown={handleCastKeyDown}
                onBlur={() => {
                  if (!viewOnly && castInput.trim()) {
                    addCast(castInput);
                    setCastInput("");
                  }
                }}
                placeholder="Type and press Enter to add cast"
                readOnly={viewOnly}
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
              <datalist id="cast-list">
                {availableCasts.map((cast) => (
                  <option key={cast} value={cast} />
                ))}
              </datalist>

              <div className="mt-3 flex flex-wrap gap-2">
                {casts.map((cast) => (
                  <span
                    key={cast}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    {cast}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">
                Synopsis
              </label>

              <textarea
                rows={5}
                value={synopsis}
                onChange={(event) => setSynopsis(event.target.value)}
                placeholder="Thrilled by his experience with the Avengers..."
                readOnly={viewOnly}
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Submit */}
            {viewOnly ? (
              <button
                type="button"
                onClick={() => navigate("/admin/movies")}
                className="w-full rounded-md bg-slate-700 py-3 font-medium text-white shadow-md transition hover:opacity-90"
              >
                Back to list
              </button>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-primary py-3 font-medium text-white shadow-md transition hover:opacity-90"
              >
                {isEditMode ? "Update Movie" : "Save Movie"}
              </button>
            )}
          </form>
        </section>
      </main>

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />
    </>
  );
}

export default AddMoviePage;
