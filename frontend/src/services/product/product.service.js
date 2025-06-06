import api from '../../config/api';

const getProducts = async () => {
  try {
    const response = await api.get(`/products`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};

export default getProducts;
