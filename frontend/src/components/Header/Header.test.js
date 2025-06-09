import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '.';
import { useTheme } from '../../hooks/useTheme';

// Mock useTheme hook
jest.mock('../../hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

describe('Header Component - Testes Unitários', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('renderiza o cabeçalho com título', () => {
    useTheme.mockReturnValue({ theme: 'light', toggleTheme: mockToggleTheme });
    render(<Header />);

    const titulo = screen.getByText('RD Station');
    expect(titulo).toBeInTheDocument();
  });

  test('chama toggleTheme quando o botão é clicado', () => {
    useTheme.mockReturnValue({ theme: 'light', toggleTheme: mockToggleTheme });
    render(<Header />);

    const botao = screen.getByRole('button', { name: /Ativar tema escuro/i });
    fireEvent.click(botao);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
