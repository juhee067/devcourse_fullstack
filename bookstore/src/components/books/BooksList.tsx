import styled from 'styled-components';
import BookItem from './BookItem';
import { dummyBook } from '../../data/books';

const BooksList = () => {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  );
};

const BooksListStyle = styled.div``;

export default BooksList;
