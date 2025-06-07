/**
 * Obtém estatísticas das recomendações
 * @param {Object[]} recommendations - Lista de recomendações
 * @returns {Object} Estatísticas das recomendações
 */
export const getRecommendationStats = (recommendations) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return {
      totalRecommendations: 0,
      averageRelevance: 0,
      maxRelevance: 0,
      minRelevance: 0,
    };
  }

  const relevanceScores = recommendations
    .map((r) => r.relevance)
    .filter((score) => typeof score === 'number' && !isNaN(score));
  const total = relevanceScores.reduce((sum, score) => sum + score, 0);

  return {
    totalRecommendations: recommendations.length,
    averageRelevance: Number((total / recommendations.length).toFixed(2)),
    maxRelevance: Math.max(...relevanceScores),
    minRelevance: Math.min(...relevanceScores),
  };
};
