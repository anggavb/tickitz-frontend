import apiClient from "../axios";

export function getOrderDetail(orderId, config = {}) {
  return apiClient.get(`/orders/${orderId}`, config);
}

export function getOrderSeats(orderId, config = {}) {
  return apiClient.get(`/orders/${orderId}/seats`, config);
}

export function getMovieCinemaSeats(movieCinemaId, config = {}) {
  return apiClient.get(`/movie-cinemas/${movieCinemaId}/seats`, config);
}

export function updateOrderSeats(orderId, seats, config = {}) {
  return apiClient.patch(
    `/orders/${orderId}/seats`,
    { seats },
    config,
  );
}

export function getOrderPaymentMethods(orderId, config = {}) {
  return apiClient.get(`/orders/${orderId}/payment-methods`, config);
}

export function updateOrderPayment(orderId, payload, config = {}) {
  return apiClient.patch(`/orders/${orderId}/payment`, payload, config);
}

export function getOrderQr(orderId, config = {}) {
  return apiClient.get(`/orders/${orderId}/qr`, {
    ...config,
    responseType: "blob",
  });
}
