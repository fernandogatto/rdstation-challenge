import { getRecommendationStats } from './getRecommendationStats.service';

describe('getRecommendationStats Service', () => {
  test('deve calcular estatísticas para múltiplas recomendações', () => {
    const recommendations = [{ relevance: 2 }, { relevance: 1 }];

    const result = getRecommendationStats(recommendations);

    expect(result).toEqual({
      totalRecommendations: 2,
      averageRelevance: 1.5,
      maxRelevance: 2,
      minRelevance: 1,
    });
  });

  test('deve calcular estatísticas para uma única recomendação', () => {
    const recommendations = [{ relevance: 2 }];

    const result = getRecommendationStats(recommendations);

    expect(result).toEqual({
      totalRecommendations: 1,
      averageRelevance: 2,
      maxRelevance: 2,
      minRelevance: 2,
    });
  });

  test('deve retornar valores zerados para array vazio', () => {
    const result = getRecommendationStats([]);

    expect(result).toEqual({
      totalRecommendations: 0,
      averageRelevance: 0,
      maxRelevance: 0,
      minRelevance: 0,
    });
  });

  test('deve retornar valores zerados para entrada inválida', () => {
    expect(getRecommendationStats(null)).toEqual({
      totalRecommendations: 0,
      averageRelevance: 0,
      maxRelevance: 0,
      minRelevance: 0,
    });

    expect(getRecommendationStats(undefined)).toEqual({
      totalRecommendations: 0,
      averageRelevance: 0,
      maxRelevance: 0,
      minRelevance: 0,
    });
  });

  test('deve arredondar a média para 2 casas decimais', () => {
    const recommendations = [{ relevance: 2 }, { relevance: 1 }];

    const result = getRecommendationStats(recommendations);

    expect(result.averageRelevance).toBe(1.5);
  });

  test('deve funcionar com valores decimais', () => {
    const recommendations = [{ relevance: 3.33 }, { relevance: 6.67 }];

    const result = getRecommendationStats(recommendations);

    expect(result.totalRecommendations).toBe(2);
    expect(result.averageRelevance).toBe(5.0);
    expect(result.maxRelevance).toBe(6.67);
    expect(result.minRelevance).toBe(3.33);
  });
});
