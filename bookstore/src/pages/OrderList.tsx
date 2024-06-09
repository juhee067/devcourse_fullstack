import React from 'react';
import styled from 'styled-components';
import { Title } from '../components/common/Title';
import { useOrders } from '../hooks/useOrders';
import { formatNumber } from '../utils/format';

const OrderList = () => {
  const { orders, selectOrderItem } = useOrders();
  return (
    <>
      <Title size='large'>주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>주문 ID</th>
              <th>주문 일자</th>
              <th>상태</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdAt}</td>
                <td>{order.address}</td>
                <td>{order.receiver}</td>
                <td>{order.contact}</td>
                <td>{order.bookTitle}</td>
                <td>{order.totalQuantity}</td>
                <td>{formatNumber(order.totalPrice)} 권</td>
              </tr>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

export default OrderList;

const OrderListStyle = styled.div``;
