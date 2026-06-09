import { useEffect, useState } from 'react';
import Toast from '../../components/ui/Toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

function AddMoviePage() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [durationHour, setDurationHour] = useState('');
  const [durationMinute, setDurationMinute] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [castInput, setCastInput] = useState('');
  const [casts, setCasts] = useState([]);
  const [availableCasts, setAvailableCasts] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

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
        console.error('Failed to load suggestions', error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const addCategory = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (categories.some((item) => item.toLowerCase() === trimmed.toLowerCase())) return;
    setCategories((prev) => [...prev, trimmed]);
  };

  const addCast = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (casts.some((item) => item.toLowerCase() === trimmed.toLowerCase())) return;
    setCasts((prev) => [...prev, trimmed]);
  };

  const handleCategoryKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addCategory(categoryInput.replace(/,$/, ''));
      setCategoryInput('');
    }
  };

  const handleCastKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addCast(castInput.replace(/,$/, ''));
      setCastInput('');
    }
  };

  const removeCategory = (value) => {
    setCategories((prev) => prev.filter((item) => item !== value));
  };

  const removeCast = (value) => {
    setCasts((prev) => prev.filter((item) => item !== value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToastMessage('');

    const hours = parseInt(durationHour || '0', 10);
    const minutes = parseInt(durationMinute || '0', 10);
    const totalDuration = hours * 60 + minutes;

    if (!name || !releaseDate || totalDuration <= 0) {
      setToastType('error');
      setToastMessage('Please fill in the movie name, release date, and duration.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('release_date', releaseDate);
    formData.append('duration_in_minute', String(totalDuration));
    formData.append('director_name', directorName);
    formData.append('synopsis', synopsis);

    if (image) {
      formData.append('image', image);
    }

    categories.forEach((category) => {
      formData.append('categories', category);
    });
    casts.forEach((cast) => {
      formData.append('cast', cast);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/admin/movies`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToastType('success');
        setToastMessage('Movie saved successfully.');
        setName('');
        setReleaseDate('');
        setDurationHour('');
        setDurationMinute('');
        setDirectorName('');
        setSynopsis('');
        setCategoryInput('');
        setCategories([]);
        setCastInput('');
        setCasts([]);
        setImage(null);
      } else {
        setToastType('error');
        setToastMessage(data.message || 'Failed to save movie.');
      }
    } catch (error) {
      console.error(error);
      setToastType('error');
      setToastMessage('Failed to save movie.');
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-100 p-4 md:p-8">
        <section className="mx-auto max-w-3xl bg-white p-6 md:p-8">
          <h1 className="mb-8 text-2xl font-semibold text-slate-800">Add New Movie</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Upload */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Upload Image</label>

              <input id="movie-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

              <label htmlFor="movie-image" className="inline-block cursor-pointer rounded-md bg-primary px-4 py-2 text-xs text-white">
                Upload
              </label>

              {image && <p className="mt-2 text-sm text-slate-500">Selected: {image.name}</p>}
            </div>

            {/* Movie Name */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Movie Name</label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Spider-Man: Homecoming"
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Category</label>

              <input
                list="category-list"
                type="text"
                value={categoryInput}
                onChange={(event) => setCategoryInput(event.target.value)}
                onKeyDown={handleCategoryKeyDown}
                onBlur={() => {
                  if (categoryInput.trim()) {
                    addCategory(categoryInput);
                    setCategoryInput('');
                  }
                }}
                placeholder="Type and press Enter to add category"
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
              <datalist id="category-list">
                {availableCategories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>

              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200"
                  >
                    {category} ×
                  </button>
                ))}
              </div>
            </div>

            {/* Release Date + Duration */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-500">Release Date</label>

                <input
                  type="date"
                  value={releaseDate}
                  onChange={(event) => setReleaseDate(event.target.value)}
                  className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500">Duration (hours / minutes)</label>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="0"
                    value={durationHour}
                    onChange={(event) => setDurationHour(event.target.value)}
                    placeholder="2"
                    className="rounded-md border border-slate-200 px-4 py-3 text-center outline-none focus:border-primary"
                  />

                  <input
                    type="number"
                    min="0"
                    value={durationMinute}
                    onChange={(event) => setDurationMinute(event.target.value)}
                    placeholder="13"
                    className="rounded-md border border-slate-200 px-4 py-3 text-center outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Director */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Director Name</label>

              <input
                type="text"
                value={directorName}
                onChange={(event) => setDirectorName(event.target.value)}
                placeholder="Jon Watts"
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
                  if (castInput.trim()) {
                    addCast(castInput);
                    setCastInput('');
                  }
                }}
                placeholder="Type and press Enter to add cast"
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
              <datalist id="cast-list">
                {availableCasts.map((cast) => (
                  <option key={cast} value={cast} />
                ))}
              </datalist>

              <div className="mt-3 flex flex-wrap gap-2">
                {casts.map((cast) => (
                  <button
                    key={cast}
                    type="button"
                    onClick={() => removeCast(cast)}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200"
                  >
                    {cast} ×
                  </button>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Synopsis</label>

              <textarea
                rows={5}
                value={synopsis}
                onChange={(event) => setSynopsis(event.target.value)}
                placeholder="Thrilled by his experience with the Avengers..."
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full rounded-md bg-primary py-3 font-medium text-white shadow-md transition hover:opacity-90">
              Save Movie
            </button>
          </form>
        </section>
      </main>

      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
    </>
  );
}

export default AddMoviePage;