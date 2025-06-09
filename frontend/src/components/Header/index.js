import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="theme-bg-primary theme-border theme-transition w-full flex items-center justify-between  p-4"
      style={{ borderBottomWidth: '1px' }}
    >
      <h1 className="theme-text-primary theme-transition text-2xl font-bold">
        RD Station
      </h1>

      <button
        onClick={toggleTheme}
        className="toggle-button theme-transition p-2 rounded-lg theme-bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={
          theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'
        }
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-gray-600" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
      </button>
    </header>
  );
};

export default Header;
