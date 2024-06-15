import styled from 'styled-components';
import { Book } from '../../models/book.model';
import BookBestItem from '../books/BookBestItem';

interface Props {
  books: Book[];
}

export default function MainBest({ books }: Props) {
  return (
    <MainBestStyle>
      {books.map((item, index) => (
        <BookBestItem key={item.id} book={item} itemIndex={index} />
      ))}
    </MainBestStyle>
  );
}

const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;
