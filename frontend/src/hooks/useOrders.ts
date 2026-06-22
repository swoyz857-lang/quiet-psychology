import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Order } from '../types';

export function useOrders(status?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.orders
      .list(status)
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [status]);

  const updateStatus = async (id: number, newStatus: string) => {
    const updated = await api.orders.updateStatus(id, newStatus);
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
  };

  const remove = async (id: number) => {
    await api.orders.delete(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return { orders, loading, error, updateStatus, remove };
}
