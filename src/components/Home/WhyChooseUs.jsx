import SectionHeader from "./SectionHeader";

function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: "Guaranteed",
      icon: (
        <path d="M12 2 4.5 5v6.3c0 4.7 3.2 9 7.5 10.2 4.3-1.2 7.5-5.5 7.5-10.2V5L12 2Zm-1 13.2-3-3 1.4-1.4 1.6 1.6 3.9-3.9 1.4 1.4-5.3 5.3Z" />
      ),
    },
    {
      id: 2,
      title: "Affordable",
      icon: (
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15.9V19h-2v-1.1c-1.7-.3-3-1.3-3.6-2.8l1.8-.8c.5 1.1 1.4 1.8 2.7 1.8 1.2 0 2-.5 2-1.4 0-.8-.5-1.2-2.4-1.7-2.4-.6-3.6-1.5-3.6-3.4 0-1.6 1.2-2.9 3.1-3.3V5h2v1.2c1.4.3 2.5 1.1 3.1 2.4l-1.7.9c-.5-.9-1.2-1.4-2.3-1.4-1.2 0-1.9.5-1.9 1.3 0 .8.5 1.1 2.4 1.6 2.4.6 3.6 1.6 3.6 3.5 0 1.8-1.3 3.1-3.2 3.4Z" />
      ),
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      icon: (
        <path d="M12 3a8 8 0 0 0-8 8v3a3 3 0 0 0 3 3h1v-7H6.1A6 6 0 0 1 18 10h-2v7h2v.5c0 1.4-1.1 2.5-2.5 2.5H13v-2h2.5c.3 0 .5-.2.5-.5V17h1a3 3 0 0 0 3-3v-3a8 8 0 0 0-8-8Z" />
      ),
    },
  ];

  return (
    <article className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <SectionHeader
        label="Why Choose Us"
        title="Unleashing the Ultimate Movie Experience"
        className="mb-10"
      />

      <section className="grid gap-10 md:grid-cols-3 md:gap-8">
        {features.map((item) => (
          <div
            key={item.id}
            className="mx-auto max-w-xs px-2 text-center md:max-w-none md:px-0 lg:text-left"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white lg:mx-0">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-current"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </div>
            <h3 className="mb-3 text-sm font-bold text-neutral-900 md:text-xl">
              {item.title}
            </h3>

            <p className="text-xs leading-6 text-gray-500 md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>
        ))}
      </section>
    </article>
  );
}

export default WhyChooseUs;
