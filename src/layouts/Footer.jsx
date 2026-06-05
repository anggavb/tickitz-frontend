import React from "react";
import logo from "../assets/logo.png";
function Footer() {
  const exploreLinks = ["Cinemas", "Movies List", "My Ticket", "Notification"];

  const sponsors = [
    {
      name: "ebv.id",
      className: "font-serif text-5xl font-black italic text-black",
    },
    {
      name: "CineOne21",
      className: "font-serif text-5xl font-black text-violet-800",
    },
    {
      name: "hiflix",
      className: "text-4xl font-bold tracking-wide text-red-600",
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
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          {/* Brand */}
          <section>
            <img className="" src={logo} alt="" />

            <p className="mt-10 max-w-sm text-2xl leading-relaxed tracking-wide text-violet-900/60">
              Stop waiting in line. Buy tickets conveniently, watch movies
              quietly.
            </p>
          </section>

          {/* Explore */}
          <section>
            <h2 className="mb-8 text-2xl font-bold text-black">Explore</h2>

            <ul className="space-y-5">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xl font-medium text-violet-900/70 transition hover:text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Sponsor */}
          <section>
            <h2 className="mb-9 text-2xl font-bold text-black">Our Sponsor</h2>

            <div className="space-y-7">
              {sponsors.map((sponsor) => (
                <div key={sponsor.name} className={sponsor.className}>
                  {sponsor.name}
                </div>
              ))}
            </div>
          </section>

          {/* Follow */}
          <section>
            <h2 className="mb-9 text-2xl font-bold text-black">Follow us</h2>

            <ul className="space-y-7">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href="#"
                    className="flex items-center gap-6 text-violet-900/70 transition hover:text-primary"
                  >
                    <svg
                      className="h-8 w-8 shrink-0 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {social.icon}
                    </svg>

                    <span className="text-xl font-medium">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-16 text-center text-xl tracking-wide text-violet-900/70">
          © 2020 Tickitz. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
