import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

interface Props {
  books: Book[];
}

const BooksList = ({ books }: Props) => {
  return (
    <BooksListStyle>
      {books?.map((item) => (
        <BookItem key={item.id} book={item} />
      ))}
    </BooksListStyle>
  );
};

const BooksListStyle = styled.div``;

export default BooksList;
