import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';

// Mock dos hooks customizados
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
  return function MockForm() {
    return <div data-testid="form-component">Form Component</div>;
  };
});

jest.mock('../components/RecommendationList', () => {
  return function MockRecommendationList() {
    return (
      <div data-testid="recommendation-list-component">
        RecommendationList Component
      </div>
    );
  };
});

describe('Home Component', () => {
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
