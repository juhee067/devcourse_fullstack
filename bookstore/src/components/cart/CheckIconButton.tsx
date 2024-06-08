import React from 'react';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  isChecked: boolean;
  // 클린된 상태를 전달만 해준다
  onCheck: () => void;
}

const CheckIconButton = ({ isChecked, onCheck }: Props) => {
  return (
    <CheckIconButtonStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </CheckIconButtonStyle>
  );
};

const CheckIconButtonStyle = styled.button`
  background-color: none;
  border: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default CheckIconButton;
