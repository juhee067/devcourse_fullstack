import { useEffect, useState } from 'react';
import { Order } from '../models/order.model';
import { fetchOrder, fetchOrders } from '../api/order.api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
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

  const selectOrderItem = async (orderId: number) => {
    try {
      const orderData = await fetchOrder(orderId);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  return { orders, selectedItemId, selectOrderItem };
};
