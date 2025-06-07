import { getProducts } from './getProducts.service';
import api from '../../config/api';
import mockProducts from '../../mocks/mockProducts';

// Mock da API
jest.mock('../../config/api');
const mockedApi = api;
const mockedProductsData = mockProducts;

// Mock do console.error para evitar logs durante os testes
const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

describe('getProducts Service', () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restaura o console.error após todos os testes
    consoleErrorSpy.mockRestore();
  });

  describe('1. Casos de sucesso', () => {
    test('deve retornar a lista de produtos quando a API responde com sucesso', async () => {
      const mockResponse = {
        data: mockedProductsData,
      };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await getProducts();

      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(mockedApi.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual(mockedProductsData);
      expect(result).toHaveLength(4);
    });

    test('deve retornar array vazio quando a API retorna array vazio', async () => {
      const mockResponse = {
        data: [],
      };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await getProducts();

      expect(mockedApi.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    test('deve retornar os produtos com a estrutura correta', async () => {
      const mockResponse = {
        data: mockedProductsData,
      };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await getProducts();

      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('category');
      expect(result[0]).toHaveProperty('preferences');
      expect(result[0]).toHaveProperty('features');
      expect(Array.isArray(result[0].preferences)).toBe(true);
      expect(Array.isArray(result[0].features)).toBe(true);
    });
  });

  describe('2. Casos de erro', () => {
    test('deve exibir erro e relançar quando a API retorna erro de rede', async () => {
      const networkError = new Error('Network Error');
      mockedApi.get.mockRejectedValueOnce(networkError);

      await expect(getProducts()).rejects.toThrow('Network Error');
      expect(console.error).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        networkError
      );
      expect(mockedApi.get).toHaveBeenCalledWith('/products');
    });

    test('deve exibir erro e relançar quando a API retorna erro 404', async () => {
      const notFoundError = new Error('Request failed with status code 404');
      notFoundError.response = {
        status: 404,
        statusText: 'Not Found',
      };
      mockedApi.get.mockRejectedValueOnce(notFoundError);

      await expect(getProducts()).rejects.toThrow(
        'Request failed with status code 404'
      );
      expect(console.error).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        notFoundError
      );
    });

    test('deve exibir erro e relançar quando a API retorna erro 500', async () => {
      const serverError = new Error('Request failed with status code 500');
      serverError.response = {
        status: 500,
        statusText: 'Internal Server Error',
      };
      mockedApi.get.mockRejectedValueOnce(serverError);

      await expect(getProducts()).rejects.toThrow(
        'Request failed with status code 500'
      );
      expect(console.error).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        serverError
      );
    });

    test('deve exibir erro e relançar quando ocorre timeout', async () => {
      const timeoutError = new Error('Request failed with status code 504');
      timeoutError.response = {
        status: 504,
        statusText: 'Gateway Timeout',
      };
      mockedApi.get.mockRejectedValueOnce(timeoutError);

      await expect(getProducts()).rejects.toThrow(
        'Request failed with status code 504'
      );
      expect(console.error).toHaveBeenCalledWith(
        'Erro ao obter os produtos:',
        timeoutError
      );
    });
  });

  describe('3. Integração com API', () => {
    test('deve chamar a API com o endpoint correto', async () => {
      const mockResponse = {
        data: mockedProductsData,
      };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      await getProducts();

      expect(mockedApi.get).toHaveBeenCalledWith('/products');
      expect(mockedApi.get).toHaveBeenCalledTimes(1);
    });

    test('deve retornar exatamente os dados recebidos da API', async () => {
      const customData = [
        {
          id: 'test-1',
          name: 'Test Product',
          category: 'Test Category',
          preferences: ['Test preference'],
          features: ['Test feature'],
        },
      ];
      const mockResponse = {
        data: customData,
      };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await getProducts();

      expect(result).toEqual(customData);
      expect(result).toBe(customData); // Verifica se é a mesma referência
    });
  });

  describe('4. Validação de tipos', () => {
    test('deve garantir que o retorno seja sempre um array', async () => {
      const mockResponse = {
        data: mockedProductsData,
      };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await getProducts();

      expect(Array.isArray(result)).toBe(true);
    });

    test('deve validar a estrutura dos produtos RD Station', async () => {
      const mockResponse = {
        data: mockedProductsData,
      };
      mockedApi.get.mockResolvedValueOnce(mockResponse);

      const result = await getProducts();

      const expectedProducts = [
        'RD Station CRM',
        'RD Station Marketing',
        'RD Conversas',
        'RD Mentor AI',
      ];
      const expectedCategories = [
        'Vendas',
        'Marketing',
        'Omnichannel',
        'Uso de Inteligência Artificial',
      ];

      expect(result).toHaveLength(4);
      result.forEach((product) => {
        expect(expectedProducts).toContain(product.name);
        expect(expectedCategories).toContain(product.category);
        expect(product.preferences.length).toBeGreaterThan(0);
        expect(product.features.length).toBeGreaterThan(0);
      });
    });
  });
});
