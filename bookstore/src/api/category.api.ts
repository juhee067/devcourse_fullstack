import { Category } from '../models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  try {
    const response = await httpClient.get<Category[]>('/category');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
