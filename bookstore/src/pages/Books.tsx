import BooksEmpty from '../components/books/BooksEmpty';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import Pagination from '../components/books/Pagination';
import { Title } from '../components/common/Title';
import styled from 'styled-components';
import { useBooks } from '../hooks/useBooks';

const Books = () => {
  const { books, isEmpty, pagination } = useBooks();

  return (
    <div>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        <BooksFilter />
        <BooksViewSwitcher />
        {isEmpty ? (
          <BooksEmpty />
        ) : (
          <>
            <BooksList books={books} />
            <Pagination pagination={pagination} />
          </>
        )}
      </BooksStyle>
    </div>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;
export default Books;
