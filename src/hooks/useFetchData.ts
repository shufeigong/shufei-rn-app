import { useState, useEffect, useCallback, useRef } from 'react';
import { get } from '../utils/request';

/**
 * Interface for the hook's return value
 * @template T - The type of the data returned by the API
 */
interface FetchResult<T> {
  data: T | undefined;
  loading: boolean;
  error: boolean;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  onReload: () => Promise<void>;
}

/**
 * Custom Hook using useRef to prevent unnecessary re-fetches
 * optimized for React Native performance.
 */
const useFetchData = <T>(url: string, params: Record<string, any> = {}): FetchResult<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Use useRef to persist the previous params string across renders
  const prevParamsRef = useRef<string>('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // Ensure loading is true before request
      setError(false);
      const result = await get<T>(url, params);
      setData(result);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [url, params]); // Note: 'params' is still an object here

  useEffect(() => {
    const currentParamsString = JSON.stringify(params);

    // Only trigger fetch if the URL or the actual CONTENT of params changed
    if (prevParamsRef.current !== currentParamsString || url) {
      fetchData();
      // Update the ref to the current state for the next render
      prevParamsRef.current = currentParamsString;
    }
  }, [url, fetchData, params]);

  const onReload = async () => {
    await fetchData();
  };

  return { data, loading, error, setData, onReload };
};

export default useFetchData;
