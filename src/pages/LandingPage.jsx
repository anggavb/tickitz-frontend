import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import HeroSection from "../components/Home/HeroSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import MovieSection from "../components/Home/MovieSection";
import NewsletterSection from "../components/Home/NewsletterSection";

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
      genres: ["Action", "Adventure"],
      recommended: false,
      image:
        "https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    },
    {
      id: 2,
      title: "The Witches",
      genres: ["Comedy", "Adventure"],
      recommended: true,
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
    },
    {
      id: 3,
      title: "Tenet",
      genres: ["Action", "Sci-Fi"],
      recommended: true,
      image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    },
    {
      id: 4,
      title: "Spiderman",
      genres: ["Action", "Adventure"],
      recommended: false,
      image: "https://image.tmdb.org/t/p/w500/rweIrveL43TaxUN0akQEaAXL6x0.jpg",
    },
  ];

  const upcomingMovies = [
    {
      id: 1,
      title: "Black Widow",
      date: "December 2026",
      genres: ["Action", "Adventure"],
      image:
        "https://upload.wikimedia.org/wikipedia/en/e/e9/Black_Widow_%282021_film%29_poster.jpg",
    },
    {
      id: 2,
      title: "The Witches",
      date: "January 2027",
      genres: ["Comedy", "Adventure"],
      image: "https://upload.wikimedia.org/wikipedia/en/1/1a/Witches2020.jpg",
    },
    {
      id: 3,
      title: "Tenet",
      date: "June 2027",
      genres: ["Action", "Sci-Fi"],
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
    },
    {
      id: 4,
      title: "Spiderman",
      date: "March 2027",
      genres: ["Action", "Adventure"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/Spiderman.JPG",
    },
    {
      id: 5,
      title: "Spiderman2",
      date: "March 2027",
      genres: ["Action", "Adventure"],
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/Spiderman.JPG",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white text-neutral-900">
        <HeroSection images={featured} />

        <WhyChooseUs />

        <MovieSection
          label="Movie"
          title="Exciting Movies That Should Be Watched Today"
          movies={movies}
          showViewAll
          showArrows
        />

        <MovieSection
          label="Upcoming Movies"
          title="Exciting Movie Coming Soon"
          movies={upcomingMovies}
          variant="upcoming"
          showArrows
        />
        <NewsletterSection />
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
