function NavbarAuthButtons({ mobile = false }) {
  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-2"
          : "hidden gap-3 md:flex"
      }
    >
      <button className="rounded border border-primary px-5 py-2 text-sm text-primary">
        Sign In
      </button>

      <button className="rounded bg-primary px-5 py-2 text-sm text-white">
        Sign Up
      </button>
    </div>
  );
}

export default NavbarAuthButtons;