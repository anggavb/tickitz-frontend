function NewsletterSection() {
  return (
    <article className="relative mx-5 my-10 overflow-hidden rounded-2xl bg-primary px-5 py-10 text-center md:mx-auto md:my-14 md:max-w-7xl md:rounded-4xl md:px-12 md:py-20">
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-44 w-44 rounded-full border-10 border-white md:-bottom-44 md:-right-28 md:h-80 md:w-80 md:border-14" />

      <h2 className="relative z-10 text-2xl font-light leading-snug tracking-wide text-white md:text-4xl">
        Subscribe to our newsletter
      </h2>

      <form className="relative z-10 mx-auto mt-6 max-w-3xl">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_0.8fr]">
          <input
            className="h-11 rounded-md border border-white/80 bg-white/5 px-4 text-xs text-white outline-none placeholder:text-white/70 focus:border-white focus:bg-white/10 md:h-12 md:text-base"
            type="text"
            placeholder="First name"
          />

          <input
            className="h-11 rounded-md border border-white/80 bg-white/5 px-4 text-xs text-white outline-none placeholder:text-white/70 focus:border-white focus:bg-white/10 md:h-12 md:text-base"
            type="email"
            placeholder="Email address"
          />

          <button
            className="h-11 rounded-md bg-white px-4 text-xs font-bold text-primary transition hover:bg-gray-100 md:h-12 md:text-base"
            type="submit"
          >
            Subscribe Now
          </button>
        </div>
      </form>
    </article>
  );
}

export default NewsletterSection;
