import { Meta, StoryFn } from '@storybook/react';

import Input from '.';

export default {
  title: 'molecules/Input',
  component: Input,
  argTypes: {
    buttonValue: {
      options: [undefined, '입력'],
      control: { type: 'select' },
    },
    title: {
      options: [undefined, '제목 입력'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => {
  return <Input {...args} />;
};

const args = {
  placeholder: '이이잉',
};

export const Default = Template.bind({});
Default.args = { ...args };
