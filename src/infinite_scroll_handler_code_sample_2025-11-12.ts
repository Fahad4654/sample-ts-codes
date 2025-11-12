import { useEffect, useState, useRef } from 'react';

interface InfiniteScrollOptions<T> {
  fetchData: (page: number) => Promise<T[]>;
  initialPage?: number;
  itemsPerPage?: number;
}

function useInfiniteScroll<T>(options: InfiniteScrollOptions<T>) {
  const { fetchData, initialPage = 1, itemsPerPage = 20 } = options;
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLElement | null>(null);

  const loadMoreData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await fetchData(page);
      setData((prevData) => [...prevData, ...newData]);
      setHasMore(newData.length === itemsPerPage);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!lastItemRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreData();
      }
    });

    observer.current.observe(lastItemRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };

  }, [lastItemRef.current, hasMore]);


  return {
    data,
    loading,
    hasMore,
    lastItemRef,
  };
}

export default useInfiniteScroll;