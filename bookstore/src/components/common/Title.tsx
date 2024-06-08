import styled from 'styled-components';
import { ColorKey, HeadingSize } from '../../style/theme';

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

export const Title = ({ children, size, color }: Props) => {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  );
};

const TitleStyle = styled.h1<Omit<Props, 'children'>>`
  font-size: ${({ theme, size }) =>
    size ? theme.heading[size].fontSize : theme.heading['medium'].fontSize};
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.primary)};
`;
