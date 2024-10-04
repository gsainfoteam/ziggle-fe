import { StoryFn } from '@storybook/react';

import { Locale, fallbackLng } from '@/app/i18next/settings';

import Footer from '.';

export default {
  title: 'layout/Footer',
  component: Footer,
};

const args = {
  lng: fallbackLng as Locale,
};

const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = { ...args };
