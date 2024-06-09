import { useLocation } from 'react-router-dom';

import { fetchBooks } from '../api/book.api';
import { useQuery } from 'react-query';

const QUERYSTRING = {
  CATEGORY_ID: 'category_id',
  NEWS: 'news',
  PAGE: 'page',
};

const LIMIT = 10;

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const paramsNum = (query: string) => {
    return params.get(query);
  };
  const { data: booksData, isLoading: isBooksLoading } = useQuery(['books', location.search], () =>
    fetchBooks({
      category_id: paramsNum(QUERYSTRING.CATEGORY_ID)
        ? Number(paramsNum(QUERYSTRING.CATEGORY_ID))
        : undefined,
      news: paramsNum(QUERYSTRING.NEWS) ? true : undefined,
      currentPage: paramsNum(QUERYSTRING.PAGE) ? Number(paramsNum(QUERYSTRING.PAGE)) : 1,
      limit: LIMIT,
    })
  );

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};
