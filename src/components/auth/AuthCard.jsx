export default function AuthCard({ children }) {
  return (
    <div
      className="
        bg-white/90 backdrop-blur-md rounded-xl shadow-xl
        w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
        mx-auto
        p-3 sm:p-6 md:p-8 lg:p-10
      "
    >
      {children}
    </div>
  );
}
