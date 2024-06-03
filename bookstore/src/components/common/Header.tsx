import { styled } from 'styled-components';
//import ThemeSwitcher from '../header/ThemeSwitch';
import logo from '../../assets/images/logo.svg';
import { FaSignInAlt, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useCategory } from '../../hooks/useCategory';

const CategoryList = () => {
  const { category } = useCategory();
  console.log(category);
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

const Auth = () => (
  <nav className='auth'>
    <ul>
      <li>
        <a href='/signIn'>
          <FaSignInAlt /> 로그인
        </a>
      </li>
      <li>
        <a href='/signUp'>
          <FaRegUser />
          회원가입
        </a>
      </li>
    </ul>
  </nav>
);

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
        a {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;
          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;

export default Header;
