import { RECOMMENDATION_TYPES } from '../../constants/recommendation/recommendationTypes';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

function Form({ onUpdateRecommendations }) {
  const { preferences, features } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateRecommendations(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 md:flex-row">
        <Preferences
          preferences={preferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
        />
        <Features
          features={features}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
        />
        <RecommendationType
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
        />
      </div>
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
