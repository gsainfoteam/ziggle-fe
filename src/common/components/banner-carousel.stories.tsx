import type { Meta, StoryObj } from '@storybook/react-vite';

import { BannerCarousel } from './banner-carousel';

const PlaceholderBanner = ({ className = '' }: { className?: string }) => (
  <div
    className={`block h-auto w-full rounded-[20px] ${className}`}
    style={{
      width: '100%',
      height: 150,
      background: 'linear-gradient(135deg, #1A2B48 0%, #2d4a6f 100%)',
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: 24,
    }}
  >
    Banner
  </div>
);

const sampleSlides = [
  {
    image: PlaceholderBanner,
    url: 'https://gsa.infoteam.me',
  },
  {
    image: PlaceholderBanner,
    url: 'https://ziggle.app',
  },
];

const meta = {
  title: 'Common/BannerCarousel',
  component: BannerCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    slides: { control: false },
  },
} satisfies Meta<typeof BannerCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slides: sampleSlides,
  },
};
