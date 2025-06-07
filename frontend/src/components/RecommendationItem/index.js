const RecommenationItem = ({ recommendation }) => {
  return (
    <div className="theme-bg-primary rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
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
                <span className="text-sm text-gray-500 mr-2">Relevância:</span>
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
};

export default RecommenationItem;
