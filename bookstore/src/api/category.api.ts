import { Category } from '../models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  // 함수 정의를 수정했습니다.
  try {
    const response = await httpClient.get<Category[]>('/category'); // API 호출 경로를 올바르게 수정했습니다.
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('Error fetching categories:', error); // 에러 발생 시 콘솔에 출력합니다.
    throw error; // 에러를 다시 던져서 상위 호출자가 처리하도록 합니다.
  }
};
