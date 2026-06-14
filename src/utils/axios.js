import axios from 'axios';
import SweetAlert from '../components/ui/SweetAlert';
import env from './env';

let authToken = null;
let isRedirectingToLogin = false;

/**
 * Set the authentication token used by the Axios request interceptor.
 *
 * Call this from a React component or custom hook that has access to Redux,
 * for example with `const { token } = useSelector((state) => state.auth);`.
 *
 * @param {string|null|undefined} token Bearer token from the auth state.
 * @returns {void}
 *
 * @example
 * setAuthToken(token);
 */
export function setAuthToken(token) {
  authToken = token || null;
}

/**
 * Shared Axios instance for API calls.
 *
 * Configuration:
 * - baseURL: `env.baseAPI`
 * - timeout: 5000ms
 * - request interceptor: adds `Authorization: Bearer <token>`
 * - response interceptor: handles common 401, 404, and 500 errors
 *
 * @type {import('axios').AxiosInstance}
 */
const apiClient = axios.create({
  baseURL: env.baseAPI,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function hasAuthorizationHeader(headers) {
  return Boolean(headers?.Authorization || headers?.authorization || headers?.get?.('Authorization') || headers?.get?.('authorization'));
}

function setAuthorizationHeader(headers, token) {
  if (typeof headers?.set === 'function') {
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}

function getResponseMessage(error, fallbackMessage) {
  return error.response?.data?.message || error.response?.data?.error || error.message || fallbackMessage;
}

apiClient.interceptors.request.use(
  (config) => {
    if (authToken && !hasAuthorizationHeader(config.headers)) {
      config.headers = setAuthorizationHeader(config.headers, authToken);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      authToken = null;

      localStorage.removeItem('persist:auth');

      if (!isRedirectingToLogin && window.location.pathname !== '/auth/signin') {
        isRedirectingToLogin = true;
        window.location.assign('/auth/signin');
      }
    }

    if (status === 404) {
      await SweetAlert.error({
        title: 'Not Found',
        text: getResponseMessage(error, 'Resource not found.'),
      });
    }

    if (status >= 500) {
      await SweetAlert.error({
        title: 'Server Error',
        text: getResponseMessage(error, 'Server error. Please try again later.'),
      });
    }

    return Promise.reject(error);
  },
);

/**
 * Example helper for GET requests.
 *
 * @param {string} endpoint API endpoint, for example `/movies`.
 * @param {import('axios').AxiosRequestConfig} [config] Optional Axios config.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response.
 *
 * @example
 * const response = await getExample('/movies');
 * console.log(response.data);
 */
export function getExample(endpoint, config = {}) {
  return apiClient.get(endpoint, config);
}

/**
 * Example helper for POST requests.
 *
 * @param {string} endpoint API endpoint, for example `/orders`.
 * @param {object} payload Request body payload.
 * @param {import('axios').AxiosRequestConfig} [config] Optional Axios config.
 * @returns {Promise<import('axios').AxiosResponse>} Axios response.
 *
 * @example
 * const response = await postExample('/orders', {
 *   movie_cinema_id: 1,
 * });
 * console.log(response.data);
 */
export function postExample(endpoint, payload, config = {}) {
  return apiClient.post(endpoint, payload, config);
}

export default apiClient;
