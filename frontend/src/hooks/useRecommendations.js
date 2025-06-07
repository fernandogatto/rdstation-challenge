// useRecommendations.js

import { useState } from 'react';
import recommendationService from '../services/recommendation/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationStats, setRecommendationStats] = useState(null);

  const onUpdateRecommendations = (formData) => {
    const recommendations = recommendationService.getRecommendations(
      formData,
      products
    );
    setRecommendations(recommendations);

    const stats = recommendationService.getRecommendationStats(recommendations);
    setRecommendationStats(stats);
  };

  return {
    recommendations,
    recommendationStats,
    onUpdateRecommendations,
  };
}

export default useRecommendations;
