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
    <div className="relative pb-10 overflow-hidden flex items-center justify-center px-4">
      {/* BACKGROUND */}
      <img
        src={images[index]}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700 will-change-opacity
          ${fade ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">{children}</div>
    </div>
  );
}
