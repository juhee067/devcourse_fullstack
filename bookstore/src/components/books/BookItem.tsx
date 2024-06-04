import styled from 'styled-components';
import { Book } from '../../models/book.model';
import { getImgSrc } from '../../utils/image';

interface Props {
  book: Book;
}

const BookItem = ({ book }: Props) => {
  return (
    <BookItemStyle>
      <div className='img'>
        <img src={getImgSrc(book.id)} alt={book.title} />
      </div>
    </BookItemStyle>
  );
};

const BookItemStyle = styled.div``;

export default BookItem;
