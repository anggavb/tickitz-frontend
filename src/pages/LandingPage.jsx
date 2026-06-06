import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import HeroSection from "../components/Home/HeroSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import MovieSection from "../components/Home/MovieSection";
import NewsletterSection from "../components/Home/NewsletterSection";

function LandingPage() {
  const movies = [
    {
      id: 1,
      title: "Black Widow",
      genres: ["Action", "Adventure"],
      recommended: false,
    },
    {
      id: 2,
      title: "The Witches",
      genres: ["Comedy", "Adventure"],
      recommended: true,
    },
    {
      id: 3,
      title: "Tenet",
      genres: ["Action", "Sci-Fi"],
      recommended: true,
    },
    {
      id: 4,
      title: "Spiderman",
      genres: ["Action", "Adventure"],
      recommended: false,
    },
  ];

  const upcomingMovies = [
    {
      id: 1,
      title: "Black Widow",
      date: "December 2024",
      genres: ["Action", "Adventure"],
    },
    {
      id: 2,
      title: "The Witches",
      date: "January 2024",
      genres: ["Comedy", "Adventure"],
    },
    {
      id: 3,
      title: "Tenet",
      date: "June 2024",
      genres: ["Action", "Sci-Fi"],
    },
    {
      id: 4,
      title: "Spiderman",
      date: "March 2024",
      genres: ["Action", "Adventure"],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white text-neutral-900">
        <HeroSection />

        <WhyChooseUs />

        <MovieSection
          label="Movies"
          title="Exciting Movies That Should Be Watched Today"
          movies={movies}
          variant="center"
          showViewAll
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
