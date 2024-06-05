import { useEffect, useState } from 'react';
import { BookDetail } from '../models/book.model';
import { fetchBook } from '../api/book.api';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);

  useEffect(() => {
    if (!bookId) return;
    const fetchData = async () => {
      try {
        const book = await fetchBook(bookId);
        setBook(book);
      } catch (error) {
        console.error('Failed to fetch book:', error);
      }
    };

    fetchData();
  }, [bookId]);

  return { book };
};
