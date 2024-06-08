import styled from 'styled-components';
import { Book } from '../../models/book.model';
import BookItem from './BookItem';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ViewMode } from './BooksViewSwitcher';
import { QUERYSTRING } from '../../constants/querystring';

interface Props {
  books: Book[];
}

export default function BooksList({ books }: Props) {
  const [view, setView] = useState<ViewMode>('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsView = params.get(QUERYSTRING.VIEW);
    if (paramsView) {
      setView(paramsView as ViewMode);
    }
  }, [location.search]);
  return (
    <BooksListStyle view={view}>
      {books?.map((item) => (
        <BookItem key={item.id} book={item} view={view} />
      ))}
    </BooksListStyle>
  );
}

interface BooksListStyleProps {
  view: ViewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)')};
  gap: 24px;
`;
