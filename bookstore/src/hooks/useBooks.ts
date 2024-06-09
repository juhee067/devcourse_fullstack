import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
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
  const { data: booksData } = useQuery(['books', location.search], () =>
    fetchBooks({
      category_id: paramsNum(QUERYSTRING.CATEGORY_ID)
        ? Number(paramsNum(QUERYSTRING.CATEGORY_ID))
        : undefined,
      news: paramsNum(QUERYSTRING.NEWS) ? true : undefined,
      currentPage: paramsNum(QUERYSTRING.PAGE) ? Number(paramsNum(QUERYSTRING.PAGE)) : 1,
      limit: LIMIT,
    })
  );
  // const [books, setBooks] = useState<Book[]>([]);
  // const [pagination, setPagination] = useState<Pagination>({
  //   totalCount: 0,
  //   currentPage: 1,
  // });
  // const [isEmpty, setIsEmpty] = useState(true);

  // useEffect(() => {

  //   const fetchBooksData = async () => {
  //     try {
  //       const res = await

  //       const { books, pagination } = res;

  //       setBooks(books);
  //       setPagination(pagination);
  //       setIsEmpty(books.length === 0);
  //     } catch (error) {
  //       console.error('Failed to fetch books', error);
  //     }
  //   };

  //   fetchBooksData();
  // }, [location.search]);

  return {
    books: booksData?.books,
    pages: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
  };
};
