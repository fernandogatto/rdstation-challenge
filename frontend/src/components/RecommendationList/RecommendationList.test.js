import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationList from '.';

describe('RecommendationList Component - Testes Unitários', () => {
  const mockStatsEmpty = {
    total: 0,
    averageRelevance: 0,
    maxRelevance: 0,
    minRelevance: 0,
  };

  const mockStatsWithData = {
    total: 2,
    averageRelevance: 1.5,
    maxRelevance: 2,
    minRelevance: 1,
  };

  const mockRecommendations = [
    {
      id: 1,
      name: 'RD Station CRM',
      relevance: 2,
    },
    {
      id: 2,
      name: 'RD Station Marketing',
      relevance: 1,
    },
  ];

  describe('Estado inicial - sem recomendações', () => {
    test('deve renderizar o título das estatísticas', () => {
      render(
        <RecommendationList recommendations={[]} stats={mockStatsEmpty} />
      );

      const titulo = screen.getByText('Estatísticas das Recomendações');
      expect(titulo).toBeInTheDocument();
    });

    test('deve mostrar todos as opções de estatísticas', () => {
      render(
        <RecommendationList recommendations={[]} stats={mockStatsEmpty} />
      );

      expect(screen.getByText('Total de Recomendações')).toBeInTheDocument();
      expect(screen.getByText('Relevância Média')).toBeInTheDocument();
      expect(screen.getByText('Máxima Relevância')).toBeInTheDocument();
      expect(screen.getByText('Mínima Relevância')).toBeInTheDocument();
    });

    test('deve mostrar todas as estatísticas zeradas', () => {
      render(
        <RecommendationList recommendations={[]} stats={mockStatsEmpty} />
      );

      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBeGreaterThanOrEqual(2); // Total e Relevâncias max/min

      const mediaZero = screen.getByText('0.00');
      expect(mediaZero).toBeInTheDocument();
    });

    test('deve renderizar todas as recomendações', () => {
      render(
        <RecommendationList
          recommendations={mockRecommendations}
          stats={mockStatsWithData}
        />
      );

      expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
      expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    });

    test('deve renderizar o título da lista de recomendações', () => {
      render(
        <RecommendationList recommendations={[]} stats={mockStatsEmpty} />
      );

      const titulo = screen.getByText('Lista de Recomendações');
      expect(titulo).toBeInTheDocument();
    });

    test('deve mostrar a mensagem de nenhum resultado encontrado', () => {
      render(
        <RecommendationList recommendations={[]} stats={mockStatsEmpty} />
      );

      const mensagem = screen.getByText('Nenhum resultado encontrado');
      expect(mensagem).toBeInTheDocument();
    });
  });

  describe('Estado final - com recomendações', () => {
    test('deve mostrar as estatísticas corretas com dados', () => {
      render(
        <RecommendationList
          recommendations={mockRecommendations}
          stats={mockStatsWithData}
        />
      );

      expect(screen.getByText('Total de Recomendações')).toBeInTheDocument();
      expect(screen.getByText('Relevância Média')).toBeInTheDocument();
      expect(screen.getByText('Máxima Relevância')).toBeInTheDocument();
      expect(screen.getByText('Mínima Relevância')).toBeInTheDocument();

      // Verifica valores
      expect(screen.getByText('2')).toBeInTheDocument(); // Total
      expect(screen.getByText('1.50')).toBeInTheDocument(); // Média
      expect(screen.getByText('2')).toBeInTheDocument(); // Máxima
      expect(screen.getByText('1')).toBeInTheDocument(); // Mínima
    });

    test('deve renderizar todas as recomendações', () => {
      render(
        <RecommendationList
          recommendations={mockRecommendations}
          stats={mockStatsWithData}
        />
      );

      expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
      expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    });

    test('não deve mostrar a mensagem de nenhum resultado quando há recomendações', () => {
      render(
        <RecommendationList
          recommendations={mockRecommendations}
          stats={mockStatsWithData}
        />
      );

      expect(
        screen.queryByText('Nenhum resultado encontrado')
      ).not.toBeInTheDocument();
    });
  });
});
