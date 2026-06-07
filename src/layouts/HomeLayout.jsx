import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomeLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default HomeLayout;