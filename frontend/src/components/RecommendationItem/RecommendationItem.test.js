import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommenationItem from '.';

describe('RecommendationItem Component - Testes Unitários', () => {
  const mockRecommendationComplete = {
    id: 1,
    name: 'RD Station CRM',
    category: 'Vendas',
    relevance: 1,
  };

  const mockRecommendationMinimal = {
    id: 2,
    name: 'RD Station Marketing',
  };

  const mockRecommendationWithCategory = {
    id: 3,
    name: 'RD Conversas',
    category: 'Omnichannel',
  };

  const mockRecommendationWithRelevance = {
    id: 4,
    name: 'RD Mentor AI',
    relevance: 1,
  };

  describe('Renderização básica', () => {
    test('deve renderizar o nome da recomendação', () => {
      render(<RecommenationItem recommendation={mockRecommendationMinimal} />);

      expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    });
  });

  describe('Renderização da categoria', () => {
    test('deve renderizar a categoria quando fornecida', () => {
      render(
        <RecommenationItem recommendation={mockRecommendationWithCategory} />
      );

      const categoria = screen.getByText('Omnichannel');
      expect(categoria).toBeInTheDocument();
    });

    test('não deve renderizar a categoria quando não fornecida', () => {
      render(<RecommenationItem recommendation={mockRecommendationMinimal} />);

      const categoriaElements = screen.queryAllByTestId('categoria');
      expect(categoriaElements).toHaveLength(0);
    });
  });

  describe('Renderização da relevância', () => {
    test('deve renderizar a relevância quando fornecida como número', () => {
      render(
        <RecommenationItem recommendation={mockRecommendationWithRelevance} />
      );

      expect(screen.getByText('Relevância:')).toBeInTheDocument();
      expect(screen.getByText('1.00')).toBeInTheDocument();
    });

    test('deve formatar a relevância com duas casas decimais', () => {
      const recommendationDecimalRelevance = {
        ...mockRecommendationWithRelevance,
        relevance: 0.873456,
      };
      render(
        <RecommenationItem recommendation={recommendationDecimalRelevance} />
      );

      expect(screen.getByText('0.87')).toBeInTheDocument();
    });
  });

  describe('Renderização completa', () => {
    test('deve renderizar todos os elementos quando todas as props estão presentes', () => {
      render(<RecommenationItem recommendation={mockRecommendationComplete} />);

      // Nome
      expect(screen.getByText('RD Station CRM')).toBeInTheDocument();

      // Categoria
      expect(screen.getByText('Vendas')).toBeInTheDocument();

      // Relevância
      expect(screen.getByText('Relevância:')).toBeInTheDocument();
      expect(screen.getByText('1.00')).toBeInTheDocument();
    });
  });
});
