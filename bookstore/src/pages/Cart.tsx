import styled from 'styled-components';
import { Title } from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

const Cart = () => {
  const { carts } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    // 언체크
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((cartItem) => cartItem !== id));
    }
    //체크
    setCheckedItems([...checkedItems, id]);
  };

  return (
    <>
      <Title size={'large'}>장바구니</Title>{' '}
      <CartStyle>
        <div className='content'>
          {carts.map((item) => (
            <CartItem key={item.id} cart={item} checkedItems={checkedItems} onCheck={handleCheckItem} />
          ))}
        </div>
        <div className='summary'></div>
      </CartStyle>
    </>
  );
};

export default Cart;

const CartStyle = styled.div``;
