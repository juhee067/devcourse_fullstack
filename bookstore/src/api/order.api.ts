import { OrderSheet } from '../models/order.model';
import { requestHandler } from './http';

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
    return await requestHandler('get', '/orders');
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};

export const fetchOrder = async (id: number) => {
  try {
    return await requestHandler('get', `/orders/${id}`);
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};
