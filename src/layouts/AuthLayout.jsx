import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const images = ['/assets/auth/backgrounds/daredevil.webp', '/assets/auth/backgrounds/ironheart.webp', '/assets/auth/backgrounds/marvel.webp'];

export default function AuthLayout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);

      return () => clearTimeout(timeout);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 overflow-hidden">
      <img
        src={images[index]}
        alt="auth background"
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700
          ${fade ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full flex flex-col items-center">{children}</div>
    </div>
  );
}
