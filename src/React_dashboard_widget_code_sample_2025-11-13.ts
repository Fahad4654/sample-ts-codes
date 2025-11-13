import React, { useState, useEffect } from 'react';

interface WidgetProps {
  title: string;
  fetchData: () => Promise<number>;
}

const DashboardWidget: React.FC<WidgetProps> = ({ title, fetchData }) => {
  const [data, setData] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchData();
        setData(result);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  return (
    <div className="widget">
      <h3>{title}</h3>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error}</p> : null}
      {data !== null ? <p>Value: {data}</p> : null}
    </div>
  );
};

export default DashboardWidget;

// Example usage (mock data):
const mockFetchData = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 500);
  });
};

const ExampleDashboard = () => {
  return (
    <div>
      <DashboardWidget title="Users Online" fetchData={mockFetchData} />
      <DashboardWidget title="New Signups" fetchData={mockFetchData} />
    </div>
  );
};

export {ExampleDashboard};