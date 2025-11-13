import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  averageSessionDuration: number;
}

const useAnalyticsData = (): AnalyticsData => {
  const [data, setData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    conversionRate: 0,
    averageSessionDuration: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/analytics'); // Replace with your API endpoint
        const jsonData: AnalyticsData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
};

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => (
  <div className="dashboard-card">
    {icon && <div className="card-icon">{icon}</div>}
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);


const AnalyticsDashboard: React.FC = () => {
  const analyticsData = useAnalyticsData();

  return (
    <div className="analytics-dashboard">
      <DashboardCard title="Page Views" value={analyticsData.pageViews} icon={<span role="img" aria-label="page-views">👁️</span>} />
      <DashboardCard title="Unique Visitors" value={analyticsData.uniqueVisitors} icon={<span role="img" aria-label="visitors">👤</span>}/>
      <DashboardCard title="Conversion Rate" value={`${(analyticsData.conversionRate * 100).toFixed(2)}%`} icon={<span role="img" aria-label="conversion">✅</span>}/>
      <DashboardCard title="Avg. Session Duration" value={`${analyticsData.averageSessionDuration.toFixed(1)}s`} icon={<span role="img" aria-label="duration">⏱️</span>}/>
    </div>
  );
};

export default AnalyticsDashboard;