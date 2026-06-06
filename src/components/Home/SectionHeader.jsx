function SectionHeader({ label, title, center = false, className = "" }) {
  return (
    <div
      className={`${center ? "text-center" : "text-center lg:text-left"} ${className}`}
    >
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary md:mb-6 md:text-sm">
        {label}
      </p>

      <h2
        className={`max-w-xs text-2xl font-medium leading-snug text-neutral-900 md:max-w-2xl md:text-5xl ${
          center ? "mx-auto" : "mx-auto lg:mx-0"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

export default SectionHeader;
