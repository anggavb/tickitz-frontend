import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  const exploreLinks = ["Cinemas", "Movies List", "My Ticket", "Notification"];

  const sponsors = [
    {
      name: "ebv.id",
      className: "font-serif text-2xl font-black italic text-black md:text-5xl",
    },
    {
      name: "CineOne21",
      className: "font-serif text-lg font-black text-violet-800 md:text-5xl",
    },
    {
      name: "hiflix",
      className: "text-2xl font-bold tracking-wide text-red-600 md:text-4xl",
    },
  ];

  const socials = [
    {
      name: "Facebook",
      label: "Tickitz Cinema id",
      icon: (
        <path d="M13.135 6H15V3h-1.865A4.147 4.147 0 0 0 8.993 7.142V9H7v3h1.993v9.938h3V12h2.021l.592-3h-2.613V6.591A.6.6 0 0 1 12.592 6h.543Z" />
      ),
    },
    {
      name: "Instagram",
      label: "tickitz.id",
      icon: (
        <>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Z" />
          <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          <path d="M17.5 6.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
        </>
      ),
    },
    {
      name: "Twitter",
      label: "tickitz.id",
      icon: (
        <path d="M22 5.8c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 8.9c0 .3 0 .6.1.9A11.3 11.3 0 0 1 3.9 5.6a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9c-.4.1-.7.2-1.1.2-.3 0-.5 0-.8-.1a4 4 0 0 0 3.7 2.8A8.1 8.1 0 0 1 2 19.1 11.4 11.4 0 0 0 8.2 21c7.4 0 11.5-6.1 11.5-11.5v-.5c.8-.6 1.5-1.3 2.3-2.2Z" />
      ),
    },
    {
      name: "YouTube",
      label: "Tickitz Cinema id",
      icon: (
        <>
          <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28.4 28.4 0 0 0 2 12a28.4 28.4 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 22 12a28.4 28.4 0 0 0-.4-4.8Z" />
          <path className="fill-white" d="M10 15.5v-7l6 3.5-6 3.5Z" />
        </>
      ),
    },
  ];

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <section>
            <img className="w-28 md:w-50" src={logo} alt="Tickitz Logo" />

            <p className="mt-4 max-w-xs text-xs leading-relaxed tracking-wide text-violet-900/60 md:mt-10 md:max-w-sm md:text-xl">
              Stop waiting in line. Buy tickets conveniently, watch movies
              quietly.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold text-black md:mb-8 md:text-2xl">
              Explore
            </h2>

            <ul className="grid grid-cols-4 gap-3 md:block md:space-y-5">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[10px] font-medium text-violet-900/70 transition hover:text-primary md:text-xl"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold text-black md:mb-9 md:text-2xl">
              Our Sponsor
            </h2>

            <div className="flex items-center gap-5 md:block md:space-y-7">
              {sponsors.map((sponsor) => (
                <div key={sponsor.name} className={sponsor.className}>
                  {sponsor.name}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold text-black md:mb-9 md:text-2xl">
              Follow us
            </h2>

            <ul className="flex items-center gap-6 md:block md:space-y-7">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href="#"
                    className="flex items-center gap-6 text-violet-900/70 transition hover:text-primary"
                    aria-label={social.name}
                  >
                    <svg
                      className="h-4 w-4 shrink-0 fill-current md:h-8 md:w-8"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {social.icon}
                    </svg>

                    <span className="hidden text-xl font-medium md:inline">
                      {social.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-10 text-xs tracking-wide text-violet-900/70 md:mt-16 md:text-center md:text-xl">
          © 2020 Tickitz. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
