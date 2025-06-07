import { calculateProductRelevance } from './calculateProductRelevance';

/**
 * Adiciona pontuação de relevância aos produtos
 * @param {Object[]} products - Lista de produtos
 * @param {string[]} preferences - Preferências selecionadas
 * @param {string[]} features - Características selecionadas
 * @returns {Object[]} Produtos com pontuação de relevância
 */
export const addRelevanceScore = (products, preferences, features) => {
  return products.map((product) => ({
    ...product,
    relevance: calculateProductRelevance(product, preferences, features),
  }));
};
