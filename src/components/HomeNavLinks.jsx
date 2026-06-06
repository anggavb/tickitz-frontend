function HomeNavLinks({ mobile = false }) {
  const links = [
    { name: "Home", href: "#" },
    { name: "Movie", href: "#" },
    { name: "Buy Ticket", href: "#" },
  ];

  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-3 text-sm text-slate-700"
          : "flex gap-12 text-sm text-slate-700"
      }
    >
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="hover:text-primary transition-colors"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}

export default HomeNavLinks;