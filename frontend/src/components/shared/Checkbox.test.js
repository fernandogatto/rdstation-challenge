import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox Component - Testes Unitários', () => {
  test('renderiza o checkbox com label', () => {
    render(<Checkbox>Texto</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Texto');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox pode ser marcado e desmarcado', () => {
    render(<Checkbox>Texto</Checkbox>);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox desabilitado não pode ser marcado', () => {
    render(<Checkbox disabled>Texto</Checkbox>);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeDisabled();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBe();
  });
});
