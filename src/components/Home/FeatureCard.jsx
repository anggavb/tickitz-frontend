function FeatureCard({ title, type = "shield" }) {
  return (
    <div className="mx-auto max-w-xs px-2 text-center md:max-w-none md:px-0 lg:text-left">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary lg:mx-0">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-current"
          aria-hidden="true"
        >
          {type === "chat" ? (
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 4V5.5Z" />
          ) : (
            <path d="M12 2 4.5 5v6.3c0 4.7 3.2 9 7.5 10.2 4.3-1.2 7.5-5.5 7.5-10.2V5L12 2Zm-1 13.2-3-3 1.4-1.4 1.6 1.6 3.9-3.9 1.4 1.4-5.3 5.3Z" />
          )}
        </svg>
      </div>

      <h3 className="mb-3 text-sm font-bold md:text-xl">{title}</h3>

      <p className="text-xs leading-6 text-gray-500 md:text-sm">
        Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin
        faucibus nibh et sagittis a. Lacinia purus ac amet.
      </p>
    </div>
  );
}

export default FeatureCard;
