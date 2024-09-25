import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import Toggle from './Toggle';

export default {
  title: 'shared/Toggle',
  component: Toggle,
} as Meta<typeof Toggle>;

const args = {};

const Template: StoryFn<typeof Toggle> = (args) => {
  const [isSwitched, setIsSwitched] = useState(false);

  return (
    <Toggle
      {...args}
      isSwitched={isSwitched}
      onSwitch={(e) => setIsSwitched(e.target.checked)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { ...args };
