import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </div>
  );
};
const LayoutStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
`;

export default Layout;
