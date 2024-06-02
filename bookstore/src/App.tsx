import Layout from './layout/Layout';
import Home from './pages/Home';

import { BookStoreThemeProvider } from './context/themeContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/common/Error';
const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  {
    path: '/books',
    element: <div>도서목록</div>,
  },
]);

function App() {
  return (
    <BookStoreThemeProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
