import { RECOMMENDATION_TYPES } from '../../../constants/recommendation/recommendationTypes';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2 theme-text-primary">
        Tipo de Recomendação:
      </h3>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          onChange={() =>
            onRecommendationTypeChange(RECOMMENDATION_TYPES.SINGLE_PRODUCT)
          }
          className="mr-2"
        />
        <label htmlFor="SingleProduct" className="mr-4">
          Produto Único
        </label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          onChange={() =>
            onRecommendationTypeChange(RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS)
          }
          className="mr-2"
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
