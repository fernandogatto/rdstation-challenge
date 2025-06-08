import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';

jest.mock('../hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    products: [],
  }),
}));

jest.mock('../hooks/useRecommendations', () => ({
  __esModule: true,
  default: () => ({
    recommendations: [],
    recommendationStats: {
      total: 0,
      averageRelevance: 0,
      maxRelevance: 0,
      minRelevance: 0,
    },
    onUpdateRecommendations: jest.fn(),
  }),
}));

// Mock dos componentes filhos
jest.mock('../components/Form/Form', () => {
  return function MockForm({ onUpdateRecommendations }) {
    return (
      <div data-testid="form-component">
        <button onClick={() => onUpdateRecommendations([])}>
          Obter recomendação
        </button>
      </div>
    );
  };
});

jest.mock('../components/RecommendationList', () => {
  return function MockRecommendationList({ recommendations, stats }) {
    return (
      <div data-testid="recommendation-list-component">
        <span data-testid="recommendations-count">
          {recommendations.length}
        </span>
        <span data-testid="stats-total">{stats.total}</span>
      </div>
    );
  };
});

describe('Home Component - Testes Unitários', () => {
  test('deve renderizar o título principal', () => {
    render(<Home />);

    const titulo = screen.getByText('Recomendador de Produtos RD Station');
    expect(titulo).toBeInTheDocument();
  });

  test('deve renderizar o título da seção de filtros', () => {
    render(<Home />);

    const tituloFiltros = screen.getByText('Filtros e Configurações');
    expect(tituloFiltros).toBeInTheDocument();
  });
});

describe('Home Component - Testes de Integração', () => {
  test('deve renderizar todos os elementos principais da página', () => {
    render(<Home />);

    // Verifica se todos os elementos principais estão presentes
    expect(
      screen.getByText('Recomendador de Produtos RD Station')
    ).toBeInTheDocument();
    expect(screen.getByText('Filtros e Configurações')).toBeInTheDocument();
    expect(screen.getByTestId('form-component')).toBeInTheDocument();
    expect(
      screen.getByTestId('recommendation-list-component')
    ).toBeInTheDocument();
  });

  test('deve renderizar o Form', () => {
    render(<Home />);

    // Verifica se o Form foi renderizado
    const formButton = screen.getByText('Obter recomendação');
    expect(formButton).toBeInTheDocument();
  });

  test('deve passar as props corretas para RecommendationList', () => {
    render(<Home />);

    // Verifica se as props estão sendo passadas corretamente
    expect(screen.getByTestId('recommendations-count')).toHaveTextContent('0');
    expect(screen.getByTestId('stats-total')).toHaveTextContent('0');
  });
});
