import BooksEmpty from '../components/books/BooksEmpty';
import BooksFilter from '../components/books/BooksFilter';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import { Title } from '../components/common/Title';
import styled from 'styled-components';
import { useBooks } from '../hooks/useBooks';
import Loading from '../components/common/Loading';

const Books = () => {
  const { books, isEmpty, pagination, isBooksLoading } = useBooks();

  if (isEmpty) {
    return <BooksEmpty />;
  }
  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        <div className='filter'>
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
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
