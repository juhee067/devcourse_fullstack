import styled from 'styled-components';
import BookItem from './BookItem';

const BooksList = () => {
  return (
    <BooksListStyle>
      <BookItem />
    </BooksListStyle>
  );
};

const BooksListStyle = styled.div``;

export default BooksList;
