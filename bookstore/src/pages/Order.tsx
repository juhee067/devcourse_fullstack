import React from 'react';
import { useLocation } from 'react-router-dom';
import { Title } from '../components/common/Title';
import styled from 'styled-components';
import { CartStyle } from './Cart';
import CartSummary from '../components/cart/CartSummary';

const Order = () => {
  const location = useLocation();
  const orderDataFromCart = location.state;
  const { totalPrice, totalQuantity } = orderDataFromCart;
  return (
    <div>
      <Title size={'large'}>주문서 작성</Title>
      <CartStyle>
        <div className='content'></div>
        <div className='summary'>
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
        </div>
      </CartStyle>
    </div>
  );
};

export default Order;
