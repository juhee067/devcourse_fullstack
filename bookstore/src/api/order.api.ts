import { Order, OrderDetailItem, OrderSheet } from '../models/order.model';
import { httpClient, requestHandler } from './http';

export const order = async (orderData: OrderSheet) => {
  try {
    return await requestHandler<OrderSheet>('post', '/orders', orderData);
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await httpClient.get<Order[]>('/orders');
    return response.data;
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};

export const fetchOrder = async (id: number) => {
  try {
    const response = await httpClient.get<OrderDetailItem[]>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};
