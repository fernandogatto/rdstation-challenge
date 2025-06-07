/**
 * Tipos de recomendação disponíveis
 */
const RECOMMENDATION_TYPES = {
  SINGLE_PRODUCT: 'SingleProduct',
  MULTIPLE_PRODUCTS: 'MultipleProducts',
};

/**
 * Configuração padrão para formulário de recomendação
 */
const DEFAULT_FORM_DATA = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
};

/**
 * Calcula a relevância de um produto baseado nas preferências e características selecionadas
 * @param {Object} product - Produto a ser avaliado
 * @param {string[]} preferences - Lista de preferências selecionadas
 * @param {string[]} features - Lista de características selecionadas
 * @returns {number} Pontuação de relevância do produto
 */
const calculateProductRelevance = (
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

/**
 * Adiciona pontuação de relevância aos produtos
 * @param {Object[]} products - Lista de produtos
 * @param {string[]} preferences - Preferências selecionadas
 * @param {string[]} features - Características selecionadas
 * @returns {Object[]} Produtos com pontuação de relevância
 */
const addRelevanceScore = (products, preferences, features) => {
  return products.map((product) => ({
    ...product,
    relevance: calculateProductRelevance(product, preferences, features),
  }));
};

/**
 * Filtra produtos com relevância maior que zero
 * @param {Object[]} products - Produtos com pontuação de relevância
 * @returns {Object[]} Produtos relevantes
 */
const filterRelevantProducts = (products) => {
  return products.filter((product) => product.relevance > 0);
};

/**
 * Ordena produtos por relevância (maior para menor)
 * Em caso de empate, mantém a ordem original (último produto válido fica por último)
 * @param {Object[]} products - Produtos a serem ordenados
 * @returns {Object[]} Produtos ordenados por relevância
 */
const sortByRelevance = (products) => {
  return [...products].sort((a, b) => {
    const relevanceDiff = b.relevance - a.relevance;
    // Se as relevâncias são iguais, mantém a ordem original
    // (sort estável garante que o último elemento permanece por último)
    return relevanceDiff;
  });
};

/**
 * Aplica o tipo de recomendação selecionado
 * Para SingleProduct: retorna o último produto válido em caso de empate
 * @param {Object[]} products - Produtos ordenados
 * @param {string} recommendationType - Tipo de recomendação
 * @returns {Object[]} Produtos filtrados pelo tipo de recomendação
 */
const applyRecommendationType = (products, recommendationType) => {
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

/**
 * Valida os dados de entrada
 * @param {Object} formData - Dados do formulário
 * @param {Object[]} products - Lista de produtos
 * @throws {Error} Se os dados forem inválidos
 */
const validateInput = (formData, products) => {
  if (!Array.isArray(products)) {
    throw new Error('Products deve ser um array');
  }

  if (formData && typeof formData !== 'object') {
    throw new Error('FormData deve ser um objeto');
  }
};

/**
 * Obtém recomendações de produtos baseado nas preferências e características selecionadas
 * @param {Object} formData - Dados do formulário com seleções do usuário
 * @param {string[]} formData.selectedPreferences - Preferências selecionadas
 * @param {string[]} formData.selectedFeatures - Características selecionadas
 * @param {string} formData.selectedRecommendationType - Tipo de recomendação
 * @param {Object[]} products - Lista de produtos disponíveis
 * @returns {Object[]} Lista de produtos recomendados ordenados por relevância
 * @throws {Error} Se houver erro na validação dos dados
 */
const getRecommendations = (formData = {}, products = []) => {
  try {
    validateInput(formData, products);

    // Merge com valores padrão
    const config = { ...DEFAULT_FORM_DATA, ...formData };
    const {
      selectedPreferences,
      selectedFeatures,
      selectedRecommendationType,
    } = config;

    // Pipeline de processamento
    const productsWithRelevance = addRelevanceScore(
      products,
      selectedPreferences,
      selectedFeatures
    );

    const relevantProducts = filterRelevantProducts(productsWithRelevance);
    const sortedProducts = sortByRelevance(relevantProducts);

    return applyRecommendationType(sortedProducts, selectedRecommendationType);
  } catch (error) {
    console.error('Erro ao gerar recomendações:', error);
    return [];
  }
};

/**
 * Obtém estatísticas das recomendações
 * @param {Object[]} recommendations - Lista de recomendações
 * @returns {Object} Estatísticas das recomendações
 */
const getRecommendationStats = (recommendations) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return {
      totalRecommendations: 0,
      averageRelevance: 0,
      maxRelevance: 0,
      minRelevance: 0,
    };
  }

  const relevanceScores = recommendations.map((r) => r.relevance);
  const total = relevanceScores.reduce((sum, score) => sum + score, 0);

  return {
    totalRecommendations: recommendations.length,
    averageRelevance: Number((total / recommendations.length).toFixed(2)),
    maxRelevance: Math.max(...relevanceScores),
    minRelevance: Math.min(...relevanceScores),
  };
};

export default {
  getRecommendations,
  getRecommendationStats,
  RECOMMENDATION_TYPES,
};
