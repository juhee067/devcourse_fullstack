import styled from 'styled-components';
import Button from '../common/Button';
import { FaList, FaTh } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';
import { QUERYSTRING } from '../../constants/querystring';

const viewOptions = [
  {
    value: 'list',
    icon: <FaList />,
  },
  {
    value: 'grid',
    icon: <FaTh />,
  },
];

export type ViewMode = 'grid' | 'list';

export default function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) handleSwitch('grid');
  }, []);

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);

    setSearchParams(newSearchParams);
  };
  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <div key={option.value} onClick={() => handleSwitch(option.value as ViewMode)}>
          <Button
            size='medium'
            scheme={searchParams.get(QUERYSTRING.VIEW) === option.value ? 'primary' : 'normal'}
            key={option.value}
          >
            {option.icon}
          </Button>
        </div>
      ))}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: white;
  }
`;
