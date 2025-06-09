import React from 'react';
import SubmitButton from './SubmitButton';
import '../../../styles/tailwind.css';
import '../../../styles/global.css';

export default {
  title: 'Components/SubmitButton',
  component: SubmitButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de botão para ser usado no formulário.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'Texto exibido no botão' },
  },
};

const Template = (args) => <SubmitButton {...args} />;

// História principal
export const Default = Template.bind({});
Default.args = {
  text: 'Enviar',
};

// História com texto personalizado
export const CustomText = Template.bind({});
CustomText.args = {
  text: 'Confirmar',
};
