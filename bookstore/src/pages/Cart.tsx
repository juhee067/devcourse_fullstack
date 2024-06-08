import React from 'react';
import styled from 'styled-components';
import { Title } from '../components/common/Title';

const Cart = () => {
  return (
    <>
      <Title size={'large'}>장바구니</Title>{' '}
      <CartStyle>
        <div className='content'></div>
        <div className='summary'></div>
      </CartStyle>
    </>
  );
};

export default Cart;

const CartStyle = styled.div``;
