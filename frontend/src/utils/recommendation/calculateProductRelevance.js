/**
 * Calcula a relevância de um produto baseado nas preferências e características selecionadas
 * @param {Object} product - Produto a ser avaliado
 * @param {string[]} preferences - Lista de preferências selecionadas
 * @param {string[]} features - Lista de características selecionadas
 * @returns {number} Pontuação de relevância do produto
 */
export const calculateProductRelevance = (
  product,
  preferences = [],
  features = []
) => {
  if (!product?.preferences || !product?.features) {
    return 0;
  }

  const preferenceMatches = preferences.filter((pref) =>
    product.preferences.includes(pref)
  ).length;

  const featureMatches = features.filter((feature) =>
    product.features.includes(feature)
  ).length;

  return preferenceMatches + featureMatches;
};
