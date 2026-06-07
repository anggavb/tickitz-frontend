import { useEffect, useState } from 'react';

const images = ['/assets/auth/backgrounds/daredevil.jpg', '/assets/auth/backgrounds/ironheart.jpg', '/assets/auth/backgrounds/marvel.png'];

export default function AuthWrapper({ children }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-8 sm:px-6 md:px-8 py-8">
      {/* BACKGROUND */}
      <img
        src={images[index]}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700
          ${fade ? 'opacity-100' : 'opacity-0'}
        `}
      />
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />
      {/* CONTENT (FIX HERE) */}
      <div className="relative z-10 w-full flex flex-col items-center">{children}</div>
    </div>
  );
}
