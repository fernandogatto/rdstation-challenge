import React from 'react';
import Checkbox from './Checkbox';
import '../../styles/tailwind.css';
import '../../styles/global.css';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de checkbox para ser usado no formulário.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Texto exibido no checkbox' },
    checked: {
      control: 'boolean',
      description: 'Estado checado do checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado do checkbox',
    },
    onChange: { action: 'changed', description: 'Evento de mudança' },
  },
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Checkbox',
  checked: false,
  disabled: false,
};

export const Checked = Template.bind({});
Checked.args = {
  children: 'Checked Checkbox',
  checked: true,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Checkbox',
  checked: false,
  disabled: true,
};

export const CheckedAndDisabled = Template.bind({});
CheckedAndDisabled.args = {
  children: 'Checked and Disabled Checkbox',
  checked: true,
  disabled: true,
};
