export function isCanceledRequest(error) {
  return error?.code === "ERR_CANCELED" || error?.name === "CanceledError";
}

export function getErrorMessage(error, fallbackMessage) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallbackMessage
  );
}

export function getSettledData(result, fallbackValue) {
  if (result.status === "fulfilled") {
    return result.value?.data ?? result.value ?? fallbackValue;
  }

  if (isCanceledRequest(result.reason)) {
    throw result.reason;
  }

  return fallbackValue;
}
