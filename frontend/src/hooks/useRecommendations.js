// useRecommendations.js

import { useState } from 'react';
import { getRecommendations } from '../services/recommendation/getRecommendations.service';
import { getRecommendationStats } from '../services/recommendation/getRecommendationStats.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationStats, setRecommendationStats] = useState(null);

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
