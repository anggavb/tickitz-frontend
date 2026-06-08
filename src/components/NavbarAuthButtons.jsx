import { Link } from 'react-router';

function NavbarAuthButtons({ mobile = false }) {
  return (
    <div className={mobile ? 'flex flex-col gap-2' : 'hidden gap-3 md:flex'}>
      <Link to="/auth/signin" className="rounded border border-primary px-5 py-2 text-sm text-primary">
        Sign In
      </Link>
      <Link to="/auth/signup" className="rounded bg-primary px-5 py-2 text-sm text-white">
        Sign Up
      </Link>
    </div>
  );
}

export default NavbarAuthButtons;
