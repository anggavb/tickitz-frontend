import { movies } from "../data/adminMovieData";

import eyeIcon from "../assets/images/eye.png";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/delete.png";
import calendarIcon from "../assets/images/calendar.png";
import arrowDownIcon from "../assets/images/arrow-down.png";

import AdminNavbar from "../components/AdminNavbar";

function AdminMoviePage() {
  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 sm:py-15">
        <section className="mx-auto rounded-2xl bg-white p-4 shadow-sm sm:max-w-305 sm:rounded-3xl sm:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold text-slate-800 sm:text-3xl">
              List Movie
            </h1>

            <div className="flex flex-col gap-6 sm:flex-row">
              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600"
              >
                <img src={calendarIcon} alt="Calendar" className="h-4 w-4" />

                <span>November 2023</span>

                <img
                  src={arrowDownIcon}
                  alt="Dropdown"
                  className="ml-8 h-3 w-3"
                />
              </button>

              <button
                type="button"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white"
              >
                Add Movies
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-center text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-medium text-slate-500">
                  <th className="pb-5">No</th>
                  <th className="pb-5">Thumbnail</th>
                  <th className="pb-5">Movie Name</th>
                  <th className="pb-5">Category</th>
                  <th className="pb-5">Released Date</th>
                  <th className="pb-5">Duration</th>
                  <th className="pb-5">Action</th>
                </tr>
              </thead>

              <tbody>
                {movies.map((movie, index) => (
                  <tr
                    key={movie.id}
                    className="border-b border-slate-100 text-slate-700"
                  >
                    <td className="py-4">{index + 1}</td>

                    <td className="py-4">
                      <div className="flex justify-center">
                        <img
                          src={movie.thumbnail}
                          alt={movie.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </div>
                    </td>

                    <td className="py-4 text-primary">{movie.name}</td>

                    <td className="py-4">{movie.category}</td>

                    <td className="py-4">{movie.date}</td>

                    <td className="py-4">{movie.duration}</td>

                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button type="button">
                          <img src={eyeIcon} alt="View" className="h-7 w-7" />
                        </button>

                        <button type="button">
                          <img src={editIcon} alt="Edit" className="h-7 w-7" />
                        </button>

                        <button type="button">
                          <img
                            src={deleteIcon}
                            alt="Delete"
                            className="h-7 w-7"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2 sm:mt-10">
            <button
              type="button"
              className="h-8 w-8 rounded-lg bg-primary text-xs text-white shadow-md sm:h-10 sm:w-10 sm:text-sm"
            >
              1
            </button>

            <button
              type="button"
              className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-xs text-slate-500 sm:h-10 sm:w-10 sm:text-sm"
            >
              2
            </button>

            <button
              type="button"
              className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-xs text-slate-500 sm:h-10 sm:w-10 sm:text-sm"
            >
              3
            </button>

            <button
              type="button"
              className="h-8 w-8 rounded-lg border border-slate-200 bg-white text-xs text-slate-500 sm:h-10 sm:w-10 sm:text-sm"
            >
              4
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminMoviePage;