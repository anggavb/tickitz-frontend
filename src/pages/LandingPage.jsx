import HeroSection from "../components/Home/HeroSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import MovieSection from "../components/Home/MovieSection";
import UpcomingMovieSection from "../components/Home/UpcomingMovieSection";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function LandingPage() {
  const featured = [
    "https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
    "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    "https://image.tmdb.org/t/p/w500/rweIrveL43TaxUN0akQEaAXL6x0.jpg",
  ];

  const movies = [
    {
      id: 1,
      title: "Black Widow",
      genre: "Action, Adventure",
      recommended: false,
      poster:
        "https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    },
    {
      id: 2,
      title: "The Witches",
      genre: "Comedy, Adventure",
      recommended: true,
      poster:
        "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
    },
    {
      id: 3,
      title: "Tenet",
      genre: "Action, Sci-Fi",
      recommended: true,
      poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    },
    {
      id: 4,
      title: "Spiderman",
      genre: "Action, Adventure",
      recommended: false,
      poster: "https://image.tmdb.org/t/p/w500/rweIrveL43TaxUN0akQEaAXL6x0.jpg",
    },
  ];

  const upcomingMovies = [
    {
      id: 1,
      title: "Black Widow",
      date: "December 2026",
      genre: "Action, Adventure",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/e/e9/Black_Widow_%282021_film%29_poster.jpg",
    },
    {
      id: 2,
      title: "The Witches",
      date: "January 2027",
      genre: "Comedy, Adventure",
      poster: "https://upload.wikimedia.org/wikipedia/en/1/1a/Witches2020.jpg",
    },
    {
      id: 3,
      title: "Tenet",
      date: "June 2027",
      genre: "Action, Sci-Fi",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
    },
    {
      id: 4,
      title: "Spiderman",
      date: "March 2027",
      genre: "Action, Adventure",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/Spiderman.JPG",
    },
    {
      id: 5,
      title: "Spiderman 2",
      date: "March 2027",
      genre: "Action, Adventure",
      poster:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/Spiderman.JPG",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="min-h-screen overflow-hidden bg-white text-neutral-900">
        <HeroSection images={featured} />

        <WhyChooseUs />

        <MovieSection
          label="Movie"
          title="Exciting Movies That Should Be Watched Today"
          movies={movies}
        />

        <UpcomingMovieSection
          label="Upcoming Movies"
          title="Exciting Movie Coming Soon"
          movies={upcomingMovies}
        />
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default LandingPage;
