import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setAuthToken } from '../utils/axios';

/**
 * Synchronize the Redux auth token with the shared Axios instance.
 *
 * This hook keeps `src/utils/axios.js` free from React hooks while still using
 * `const { token } = useSelector((state) => state.auth);` as the token source.
 *
 * @returns {void}
 *
 * @example
 * function AppRouter() {
 *   useAxiosAuthToken();
 *   return <Routes />;
 * }
 */
export default function useAxiosAuthToken() {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);
}
