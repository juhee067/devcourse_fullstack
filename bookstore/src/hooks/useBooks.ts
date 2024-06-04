import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { fetchBooks } from '../api/book.api';

const QUERYSTRING = {
  CATEGORY_ID: 'category_id',
  NEWS: 'news',
  PAGE: 'page',
};

const LIMIT = 10;

export const useBooks = () => {
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 1,
  });

  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const fetchBooksData = async () => {
      try {
        const res = await fetchBooks({
          category_id: params.get(QUERYSTRING.CATEGORY_ID)
            ? Number(params.get(QUERYSTRING.CATEGORY_ID))
            : undefined,
          news: params.get(QUERYSTRING.NEWS) ? true : undefined,
          currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
          limit: LIMIT,
        });

        setBooks(res.books);
        setPagination(res.pagination);
        setIsEmpty(res.books.length === 0);
      } catch (error) {
        console.error('Failed to fetch books', error);
      }
    };

    fetchBooksData();
  }, [location.search]);

  return { books, pagination, isEmpty };
};
