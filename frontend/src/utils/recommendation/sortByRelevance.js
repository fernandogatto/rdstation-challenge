/**
 * Ordena produtos por relevância (maior para menor)
 * Em caso de empate, mantém a ordem original (último produto válido fica por último)
 * @param {Object[]} products - Produtos a serem ordenados
 * @returns {Object[]} Produtos ordenados por relevância
 */
export const sortByRelevance = (products) => {
  return [...products].sort((a, b) => {
    const relevanceDiff = b.relevance - a.relevance;
    // Se as relevâncias são iguais, mantém a ordem original
    // (sort estável garante que o último elemento permanece por último)
    return relevanceDiff;
  });
};
