import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsCard from '.';

describe('StatsCard Component - Testes Unitários', () => {
  // Teste básico de renderização
  test('renderiza com props básicas', () => {
    render(<StatsCard title="Teste" value={100} />);

    expect(screen.getByText('Teste')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  // Teste da cor padrão (blue)
  test('aplica cor azul por padrão', () => {
    render(<StatsCard title="Teste" value={100} />);
    const cardElement = screen.getByTestId('stats-card');

    expect(cardElement).toHaveClass('bg-blue-50');
    expect(screen.getByText('Teste')).toHaveClass('text-blue-600');
    expect(screen.getByText('100')).toHaveClass('text-blue-900');
  });

  // Teste de cores específicas
  test('aplica cor verde quando especificada', () => {
    render(<StatsCard title="Teste" value={100} color="green" />);
    const cardElement = screen.getByTestId('stats-card');

    expect(cardElement).toHaveClass('bg-green-50');
    expect(screen.getByText('Teste')).toHaveClass('text-green-600');
    expect(screen.getByText('100')).toHaveClass('text-green-900');
  });

  test('aplica cor roxa quando especificada', () => {
    render(<StatsCard title="Teste" value={100} color="purple" />);
    const cardElement = screen.getByTestId('stats-card');

    expect(cardElement).toHaveClass('bg-purple-50');
    expect(screen.getByText('Teste')).toHaveClass('text-purple-600');
    expect(screen.getByText('100')).toHaveClass('text-purple-900');
  });

  test('aplica cor laranja quando especificada', () => {
    render(<StatsCard title="Teste" value={100} color="orange" />);
    const cardElement = screen.getByTestId('stats-card');

    expect(cardElement).toHaveClass('bg-orange-50');
    expect(screen.getByText('Teste')).toHaveClass('text-orange-600');
    expect(screen.getByText('100')).toHaveClass('text-orange-900');
  });

  // Teste para cor inválida
  test('usa cor azul para cor inválida', () => {
    render(<StatsCard title="Teste" value={100} color="invalid" />);
    const cardElement = screen.getByTestId('stats-card');

    expect(cardElement).toHaveClass('bg-blue-50');
    expect(screen.getByText('Teste')).toHaveClass('text-blue-600');
    expect(screen.getByText('100')).toHaveClass('text-blue-900');
  });

  // Teste de estrutura HTML
  test('mantém estrutura HTML correta', () => {
    render(<StatsCard title="Total de Recomendações" value={2} />);
    // Verifica se tem 2 elementos filhos (title e value)
    const titleElement = screen.getByText('Total de Recomendações');
    const valueElement = screen.getByText('2');

    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  // Teste com diferentes tipos de valores
  test('renderiza diferentes tipos de valores', () => {
    // String
    render(<StatsCard title="Status" value="Ativo" />);
    expect(screen.getByText('Ativo')).toBeInTheDocument();

    // Número zero
    render(<StatsCard title="Zero" value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();

    // Número negativo
    render(<StatsCard title="Negativo" value={-50} />);
    expect(screen.getByText('-50')).toBeInTheDocument();
  });
});
