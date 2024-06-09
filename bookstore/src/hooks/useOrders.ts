import { useEffect, useState } from 'react';
import { Order } from '../models/order.model';
import { fetchOrders } from '../api/order.api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    loadOrders();
  }, []);

  return { orders };
};
