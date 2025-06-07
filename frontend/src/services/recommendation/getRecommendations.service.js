import { DEFAULT_FORM_DATA } from '../../constants/recommendation/defaultFormData';
import { addRelevanceScore } from '../../utils/recommendation/addRelevanceScore';
import { applyRecommendationType } from '../../utils/recommendation/applyRecommendationType';
import { filterRelevantProducts } from '../../utils/recommendation/filterRelevantProducts';
import { sortByRelevance } from '../../utils/recommendation/sortByRelevance';

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
export const getRecommendations = (formData = {}, products = []) => {
  try {
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
