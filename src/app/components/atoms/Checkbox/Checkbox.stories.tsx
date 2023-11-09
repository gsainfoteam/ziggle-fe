import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import Checkbox from './Checkbox';

export default {
  title: 'atoms/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <div>-ㅅ- 내가 체크박스여</div>,
};
