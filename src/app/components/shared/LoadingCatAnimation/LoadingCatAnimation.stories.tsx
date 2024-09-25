import { StoryFn } from '@storybook/react';

import { fallbackLng, Locale } from '@/app/i18next/settings';

import LoadingCatAnimation from '.';

export default {
  title: 'shared/LoadingCatAnimation',
  component: LoadingCatAnimation,
};

const args = {
  lng: fallbackLng as Locale,
};

const Template: StoryFn<typeof LoadingCatAnimation> = (args) => {
  return <LoadingCatAnimation {...args} />;
};

export const Default = Template.bind({});
Default.args = { ...args };
