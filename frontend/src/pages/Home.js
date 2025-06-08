import React from 'react';
import Form from '../components/Form/Form';
import RecommendationList from '../components/RecommendationList';
import useProducts from '../hooks/useProducts';
import useRecommendations from '../hooks/useRecommendations';

const Home = () => {
  const { products } = useProducts();
  const { recommendations, recommendationStats, onUpdateRecommendations } =
    useRecommendations(products);

  return (
    <div className="rounded-lg shadow-md p-8 space-y-4 theme-bg-primary">
      <h2 className="text-2xl font-bold theme-text-primary">
        Recomendador de Produtos RD Station
      </h2>

      <p className="text-lg">
        Encontre as soluções perfeitas para o seu negócio. De CRM a Marketing,
        de Conversas a Inteligência Artificial, temos uma solução para ajudar
        você a alcançar seus objetivos.
      </p>

      <div className="w-full space-y-4">
        <h3 className="text-xl font-bold theme-text-primary">
          Filtros e Configurações
        </h3>

        <Form onUpdateRecommendations={onUpdateRecommendations} />

        <RecommendationList
          recommendations={recommendations}
          stats={recommendationStats}
        />
      </div>
    </div>
  );
};

export default Home;
