import movie from "../../assets/movie.jpeg";

function HeroSection() {
  return (
    <article className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 text-center md:px-8 md:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:text-left">
      <section className="space-y-4">
        <p className="mx-auto max-w-xs text-[10px] font-semibold uppercase tracking-[0.22em] text-primary md:mx-0 md:max-w-none md:text-sm">
          Movie Ticket Purchases #1 in Indonesia
        </p>

        <h1 className="mx-auto max-w-sm text-2xl font-medium leading-snug md:max-w-3xl  lg:mx-0 lg:text-5xl">
          Experience the Magic of Cinema: Book Your Tickets Today
        </h1>

        <p className="mx-auto max-w-xs text-xs leading-5 text-gray-500 md:mx-0 md:max-w-xl md:text-lg">
          Sign up and get the ticket with a lot of discount
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-70 grid-cols-2 gap-2.5 md:max-w-105 md:gap-4 lg:max-w-none">
        <div className="flex flex-col gap-2.5 md:gap-4">
          <img
            src={movie}
            alt="Movie poster"
            className="h-24 w-full rounded-t-xl object-cover object-top md:h-40 md:rounded-t-2xl"
          />

          <img
            src={movie}
            alt="Movie poster"
            className="h-36 w-full rounded-b-xl object-cover md:h-64 md:rounded-b-2xl"
          />
        </div>

        <div className="flex flex-col gap-2.5 md:gap-4">
          <img
            src={movie}
            alt="Movie poster"
            className="h-36 w-full rounded-t-xl object-cover md:h-64 md:rounded-t-2xl"
          />

          <img
            src={movie}
            alt="Movie poster"
            className="h-24 w-full rounded-b-xl object-cover object-top md:h-40 md:rounded-b-2xl"
          />
        </div>
      </section>
    </article>
  );
}

export default HeroSection;
