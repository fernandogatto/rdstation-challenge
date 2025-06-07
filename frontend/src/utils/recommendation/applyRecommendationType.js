import { RECOMMENDATION_TYPES } from '../../constants/recommendation/recommendationTypes';

/**
 * Aplica o tipo de recomendação selecionado
 * Para SingleProduct: retorna o último produto válido em caso de empate
 * @param {Object[]} products - Produtos ordenados
 * @param {string} recommendationType - Tipo de recomendação
 * @returns {Object[]} Produtos filtrados pelo tipo de recomendação
 */
export const applyRecommendationType = (products, recommendationType) => {
  if (recommendationType === RECOMMENDATION_TYPES.SINGLE_PRODUCT) {
    if (products.length === 0) return [];

    // Encontra a maior relevância
    const maxRelevance = products[0].relevance;

    // Filtra todos os produtos com a maior relevância
    const topProducts = products.filter(
      (product) => product.relevance === maxRelevance
    );

    // Retorna o último produto válido (em caso de empate)
    return [topProducts[topProducts.length - 1]];
  }

  return products;
};
