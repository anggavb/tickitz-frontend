const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-xl ${className}`}
        onClick={(event) => event.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
