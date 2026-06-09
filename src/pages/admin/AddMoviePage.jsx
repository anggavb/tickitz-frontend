import { useState } from 'react';
import ProfileNavbar from '../../components/ProfileNavbar';

function AddMoviePage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <ProfileNavbar role="admin" />

      <main className="min-h-screen bg-slate-100 p-4 md:p-8">
        <section className="mx-auto max-w-3xl bg-white p-6 md:p-8">
          <h1 className="mb-8 text-2xl font-semibold text-slate-800">Add New Movie</h1>

          <form className="space-y-6">
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
                placeholder="Spider-Man: Homecoming"
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Category</label>

              <input
                type="text"
                placeholder="Action, Adventure, Sci-Fi"
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Release Date + Duration */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-500">Release Date</label>

                <input type="date" className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary" />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-500">Duration (hour / minute)</label>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="2"
                    className="rounded-md border border-slate-200 px-4 py-3 text-center outline-none focus:border-primary"
                  />

                  <input
                    type="number"
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
                placeholder="Jon Watts"
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Cast */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Cast</label>

              <input
                type="text"
                placeholder="Tom Holland, Michael Keaton, Robert Downey Jr."
                className="w-full rounded-md border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Synopsis */}
            <div>
              <label className="mb-2 block text-sm text-slate-500">Synopsis</label>

              <textarea
                rows={5}
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
    </>
  );
}

export default AddMoviePage;
