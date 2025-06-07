import api from '../../config/api';

/**
 * Retorna os dados dos produtos em caso de sucesso
 * @returns {Object[]} Lista de produtos
 * @throws {Error} Se houver erro na validação dos dados
 */
export const getProducts = async () => {
  try {
    const response = await api.get(`/products`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};
