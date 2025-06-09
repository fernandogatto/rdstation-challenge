import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('SubmitButton Component - Testes Unitários', () => {
  test('renderiza o botão com texto correto', () => {
    render(<SubmitButton text="Submit" />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
  });

  test('tem o tipo de botão correto', () => {
    render(<SubmitButton text="Submit" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('aplica as classes corretas', () => {
    render(<SubmitButton text="Submit" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded'
    );
  });

  test('renderiza com diferentes suportes de texto', () => {
    render(<SubmitButton text="Save" />);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Save');
  });
});
