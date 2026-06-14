import { useState } from "react";
import Modal from "./Modal";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  virtualAccount,
  totalPayment,
  dueDate,
  confirmText = "Check Payment",
  cancelText = "Pay Later",
}) => {
  const [copied, setCopied] = useState(false);

  const formatCurrency = (value) => {
    if (typeof value === "number") {
      return `Rp ${value.toLocaleString("id-ID")}`;
    }

    if (typeof value === "string") {
      const cleanValue = value.trim();

      if (cleanValue.toLowerCase().startsWith("rp")) {
        return cleanValue;
      }

      const numericValue = Number(
        cleanValue.replace(/\./g, "").replace(",", "."),
      );

      if (!Number.isNaN(numericValue)) {
        return `Rp ${numericValue.toLocaleString("id-ID")}`;
      }

      return cleanValue;
    }

    return "-";
  };

  const handleCopy = async () => {
    if (!virtualAccount) return;

    try {
      await navigator.clipboard.writeText(String(virtualAccount));
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy virtual account:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-2xl"
    >
      <div className="w-full px-5 py-8 sm:px-8 md:px-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Payment Info
        </h2>

        <div className="space-y-7">
          <div className="grid gap-3 sm:grid-cols-[190px_1fr_auto] sm:items-center">
            <div className="flex items-center gap-2 text-sm tracking-wide text-slate-400 sm:text-base">
              <span>No. Rekening Virtual</span>
              <span>:</span>
            </div>

            <p className="break-all text-base font-bold tracking-wide text-gray-900 sm:text-right sm:text-lg">
              {virtualAccount || "-"}
            </p>

            <button
              type="button"
              onClick={handleCopy}
              className="h-11 rounded-lg border-2 border-primary px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-[190px_1fr] sm:items-center">
            <div className="flex items-center gap-2 text-sm tracking-wide text-slate-400 sm:text-base">
              <span>Total Payment</span>
              <span>:</span>
            </div>

            <p className="text-xl font-bold text-primary sm:text-right sm:text-2xl">
              {formatCurrency(totalPayment)}
            </p>
          </div>

          <p className="text-base leading-relaxed tracking-wide text-slate-400 sm:text-lg">
            Pay this payment bill before it is due,{" "}
            <span className="text-primary">on {dueDate || "-"}</span>. If the bill has
            not been paid by the specified time, it will be forfeited.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <button
            type="button"
            onClick={onConfirm}
            className="h-14 w-full rounded-md bg-primary text-base font-bold tracking-wide text-white shadow-[0_14px_28px_rgba(255,87,34,0.25)] transition hover:bg-primary/90"
          >
            {confirmText}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="block w-full text-center text-base font-bold tracking-wide text-primary transition hover:text-primary/80"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
