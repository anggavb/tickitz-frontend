import locationArrowIcon from '../assets/images/location-arrow.png';
import searchIcon from '../assets/images/search1.png';
import profileImage from '../assets/images/profile.png';

function NavbarImage({ location = 'Jakarta' }) {
  return (
    <div className="flex items-center gap-3 md:gap-5">
      <div className="hidden items-center gap-2 text-sm text-slate-600 md:flex">
        <span>{location}</span>

        <img src={locationArrowIcon} alt="Location Dropdown" className="h-3 w-3" />
      </div>

      <button type="button">
        <img src={searchIcon} alt="Search" className="h-5 w-5" />
      </button>

      <button type="button">
        <img src={profileImage} alt="Profile" className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10" />
      </button>
    </div>
  );
}

export default NavbarImage;
