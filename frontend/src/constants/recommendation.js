// Tipos de recomendação disponíveis
export const RECOMMENDATION_TYPES = {
  SINGLE_PRODUCT: 'SingleProduct',
  MULTIPLE_PRODUCTS: 'MultipleProducts',
};

// Configuração padrão para formulário de recomendação
export const DEFAULT_FORM_DATA = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
};

// Mensagens de erro
export const ERROR_MESSAGES = {
  INVALID_PRODUCTS: 'Products deve ser um array',
  INVALID_FORM_DATA: 'FormData deve ser um objeto',
  RECOMMENDATION_ERROR: 'Erro ao gerar recomendações',
};
