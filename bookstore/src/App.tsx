import Layout from './layout/Layout';
import Home from './pages/Home';

import { BookStoreThemeProvider } from './context/themeContext';
import Header from './components/common/Header';

function App() {
  return (
    <BookStoreThemeProvider>
      <Header />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
