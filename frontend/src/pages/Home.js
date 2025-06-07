import Form from '../components/Form/Form';
import InfoAlert from '../components/InfoAlert';
import RecommendationList from '../components/RecommendationList';
import useProducts from '../hooks/useProducts';
import useRecommendations from '../hooks/useRecommendations';

const Home = () => {
  const { products } = useProducts();
  const { recommendations, recommendationStats, onUpdateRecommendations } =
    useRecommendations(products);

  return (
    <div className="rounded-lg shadow-md p-8 theme-bg-primary">
      <InfoAlert />

      <h2 className="text-xl font-bold theme-text-primary mb-4">
        Recomendador de Produtos RD Station
      </h2>

      <div className="w-full space-y-8">
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
