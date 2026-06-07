export default function AuthCard({ children }) {
  return (
    <div
      className="
        bg-white/90 backdrop-blur-md rounded-xl shadow-xl
        p-8 px-10 w-full max-w-md mx-auto
        h-auto
      "
    >
      {children}
    </div>
  );
}
