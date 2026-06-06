import circleDecoration from "../assets/images/shape.png";

function Newsletter() {
  return (
    <section className="px-6 lg:px-45 py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[24px] bg-blue-600 px-8 py-14 text-center text-white lg:px-20 lg:py-16">
        <h2 className="mb-10 text-3xl font-medium lg:text-5xl">
          Subscribe to our newsletter
        </h2>

        <form className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <input
            type="text"
            placeholder="First name"
            className="h-12 w-full rounded border border-white/40 bg-transparent px-4 text-white placeholder:text-white/70 focus:outline-none md:w-[230px]"
          />

          <input
            type="email"
            placeholder="Email address"
            className="h-12 w-full rounded border border-white/40 bg-transparent px-4 text-white placeholder:text-white/70 focus:outline-none md:w-[230px]"
          />

          <button
            type="submit"
            className="h-12 rounded bg-white px-10 font-medium text-blue-600 transition hover:bg-slate-100 md:w-auto"
          >
            Subscribe Now
          </button>
        </form>

        <img
          src={circleDecoration}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 w-32 lg:w-44"
        />
      </div>
    </section>
  );
}

export default Newsletter;