import React, { useState, useEffect, useRef } from 'react';

interface Item {
  id: number;
  name: string;
}

const fetchData = (page: number, limit: number): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: Item[] = Array.from({ length: limit }, (_, i) => ({
        id: (page - 1) * limit + i + 1,
        name: `Item ${ (page - 1) * limit + i + 1}`,
      }));
      resolve(data);
    }, 500);
  });
};

const InfiniteScrollList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const loadData = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const newData = await fetchData(page, 10);
        setItems(prevItems => [...prevItems, ...newData]);
        if (newData.length < 10) {
          setHasMore(false);
        }
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setLoading(true); // Trigger next page load
      }
    });

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, items]);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={item.id} ref={index === items.length - 1 ? lastItemRef : null}>
            {item.name}
          </li>
        ))}
        {loading && <li>Loading...</li>}
        {!hasMore && <li>No more items.</li>}
      </ul>
    </div>
  );
};

export default InfiniteScrollList;