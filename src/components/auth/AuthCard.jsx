export default function AuthCard({ children }) {
  return (
    <div
      className="
        bg-white/90 backdrop-blur-md rounded-xl shadow-xl
        p-8 px-10 w-full max-w-md mx-auto
        max-h-[90vh] overflow-y-auto
      "
    >
      {children}
    </div>
  );
}
