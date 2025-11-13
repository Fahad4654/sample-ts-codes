import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDelivery: Date;
}

const useOrderTracker = (orderId: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockOrder: Order = {
          id: orderId,
          status: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)] as Order['status'],
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };
        setOrder(mockOrder);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch order.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
};

interface OrderTrackerProps {
  orderId: string;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ orderId }) => {
  const { order, loading, error } = useOrderTracker(orderId);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div>
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <p>Estimated Delivery: {order.estimatedDelivery.toLocaleDateString()}</p>
    </div>
  );
};

export default OrderTracker;