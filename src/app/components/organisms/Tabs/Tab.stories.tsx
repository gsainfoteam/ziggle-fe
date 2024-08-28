import { Meta, StoryFn } from '@storybook/react';

import Tab from './Tabs';

export default {
  title: 'app/components/organisms/Tab/Tab',
  component: Tab,
} as Meta<typeof Tab>;

const Template: StoryFn<typeof Tab> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3' },
  ],
  activeTab: 'tab1',
  setActiveTab: () => {},
};
