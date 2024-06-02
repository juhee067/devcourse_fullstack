import { useEffect, useState } from 'react';
import { Category } from '../models/category.model';
import { fetchCategory } from '../api/category.api';

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // 비동기 함수를 정의합니다.
      try {
        const categories = await fetchCategory(); // 카테고리를 가져옵니다.
        if (!categories) return;

        const categoryWithAll = [{ id: null, name: '전체' }, ...categories];

        setCategory(categoryWithAll);
      } catch (error) {
        console.error('Error fetching categories:', error); // 에러가 발생하면 콘솔에 출력합니다.
      }
    };

    fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
  }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return { category }; // 카테고리를 반환합니다.
};
