import { ChartColumnBig, Search } from 'lucide-react';

function RecommendationList({ recommendations, stats }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 theme-text-primary">
          Lista de Recomendações
        </h3>

        {/* Seção de Estatísticas */}
        {stats && typeof stats === 'object' && (
          <div className="theme-bg-primary rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <h4 className="text-lg font-medium gap-2 text-bg-primary mb-4 flex items-center">
              <ChartColumnBig />
              Estatísticas das Recomendações
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 font-medium">
                  Total de Recomendações
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {stats.totalRecommendations || 0}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600 font-medium">
                  Relevância Média
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {stats.averageRelevance
                    ? stats.averageRelevance.toFixed(2)
                    : '0.00'}
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-purple-600 font-medium">
                  Máxima Relevância
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {stats.maxRelevance || 0}
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm text-orange-600 font-medium">
                  Mínima Relevância
                </div>
                <div className="text-2xl font-bold text-orange-900">
                  {stats.minRelevance || 0}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Recomendações */}
        {recommendations.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full theme-bg-secondary">
              <Search className="text-primary" />
            </div>
            <p className="mb-2 text-lg font-medium">
              Nenhum resultado encontrado
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {recommendations.map((recommendation, index) => {
              // Verificação de segurança para cada recomendação
              if (!recommendation || typeof recommendation !== 'object') {
                return null;
              }

              return (
                <div
                  key={index}
                  className="theme-bg-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-bg-primary flex-1">
                        {recommendation.name || 'Nome não disponível'}
                      </h4>

                      {recommendation.category && (
                        <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {recommendation.category}
                        </span>
                      )}
                    </div>

                    {recommendation.description && (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {recommendation.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {recommendation.relevance &&
                        typeof recommendation.relevance === 'number' && (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">
                              Relevância:
                            </span>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${Math.min(
                                      recommendation.relevance * 100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-bg-primary">
                                {recommendation.relevance.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendationList;
