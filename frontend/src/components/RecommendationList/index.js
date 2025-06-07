import { ChartColumnBig } from 'lucide-react';
import NotFound from '../NotFound';
import RecommenationItem from '../RecommendationItem';

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
          <NotFound />
        ) : (
          <div className="grid gap-4">
            {recommendations.map((recommendation, index) => (
              <RecommenationItem recommendation={recommendation} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendationList;
