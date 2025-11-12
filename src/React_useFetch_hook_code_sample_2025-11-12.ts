import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url]);

  return { data, loading, error };
}

export default useFetch;