import { useEffect, useState } from 'react';
import { Category } from '../models/category.model';
import { fetchCategory } from '../api/category.api';
import { useLocation } from 'react-router-dom';

export const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);
  const setActive = () => {
    const params = new URLSearchParams(location.search);
    if (params.get('category_id')) {
      setCategory((prev) => {
        return prev.map((item) => {
          return { ...item, isActive: item.id === Number(params.get('category_id')) };
        });
      });
    } else {
      setCategory((prev) => {
        return prev.map((item) => {
          return { ...item, isActive: false };
        });
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      // 비동기 함수를 정의합니다.
      try {
        const categories = await fetchCategory(); // 카테고리를 가져옵니다.
        if (!categories) return;

        const categoryWithAll = [{ id: null, category_name: '전체' }, ...categories];

        setCategory(categoryWithAll);
        setActive();
      } catch (error) {
        console.error('Error fetching categories:', error); // 에러가 발생하면 콘솔에 출력합니다.
      }
    };

    fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
  }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { category }; // 카테고리를 반환합니다.
};
