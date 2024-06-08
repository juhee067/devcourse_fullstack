import React from 'react';
import styled from 'styled-components';
import { Title } from '../components/common/Title';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
  return (
    <>
      <Title size={'large'}>장바구니</Title>{' '}
      <CartStyle>
        <div className='content'>
          <CartItem />
        </div>
        <div className='summary'></div>
      </CartStyle>
    </>
  );
};

export default Cart;

const CartStyle = styled.div``;
