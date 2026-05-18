import { AppBanner } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/AppBanner',
  component: AppBanner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Android: Story = {
  decorators: [
    (Story) => {
      localStorage.removeItem('app_banner_dismissed');
      Object.defineProperty(navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        configurable: true,
      });
      return <Story />;
    },
  ],
};

export const Ios: Story = {
  decorators: [
    (Story) => {
      localStorage.removeItem('app_banner_dismissed');
      Object.defineProperty(navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        configurable: true,
      });
      return <Story />;
    },
  ],
};

export const Dismissed: Story = {
  decorators: [
    (Story) => {
      localStorage.setItem('app_banner_dismissed', '1');
      Object.defineProperty(navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        configurable: true,
      });
      return <Story />;
    },
  ],
};
