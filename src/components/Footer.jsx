import logo from "../assets/images/logo.png";
import ebuId from "../assets/images/ebv-id.png";
import cineOne from "../assets/images/CineOne21.png";
import hiflix from "../assets/images/hiflix.png";

import facebook from "../assets/images/evafacebook.png";
import instagram from "../assets/images/instagram.png";
import twitter from "../assets/images/evatwitter.png";
import youtube from "../assets/images/youtube.png";

function Footer() {
  return (
    <footer className="bg-white px-25 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* Logo */}
        <div>
          <img src={logo} alt="Tickitz" className="mb-4 h-8 sm:mb-6 sm:h-10" />

          <p className="max-w-xs text-sm leading-7 text-slate-500 sm:leading-8">
            Stop waiting in line. Buy tickets conveniently, watch movies
            quietly.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-4 font-semibold text-slate-900 sm:mb-6">Explore</h3>

          <ul className="space-y-2 text-sm text-slate-500 sm:space-y-3">
            <li><a href="#" className="hover:text-slate-700">Cinemas</a></li>
            <li><a href="#" className="hover:text-slate-700">Movies List</a></li>
            <li><a href="#" className="hover:text-slate-700">My Ticket</a></li>
            <li><a href="#" className="hover:text-slate-700">Notification</a></li>
          </ul>
        </div>

        {/* Sponsor */}
        <div>
          <h3 className="mb-4 font-semibold text-slate-900 sm:mb-6">Our Sponsor</h3>

          <div className="flex flex-col gap-3 sm:gap-5">
            <img src={ebuId} alt="ebv.id" className="h-8 w-fit sm:h-10" />
            <img src={cineOne} alt="CineOne21" className="h-7 w-fit sm:h-8" />
            <img src={hiflix} alt="Hiflix" className="h-7 w-fit sm:h-8" />
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-4 font-semibold text-slate-900 sm:mb-6">Follow us</h3>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={facebook} alt="Facebook" className="h-5 w-5" />
              <span className="text-sm text-slate-500">Tickitz Cinema id</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <img src={instagram} alt="Instagram" className="h-5 w-5" />
              <span className="text-sm text-slate-500">tickitz.id</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <img src={twitter} alt="Twitter" className="h-5 w-5" />
              <span className="text-sm text-slate-500">tickitz.id</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <img src={youtube} alt="Youtube" className="h-5 w-5" />
              <span className="text-sm text-slate-500">Tickitz Cinema Id</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center text-sm text-slate-500 sm:mt-16">
        © 2020 Tickitz. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
