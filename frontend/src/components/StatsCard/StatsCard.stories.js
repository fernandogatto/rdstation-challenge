import StatsCard from '.';
import '../../styles/tailwind.css';
import '../../styles/global.css';

// Configuração principal do componente no Storybook
export default {
  title: 'Components/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de card para exibir estatísticas com diferentes cores e formatação personalizada de valores.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do card de estatística',
    },
    value: {
      control: 'number',
      description: 'Valor numérico a ser exibido',
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'green', 'purple', 'orange'],
      description: 'Cor do tema do card',
    },
    formatValue: {
      description: 'Função para formatar o valor exibido',
      control: false,
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
  },
};

// Story padrão
export const Default = {
  args: {
    title: 'Total de Recomendações',
    value: 2,
    color: 'blue',
  },
};

// Diferentes cores
export const Green = {
  args: {
    title: 'Relevância Média',
    value: 2,
    color: 'green',
  },
};

export const Purple = {
  args: {
    title: 'Máxima Relevância',
    value: 2,
    color: 'purple',
  },
};

export const Orange = {
  args: {
    title: 'Mínima Relevância',
    value: 1,
    color: 'orange',
  },
};

// Estados especiais
export const WithZeroValue = {
  args: {
    title: 'Total de Recomendações',
    value: 0,
    color: 'blue',
  },
};

export const WithNullValue = {
  args: {
    title: 'Total de Recomendações',
    value: null,
    color: 'blue',
  },
};

export const WithUndefinedValue = {
  args: {
    title: 'Total de Recomendações',
    value: undefined,
    color: 'orange',
  },
};

// Com classes customizadas
export const WithCustomClasses = {
  args: {
    title: 'Total de Recomendações',
    value: 0,
    color: 'purple',
    className: 'shadow-lg border-2 border-purple-200',
  },
};

// Caso de todas as cores
export const AllColors = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <StatsCard title="Blue Theme" value={0} color="blue" />
      <StatsCard title="Green Theme" value={0} color="green" />
      <StatsCard title="Purple Theme" value={0} color="purple" />
      <StatsCard title="Orange Theme" value={0} color="orange" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstração de todas as variações de cor disponíveis no componente.',
      },
    },
  },
};
