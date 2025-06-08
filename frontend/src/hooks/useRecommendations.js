// useRecommendations.js

import { useState } from 'react';
import { getRecommendations } from '../services/recommendation/getRecommendations.service';
import { getRecommendationStats } from '../services/recommendation/getRecommendationStats.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationStats, setRecommendationStats] = useState({
    totalRecommendations: 0,
    averageRelevance: 0,
    maxRelevance: 0,
    minRelevance: 0,
  });

  const onUpdateRecommendations = (formData) => {
    const recommendations = getRecommendations(formData, products);
    setRecommendations(recommendations);

    const stats = getRecommendationStats(recommendations);
    setRecommendationStats(stats);
  };

  return {
    recommendations,
    recommendationStats,
    onUpdateRecommendations,
  };
}

export default useRecommendations;
