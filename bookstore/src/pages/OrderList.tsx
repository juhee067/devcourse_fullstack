import React from 'react';
import styled from 'styled-components';

const OrderList = () => {
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
            <tr>
              <td>12345</td>
              <td>2024-06-09</td>
              <td>배송 중</td>
              <td>홍길동</td>
              <td>010-1234-5678</td>
              <td>상품 A</td>
              <td>2</td>
              <td>₩50,000</td>
            </tr>
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

export default OrderList;

const OrderListStyle = styled.div``;
