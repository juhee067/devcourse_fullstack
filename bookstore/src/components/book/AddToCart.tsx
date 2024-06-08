import React, { useState } from 'react';
import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';
import { addCart } from '../../api/carts.api';

import { Link } from 'react-router-dom';

interface Props {
  book: BookDetail;
}

const AddToCart = ({ book }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);

  const [cartAdded, setCartAdded] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    addCart({
      book_id: book.id,
      quantity: quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };
  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText inputType='number' value={quantity} onChange={handleChange} />
        <Button size={'medium'} scheme={'normal'} onClick={handleIncrease}>
          +
        </Button>
        <Button size={'medium'} scheme={'primary'} onClick={handleDecrease}>
          -
        </Button>
      </div>

      <Button size={'medium'} scheme={'primary'} onClick={addToCart}>
        장바구니 담기
      </Button>

      <div className='added'>
        <p>장바구니에 추가되었습니다.</p>
        <Link to='/cart'>장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
};

export default AddToCart;

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? '1' : '0')};
    transition: all 0.5s ease;
  }

  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`;
