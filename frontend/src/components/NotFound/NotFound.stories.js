import NotFound from '.';
import '../../styles/tailwind.css';
import '../../styles/global.css';

export default {
  title: 'Components/NotFound',
  component: NotFound,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente para exibir quando nenhum resultado é encontrado. Mostra um ícone de pesquisa e uma mensagem informativa.',
      },
    },
  },
  tags: ['autodocs'],
};

const Template = (args) => <NotFound {...args} />;

// História principal
export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story: 'Estado padrão do componente NotFound com ícone e mensagem.',
    },
  },
};
