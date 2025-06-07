import Form from '../components/Form/Form';
import RecommendationList from '../components/RecommendationList';
import useProducts from '../hooks/useProducts';
import useRecommendations from '../hooks/useRecommendations';

const Home = () => {
  const { products } = useProducts();
  const { recommendations, recommendationStats, onUpdateRecommendations } =
    useRecommendations(products);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Recomendador de Produtos RD Station
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Form onUpdateRecommendations={onUpdateRecommendations} />
        </div>
        <div>
          <RecommendationList
            recommendations={recommendations}
            stats={recommendationStats}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
