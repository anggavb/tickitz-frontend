import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import eyeIcon from '../../assets/images/eye.png';
import editIcon from '../../assets/images/edit.png';
import deleteIcon from '../../assets/images/delete.png';
import calendarIcon from '../../assets/images/calendar.png';
import arrowDownIcon from '../../assets/images/arrow-down.png';
import cinema from '../../assets/images/cinema.png';

import ProfileNavbar from '../../components/ProfileNavbar';
import SweetAlert from '../../components/ui/SweetAlert';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PAGE_LIMIT = 5;

function AdminMoviePage() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [releaseMonths, setReleaseMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMovies = useCallback(async (pageNumber = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        page: String(pageNumber),
        limit: String(PAGE_LIMIT),
      });
      if (selectedMonth) {
        query.set('month', selectedMonth);
      }

      const response = await fetch(`${API_BASE_URL}/admin/movies?${query.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to load movies');
      }

      setMovies(
        result.data.map((movie) => ({
          id: movie.id,
          thumbnail: movie.image ? `${API_BASE_URL}${movie.image}` : '',
          name: movie.name,
          category: movie.categories?.join(', ') || '',
          date: movie.release_date,
          duration: `${movie.duration_in_minute} minute`,
        })),
      );

      setPage(result.pagination?.page || pageNumber);
      setTotalPages(result.pagination?.total_page || 1);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, token]);

  useEffect(() => {
    const loadMovies = async () => {
      await fetchMovies(page);
    };

    loadMovies();
  }, [fetchMovies, page]);

  const gotoPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== page) {
      setPage(pageNumber);
    }
  };

  const formatMonthLabel = (monthValue) => {
    if (!monthValue) {
      return 'All Months';
    }

    const [year, month] = monthValue.split('-');
    if (!year || !month) {
      return monthValue;
    }

    return new Date(Date.UTC(Number(year), Number(month) - 1, 1)).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchReleaseMonths = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/movies/months`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to load release months');
        }

        setReleaseMonths(Array.isArray(result.data) ? result.data : []);
      } catch (fetchError) {
        console.error(fetchError);
      }
    };

    fetchReleaseMonths();
  }, [token]);

  const handleDeleteMovie = async (movieId, movieName) => {
    const confirmed = await SweetAlert.confirm({
      title: 'Confirm Delete',
      text: `Are you sure you want to delete "${movieName}"? This action cannot be undone.`,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete movie');
      }

      await SweetAlert.success({
        title: 'Deleted',
        text: 'Movie deleted successfully.',
      });

      // Refresh page content after delete
      await fetchMovies(page);
    } catch (deleteError) {
      await SweetAlert.error({
        title: 'Delete Failed',
        text: deleteError.message || 'Failed to delete movie.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 sm:py-15">
        <section className="mx-auto rounded-2xl bg-white p-4 shadow-sm sm:max-w-305 sm:rounded-3xl sm:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold text-slate-800 sm:text-3xl">List Movie</h1>

            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMonthDropdown((prev) => !prev)}
                  className="flex items-center justify-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-600"
                >
                  <img src={calendarIcon} alt="Calendar" className="h-4 w-4" />

                  <span>{formatMonthLabel(selectedMonth)}</span>

                  <img src={arrowDownIcon} alt="Dropdown" className="ml-8 h-3 w-3" />
                </button>

                {showMonthDropdown && (
                  <div className="absolute left-0 z-10 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMonth('');
                        setPage(1);
                        setShowMonthDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      All Months
                    </button>
                    {releaseMonths.map((month) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => {
                          setSelectedMonth(month);
                          setPage(1);
                          setShowMonthDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        {formatMonthLabel(month)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => navigate('/admin/movies/add')}
                className="cursor-pointer rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Add Movies
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-10 text-center text-slate-600">Loading movies...</div>
            ) : error ? (
              <div className="p-10 text-center text-red-600">{error}</div>
            ) : (
              <table className="min-w-225 w-full text-center text-sm">
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
                    <tr key={movie.id} className="border-b border-slate-100 text-slate-700">
                      <td className="py-4">{(page - 1) * PAGE_LIMIT + index + 1}</td>

                      <td className="py-4">
                        <div className="flex justify-center">
                          <img src={movie.thumbnail} alt={movie.name} className="h-10 w-10 rounded-md object-cover" />
                        </div>
                      </td>

                      <td className="py-4 text-primary">{movie.name}</td>
                      <td className="py-4">{movie.category}</td>
                      <td className="py-4">{movie.date}</td>
                      <td className="py-4">{movie.duration}</td>

                      <td className="py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/movies/${movie.id}/cinema/add`)}
                            className="hover:opacity-70 transition"
                          >
                            <img src={cinema} alt="Cinema" className="h-7 w-7" />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/movies/${movie.id}/view`)}
                            className="hover:opacity-70 transition"
                          >
                            <img src={eyeIcon} alt="View" className="h-7 w-7" />
                          </button>

                          <button
                            type="button"
                            onClick={() => navigate(`/admin/movies/${movie.id}/edit`)}
                            className="hover:opacity-70 transition"
                          >
                            <img src={editIcon} alt="Edit" className="h-7 w-7" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteMovie(movie.id, movie.name)}
                            disabled={isDeleting}
                            className="hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            <img src={deleteIcon} alt="Delete" className="h-7 w-7" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
            <button
              type="button"
              onClick={() => gotoPage(page - 1)}
              disabled={page <= 1}
              className={`h-8 min-w-12 rounded-lg px-3 text-xs sm:h-10 sm:text-sm ${
                page <= 1
                  ? 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-300'
                  : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => gotoPage(pageNumber)}
                className={`h-8 min-w-12 rounded-lg px-3 text-xs sm:h-10 sm:text-sm ${
                  pageNumber === page ? 'bg-primary text-white shadow-md' : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={() => gotoPage(page + 1)}
              disabled={page >= totalPages}
              className={`h-8 min-w-12 rounded-lg px-3 text-xs sm:h-10 sm:text-sm ${
                page >= totalPages
                  ? 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-300'
                  : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminMoviePage;