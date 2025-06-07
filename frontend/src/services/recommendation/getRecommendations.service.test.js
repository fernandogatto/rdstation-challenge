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

  describe('5. Em caso de empate, retornar o último produto válido', () => {
    test('deve retornar o último produto em caso de empate no modo SingleProduct', () => {
      const formData = createFormData({
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('RD Station Marketing');
    });

    test('deve manter a ordem por relevância em caso de empate no modo MultipleProducts', () => {
      const formData = createFormData({
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result.length).toBeGreaterThan(1);
      expect(result[0].relevance).toBeGreaterThanOrEqual(result[1].relevance);

      // Se há empate, deve manter a ordem original
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
    });
  });

  describe('6. Lidar com diferentes tipos de preferências', () => {
    test('deve processar preferências de Vendas no modo SingleProduct', () => {
      const formData = createFormData({
        selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Vendas');
    });

    test('deve processar preferências de Vendas no modo MultipleProducts', () => {
      const formData = createFormData({
        selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Vendas');
    });

    test('deve processar preferências de Marketing no modo SingleProduct', () => {
      const formData = createFormData({
        selectedPreferences: ['Automação de marketing'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Marketing');
    });

    test('deve processar preferências de Marketing no modo MultipleProducts', () => {
      const formData = createFormData({
        selectedPreferences: ['Automação de marketing'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Marketing');
    });

    test('deve processar preferências de Omnichannel no modo SingleProduct', () => {
      const formData = createFormData({
        selectedPreferences: ['Integração com chatbots'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Omnichannel');
    });

    test('deve processar preferências de Omnichannel no modo MultipleProducts', () => {
      const formData = createFormData({
        selectedPreferences: ['Integração com chatbots'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Omnichannel');
    });

    test('deve processar preferências de Uso de Inteligência Artificial no modo SingleProduct', () => {
      const formData = createFormData({
        selectedPreferences: ['Análise preditiva de dados'],
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Uso de Inteligência Artificial');
    });

    test('deve processar preferências de Uso de Inteligência Artificial no modo MultipleProducts', () => {
      const formData = createFormData({
        selectedPreferences: ['Análise preditiva de dados'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Uso de Inteligência Artificial');
    });

    test('deve processar combinação de diferentes tipos de preferências', () => {
      const formData = createFormData({
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail', // Categoria: Vendas
          'Automação de marketing', // Categoria: Marketing
          'Integração com chatbots', // Categoria: Omnichannel
        ],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result.length).toBeGreaterThan(1);
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
      expect(result[2].name).toBe('RD Conversas');
    });

    test('deve lidar com preferências de uma mesma categoria', () => {
      const formData = createFormData({
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail', // Categoria: Vendas
          'Personalização de funis de vendasg', // Categoria: Vendas
        ],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[0].category).toBe('Vendas');
    });

    test('deve lidar com preferências e características vazias', () => {
      const formData = createFormData({
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(result).toEqual([]);
    });
  });

  describe('7. Tratamento de Erros', () => {
    test('deve retornar um array vazio quando products for um array vazio', () => {
      const formData = createFormData({
        selectedPreferences: ['Qualquer preferência'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, []);

      expect(result).toEqual([]);
    });

    test('deve retornar um array vazio quando products for undefined', () => {
      const formData = createFormData({
        selectedPreferences: ['Qualquer preferência'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, undefined);

      expect(result).toEqual([]);
    });

    test('deve lidar com tipo de recomendação inválida', () => {
      const formData = createFormData({
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedRecommendationType: 'TipoInvalido',
      });

      const result = getRecommendations(formData, mockProducts);

      // Deve usar comportamento padrão de MultipleProducts
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
    });

    test('deve lidar com preferência inválida sem quebrar a aplicação', () => {
      // Simula erro passando dados inválidos
      const invalidFormData = {
        selectedPreferences: 'não é um array', // Erro intencional
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      };

      const result = getRecommendations(invalidFormData, mockProducts);

      // Deve retornar array vazio ao invés de quebrar
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    test('deve lidar com característica inválida sem quebrar a aplicação', () => {
      // Simula erro passando dados inválidos
      const invalidFormData = {
        selectedFeatures: 'não é um array', // Erro intencional
        selectedRecommendationType: RECOMMENDATION_TYPES.SINGLE_PRODUCT,
      };

      const result = getRecommendations(invalidFormData, mockProducts);

      // Deve retornar array vazio ao invés de quebrar
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });
  });

  describe('8. Validação da estrutura dos resultados', () => {
    test('produtos retornados devem ter estrutura correta', () => {
      const formData = createFormData({
        selectedPreferences: ['Automação de marketing'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      expect(Array.isArray(result)).toBe(true);
      result.forEach((product) => {
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('relevance');
        expect(typeof product.name).toBe('string');
        expect(typeof product.relevance).toBe('number');
        expect(product.relevance).toBeGreaterThanOrEqual(0);
      });
    });

    test('relevância deve ser calculada corretamente', () => {
      const formData = createFormData({
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: ['Criação e gestão de campanhas de e-mail'],
        selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
      });

      const result = getRecommendations(formData, mockProducts);

      // Produtos com mais matches devem ter score maior
      const productWithFeatureAndPreference = result.find(
        (product) => product.relevance > 1
      );

      // Deve ter um grau de relevância maior que 1
      expect(productWithFeatureAndPreference.name).toBe('RD Station Marketing');
      expect(productWithFeatureAndPreference.relevance).toBeGreaterThan(1);
    });
  });
});
