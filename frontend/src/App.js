import { ThemeProvider } from './hooks/useTheme';
import DefaultLayout from './layouts/DefaultLayout';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default App;
