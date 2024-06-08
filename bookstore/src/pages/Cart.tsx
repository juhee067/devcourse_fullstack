import styled from 'styled-components';
import { Title } from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

const Cart = () => {
  const { carts } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  return (
    <>
      <Title size={'large'}>장바구니</Title>{' '}
      <CartStyle>
        <div className='content'>
          {carts.map((item) => (
            <CartItem key={item.id} cart={item} checkedItems={checkedItems} />
          ))}
        </div>
        <div className='summary'></div>
      </CartStyle>
    </>
  );
};

export default Cart;

const CartStyle = styled.div``;
