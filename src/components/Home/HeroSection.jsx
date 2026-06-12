import React from "react";

const fallbackImages = [
  "https://image.tmdb.org/t/p/original/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
  "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg",
  "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
  "https://image.tmdb.org/t/p/w500/rweIrveL43TaxUN0akQEaAXL6x0.jpg",
];

const posterLayout = [
  {
    alt: "Movie poster 1",
    className: "h-24 rounded-t-xl object-top md:h-40 md:rounded-t-2xl",
  },
  {
    alt: "Movie poster 2",
    className: "h-36 rounded-b-xl md:h-64 md:rounded-b-2xl",
  },
  {
    alt: "Movie poster 3",
    className: "h-36 rounded-t-xl md:h-64 md:rounded-t-2xl",
  },
  {
    alt: "Movie poster 4",
    className: "h-24 rounded-b-xl object-top md:h-40 md:rounded-b-2xl",
  },
];

function HeroSection({ images = fallbackImages }) {
  const displayImages = fallbackImages.map(
    (fallbackImage, index) => images[index] || fallbackImage,
  );

  const firstColumn = displayImages.slice(0, 2);
  const secondColumn = displayImages.slice(2, 4);

  const renderPoster = (src, index) => (
    <img
      key={index}
      src={src}
      alt={posterLayout[index].alt}
      className={`w-full object-cover ${posterLayout[index].className}`}
    />
  );

  return (
    <article className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 text-center md:px-8 md:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:text-left">
      <section className="space-y-4">
        <p className="mx-auto max-w-xs text-[10px] font-semibold uppercase tracking-[0.22em] text-primary md:mx-0 md:max-w-none md:text-sm">
          Movie Ticket Purchases #1 in Indonesia
        </p>

        <h1 className="mx-auto max-w-sm text-2xl font-medium leading-snug md:max-w-3xl lg:mx-0 lg:text-5xl">
          Experience the Magic of Cinema: Book Your Tickets Today
        </h1>

        <p className="mx-auto max-w-xs text-xs leading-5 text-gray-500 md:mx-0 md:max-w-xl md:text-lg">
          Sign up and get the ticket with a lot of discount
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-70 grid-cols-2 gap-2.5 md:max-w-105 md:gap-4 lg:max-w-none">
        <div className="flex flex-col gap-2.5 md:gap-4">
          {firstColumn.map((src, index) => renderPoster(src, index))}
        </div>

        <div className="flex flex-col gap-2.5 md:gap-4">
          {secondColumn.map((src, index) => renderPoster(src, index + 2))}
        </div>
      </section>
    </article>
  );
}

export default HeroSection;
