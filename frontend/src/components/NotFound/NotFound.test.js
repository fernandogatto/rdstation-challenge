import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '.';

describe('NotFound Component - Testes Unitários', () => {
  test('renderiza o componente com a estrutura correta', () => {
    render(<NotFound />);

    const container = screen.getByTestId('not-found-container');
    expect(container).toHaveClass('py-12', 'text-center');
  });

  test('exibe a mensagem "Nenhum resultado encontrado"', () => {
    render(<NotFound />);

    const message = screen.getByText('Nenhum resultado encontrado');
    expect(message).toBeInTheDocument();
  });
});
