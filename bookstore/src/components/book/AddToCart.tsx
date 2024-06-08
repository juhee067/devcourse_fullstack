import React, { useState } from 'react';
import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';

interface Props {
  book: BookDetail;
}

const AddToCart = ({ book }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);

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
  return (
    <AddToCartStyle>
      <div>
        <InputText inputType='number' value={quantity} onChange={handleChange} />
        <Button size={'medium'} scheme={'normal'} onClick={handleIncrease}>
          +
        </Button>
        <Button size={'medium'} scheme={'primary'} onClick={handleDecrease}>
          -
        </Button>
      </div>

      <Button size={'medium'} scheme={'primary'}>
        장바구니 담기
      </Button>
    </AddToCartStyle>
  );
};

export default AddToCart;

const AddToCartStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
