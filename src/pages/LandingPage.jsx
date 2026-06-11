import HeroSection from "../components/Home/HeroSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import MovieSection from "../components/Home/MovieSection";
import UpcomingMovieSection from "../components/Home/UpcomingMovieSection";
import Newsletter from "../components/Newsletter";
import HomeLayout from "../layouts/HomeLayout";

function LandingPage() {
  const featured = [
    "https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
    "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    "https://image.tmdb.org/t/p/w500/rweIrveL43TaxUN0akQEaAXL6x0.jpg",
  ];

  return (
    <HomeLayout>
      <section className="min-h-screen overflow-hidden bg-white text-neutral-900">
        <HeroSection images={featured} />

        <WhyChooseUs />

        <MovieSection />

        <UpcomingMovieSection />
      </section>

      <Newsletter />
    </HomeLayout>
  );
}

export default LandingPage;
