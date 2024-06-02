import styled from 'styled-components';
import { ButtonSchema, ButtonSize } from '../../style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonSchema;
  isDisabled?: boolean;
  isLoading?: boolean;
}
const Button = ({ children, size, scheme, isDisabled, isLoading }: Props) => {
  return (
    <ButtonStyle size={size} scheme={scheme} isDisabled={isDisabled} isLoading={isLoading}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  cursor: ${({ isDisabled }) => (isDisabled ? 'none' : 'pointer')};
`;

export default Button;
