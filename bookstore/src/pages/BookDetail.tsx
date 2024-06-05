import { useParams } from 'react-router-dom';
import { useBook } from '../hooks/useBook';

const BookDetail = () => {
  const { bookId } = useParams();
  const { book } = useBook(bookId);
  if (!book) return null;
  return <div>{book.title}</div>;
};

export default BookDetail;
