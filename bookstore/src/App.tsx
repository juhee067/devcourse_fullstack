import Layout from './layout/Layout';
import Home from './pages/Home';

import { BookStoreThemeProvider } from './context/themeContext';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/common/Error';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Cart from './pages/Cart';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/signin',
        element: <Login />,
      },
      {
        path: '/reset',
        element: <ResetPassword />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book/:bookId',
        element: <BookDetail />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
