import Layout from './layout/Layout';
import Home from './pages/Home';

import ThemeSwitch from './components/header/ThemeSwitch';
import { useContext } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';

function App() {
  const { themeName, setThemeName } = useContext(ThemeContext);

  return (
    <BookStoreThemeProvider>
      <ThemeSwitch />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
