import { useParams } from 'react-router-dom';
import { useBook } from '../hooks/useBook';
import { getImgSrc } from '../utils/image';
import { Title } from '../components/common/Title';
import { BookDetail as IBookDetail } from '../models/book.model';
import styled from 'styled-components';
import { formatDate, formatNumber } from '../utils/format';
import LikeButton from '../components/book/LikeButton';
import AddToCart from '../components/book/AddToCart';
import BookReview from '../components/book/BookReview';
const bookInfoList = [
  { label: '카테고리', key: 'categoryName' },
  { label: '포맷', key: 'form' },
  { label: '페이지', key: 'pages' },
  { label: 'ISBN', key: 'isbn' },
  {
    label: '출간일',
    key: 'pubDate',
    filter: (book: IBookDetail) => {
      return `${formatDate(book.pubDate)} 원`;
    },
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)} 원`;
    },
  },
];

export default function BookDetail() {
  const { bookId } = useParams();
  const { book, likeToggle, reviews } = useBook(bookId);

  if (!book) return null;
  return (
    <BookDetailStyle>
      <header className='header'>
        <div className='img'>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className='info'>
          <Title size='large' color='text'>
            {book.title}
          </Title>
          {bookInfoList.map((list) => (
            <dl key={list.label}>
              <dt>{list.label}</dt>
              <dd>{list.filter ? list.filter(book) : book[list.key as keyof IBookDetail]}</dd>
            </dl>
          ))}
          <p className='summary'>{book.summary}</p>
          <div className='like'>
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className='add-cart'>
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className='content'>
        <Title size='medium'>상세설명</Title>

        <Title size='medium'>목차</Title>
        <p className='index'>{book.contents}</p>

        <Title size='medium'>리뷰</Title>
        <BookReview />
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;

        dt {
          width: 80px;
          color: ${({ theme }) => theme.colors.secondary};
        }

        a {
          color: ${({ theme }) => theme.colors.primary};
          text-decoration: none;
        }
      }
    }
  }

  .content {
  }
`;
