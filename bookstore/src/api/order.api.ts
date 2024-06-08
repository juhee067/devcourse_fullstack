import { OrderSheet } from '../models/order.model';
import { httpClient } from './http';

export const order = async (orderData: OrderSheet) => {
  try {
    const response = await httpClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Order failed:', error);
    throw error;
  }
};
