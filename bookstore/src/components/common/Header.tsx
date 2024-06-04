import { styled } from 'styled-components';
//import ThemeSwitcher from '../header/ThemeSwitch';
import logo from '../../assets/images/logo.svg';
import { FaSignInAlt, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useCategory } from '../../hooks/useCategory';
import { useAuthStore } from '../../store/authStore';

const CategoryList = () => {
  const { category } = useCategory();
  return (
    <nav className='category'>
      <ul>
        {category.map((item) => (
          <li key={item.id}>
            <Link to={item.id === null ? `/books?` : `/books?category_id=${item.id}`}>
              {item.category_name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Auth = () => {
  const { isLoggedIn, storeLogout } = useAuthStore();
  return (
    <nav className='auth'>
      {isLoggedIn ? (
        <ul>
          <li>
            <Link to='/cart'>장바구니</Link>
          </li>
          <li>
            <Link to='/orderlist'>주문 내역</Link>
          </li>
          <li>
            <button onClick={storeLogout}>로그아웃</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/signIn'>
              <FaSignInAlt /> 로그인
            </Link>
          </li>
          <li>
            <Link to='/signIn'>
              <FaRegUser />
              회원가입
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

const Header = () => {
  return (
    <HeaderStyle>
      <h1 className='logo'>
        <img src={logo} alt='book' />
      </h1>
      <CategoryList />
      <Auth />
      {/* <ThemeSwitcher /> */}
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};

  .logo {
    img {
      width: 100px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;

      a {
        font-size: 1.5rem;
        font-weight: 600;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text};

        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;
          background-color: none;
          border: 0;
          cursor: pointer;
          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;

export default Header;
