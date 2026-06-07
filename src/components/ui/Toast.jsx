import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      className={`
        fixed top-5 right-5 z-50 px-5 py-3 rounded-md text-white shadow-lg
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
      `}
    >
      {message}
    </div>
  );
}
