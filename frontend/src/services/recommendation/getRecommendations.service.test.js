import { RECOMMENDATION_TYPES } from '../../constants/recommendation/recommendationTypes';
import mockProducts from '../../mocks/mockProducts';
import { getRecommendations } from './getRecommendations.service';

describe('getRecommendations Service', () => {
  const createFormData = (overrides = {}) => ({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'SingleProduct',
    ...overrides,
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

  describe('2. Retornar recomendações baseadas nas preferências', () => {
    test('deve retornar produto específico para preferência específica', () => {
      const formData = createFormData({
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('RD Conversas');
    });

    test('deve retornar produtos relevantes para múltiplas preferências', () => {
      const formData = createFormData({
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
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(2);
      expect(result.map((product) => product.name)).toEqual([
        'RD Station CRM',
        'RD Station Marketing',
      ]);
    });

    test('deve retornar lista vazia quando nenhum produto for relevante', () => {
      const formData = createFormData({
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: ['Característica inexistente'],
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toEqual([]);
    });
  });

  describe('3. Modo SingleProduct - retornar um produto', () => {
    test('deve retornar exatamente um produto no modo SingleProduct', () => {
      const formData = createFormData({
        selectedPreferences: ['Integração com chatbots'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('relevance');
    });

    test('deve retornar um produto mesmo quando múltiplos produtos são relevantes', () => {
      const formData = createFormData({
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('RD Station Marketing');
    });

    test('deve retornar lista vazia no modo SingleProduct quando nenhum produto for relevante', () => {
      const formData = createFormData({
        selectedPreferences: ['Preferência que não existe'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toEqual([]);
    });
  });

  describe('4. Modo MultipleProducts - retornar lista de produtos', () => {
    test('deve retornar múltiplos produtos no modo MultipleProducts', () => {
      const formData = createFormData({
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
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result.length).toBeGreaterThan(1);
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
    });

    test('deve ordenar produtos por relevância no modo MultipleProducts', () => {
      const formData = createFormData({
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      // Verifica se está ordenado por relevância (descendente)
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].relevance).toBeGreaterThanOrEqual(
          result[i + 1].relevance
        );
      }

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
    });

    test('deve retornar lista vazia no modo MultipleProducts quando nenhum produto for relevante', () => {
      const formData = createFormData({
        selectedPreferences: ['Preferência inexistente'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toEqual([]);
    });
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
