import styled from 'styled-components';
import { Title } from '../components/common/Title'; // 필요한 컴포넌트를 임포트
import { formatNumber } from '../utils/format'; // 필요한 유틸리티 함수를 임포트
import Button from '../common/Button';
import CheckIconButton from './CheckIconButton';

interface CartItemProps {
  cart: {
    title: string;
    summary: string;
    price: number;
    quantity: number;
  };
}

function CartItem({ cart }: CartItemProps) {
  return (
    <CartItemStyle>
      <div className='info'>
        <CheckIconButton />
        <div>
          <Title size='medium' color='text'>
            {cart.title}
          </Title>
          <p className='summary'>{cart.summary}</p>
          <p className='price'>{formatNumber(cart.price)} 원</p>
          <p className='quantity'>{cart.quantity} 권</p>
        </div>
      </div>
      <Button size='medium' scheme='normal'>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;
  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`;

export default CartItem;
