import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import Toggle from './Toggle';

export default {
  title: 'atoms/Toggle',
  component: Toggle,
} as Meta<typeof Toggle>;

const Template: StoryFn<typeof Toggle> = (args) => {
  const [isSwitched, setIsSwitched] = useState(false);
  console.log(isSwitched);
  return (
    <>
      <Toggle
        {...args}
        isSwitched={isSwitched}
        onSwitch={(e) => setIsSwitched(e.target.checked)}
      />
      <div>{isSwitched}</div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
