import HeroSection from "../components/Home/HeroSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import MovieSection from "../components/Home/MovieSection";
import UpcomingMovieSection from "../components/Home/UpcomingMovieSection";
import Newsletter from "../components/Newsletter";
import HomeLayout from "../layouts/HomeLayout";

function LandingPage() {
  return (
    <HomeLayout>
      <section className="min-h-screen overflow-hidden bg-white text-neutral-900">
        <HeroSection />

        <WhyChooseUs />

        <MovieSection />

        <UpcomingMovieSection />
      </section>

      <Newsletter />
    </HomeLayout>
  );
}

export default LandingPage;
