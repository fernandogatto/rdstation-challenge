import { RECOMMENDATION_TYPES } from '../../constants/recommendation/recommendationTypes';
import mockProducts from '../../mocks/mockProducts';
import { getRecommendations } from './getRecommendations.service';

describe('getRecommendations Service', () => {
  const createFormData = () => ({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
  });

  describe('1. Receber preferências do usuário via formulário', () => {
    test('deve aceitar formData completo', () => {
      const formData = createFormData({
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    test('deve usar valores padrão quando formData estiver vazio', () => {
      const result = getRecommendations({}, mockProducts);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    test('deve usar valores padrão quando formData for undefined', () => {
      const result = getRecommendations(undefined, mockProducts);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    test('deve mesclar formData parcial com valores padrão', () => {
      const partialFormData = {
        selectedPreferences: ['Automação de marketing'],
        // selectedFeatures e selectedRecommendationType usarão valores padrão
      };

      const result = getRecommendations(partialFormData, mockProducts);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    test('deve lidar com arrays vazios nas preferências', () => {
      const formData = createFormData({
        selectedPreferences: [],
        selectedFeatures: [],
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });
});
