import RecommendationItem from '.';
import '../../styles/tailwind.css';
import '../../styles/global.css';

// Configuração principal do componente no Storybook
export default {
  title: 'Components/RecommendationItem',
  component: RecommendationItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de item para a Lista de Recomendações com nome, categoria e relevância.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    recommendation: {
      description:
        'Objeto de recomendação com propriedades name, category e relevance',
      control: { type: 'object' },
    },
  },
};

const Template = (args) => <RecommendationItem {...args} />;

// História básica com todas as propriedades
export const Default = Template.bind({});
Default.args = {
  recommendation: {
    name: 'RD Station CRM',
    category: 'Vendas',
    relevance: 1,
  },
};

// História com relevância máxima
export const HighRelevance = Template.bind({});
HighRelevance.args = {
  recommendation: {
    name: 'RD Station CRM',
    category: 'Vendas',
    relevance: 1.0,
  },
};

// História com relevância baixa
export const LowRelevance = Template.bind({});
LowRelevance.args = {
  recommendation: {
    name: 'RD Station CRM',
    category: 'Vendas',
    relevance: 0.25,
  },
};

// História sem categoria
export const WithoutCategory = Template.bind({});
WithoutCategory.args = {
  recommendation: {
    name: 'RD Station CRM',
    relevance: 1.0,
  },
};

// História sem relevância
export const WithoutRelevance = Template.bind({});
WithoutRelevance.args = {
  recommendation: {
    name: 'RD Station CRM',
    category: 'Vendas',
  },
};

// História mínima (apenas nome)
export const MinimalData = Template.bind({});
MinimalData.args = {
  recommendation: {
    name: 'RD Station CRM',
  },
};

// História com relevância zero
export const ZeroRelevance = Template.bind({});
ZeroRelevance.args = {
  recommendation: {
    name: 'RD Station CRM',
    category: 'Vendas',
    relevance: 0.0,
  },
};

// História com múltiplos itens para demonstrar layout
export const MultipleItems = () => {
  const recommendations = [
    {
      name: 'RD Station CRM',
      category: 'Vendas',
      relevance: 1,
    },
    {
      name: 'RD Station Marketing',
      category: 'Marketing',
      relevance: 1,
    },
    {
      name: 'RD Conversas',
      category: 'Omnichannel',
      relevance: 1,
    },
  ];

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <RecommendationItem key={index} recommendation={rec} />
      ))}
    </div>
  );
};
