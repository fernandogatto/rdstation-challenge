import { ChartColumnBig } from 'lucide-react';
import NotFound from '../NotFound';
import RecommenationItem from '../RecommendationItem';
import StatsCard from '../StatsCard';

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
              <StatsCard
                title="Total de Recomendações"
                value={stats.totalRecommendations}
                color="blue"
              />

              <StatsCard
                title="Relevância Média"
                value={stats.averageRelevance}
                color="green"
                formatValue={(val) => (val ? val.toFixed(2) : '0.00')}
              />

              <StatsCard
                title="Máxima Relevância"
                value={stats.maxRelevance}
                color="purple"
              />

              <StatsCard
                title="Mínima Relevância"
                value={stats.minRelevance}
                color="orange"
              />
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
