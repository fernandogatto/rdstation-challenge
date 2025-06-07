/**
 * Filtra produtos com relevância maior que zero
 * @param {Object[]} products - Produtos com pontuação de relevância
 * @returns {Object[]} Produtos relevantes
 */
export const filterRelevantProducts = (products) => {
  return products.filter((product) => product.relevance > 0);
};
