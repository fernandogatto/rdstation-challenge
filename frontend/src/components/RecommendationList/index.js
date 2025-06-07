function RecommendationList({ recommendations, stats }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Lista de Recomendações
        </h3>

        {/* Seção de Estatísticas */}
        {stats && typeof stats === 'object' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
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

            {/* Distribuição por categorias */}
            {stats.categories &&
              typeof stats.categories === 'object' &&
              Object.keys(stats.categories).length > 0 && (
                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-3">
                    Distribuição por Categoria:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(stats.categories).map(
                      ([category, count]) => (
                        <div
                          key={category}
                          className="flex justify-between items-center bg-gray-50 rounded-md px-3 py-2"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {category}
                          </span>
                          <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                            {count}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Lista de Recomendações */}
        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
            <p className="text-gray-500 text-lg">
              Nenhuma recomendação encontrada.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Tente ajustar os filtros ou critérios de busca.
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
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-900 flex-1">
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
                              <span className="text-sm font-medium text-gray-900">
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
