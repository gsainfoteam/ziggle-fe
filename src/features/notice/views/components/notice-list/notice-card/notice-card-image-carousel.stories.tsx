import { NoticeCardImageCarousel } from './image-carousel';

import type { Meta, StoryObj } from '@storybook/react-vite';

const images = {
  square: 'https://picsum.photos/seed/carousel-1x1/400/400',
  landscape4x3: 'https://picsum.photos/seed/carousel-4x3/400/300',
  landscape16x9: 'https://picsum.photos/seed/carousel-16x9/480/270',
  landscape21x9: 'https://picsum.photos/seed/carousel-21x9/560/240',
  portrait3x4: 'https://picsum.photos/seed/carousel-3x4/300/400',
  portrait9x16: 'https://picsum.photos/seed/carousel-9x16/270/480',
} as const;

const ratioItems = [
  ['1:1', images.square],
  ['4:3', images.landscape4x3],
  ['16:9', images.landscape16x9],
  ['21:9', images.landscape21x9],
  ['3:4', images.portrait3x4],
  ['9:16', images.portrait9x16],
] as const;

const StretchDemo = ({
  imageUrls,
  label,
  lines = 4,
}: {
  imageUrls: string[];
  label: string;
  lines?: number;
}) => (
  <div className="flex w-80 items-start gap-3 rounded-lg border border-dashed border-gray-300 p-3 dark:border-gray-600">
    <div className="text-muted-foreground flex min-w-0 flex-1 flex-col gap-1 text-xs leading-relaxed">
      <p className="text-foreground text-sm font-semibold">{label}</p>
      {Array.from({ length: lines }, (_, i) => (
        <p key={i}>텍스트 높이 기준 줄 {i + 1}</p>
      ))}
    </div>
    <NoticeCardImageCarousel imageUrls={imageUrls} title={label} />
  </div>
);

const meta = {
  title: 'Notice/NoticeCard/ImageCarousel',
  component: NoticeCardImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeCardImageCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrls: [images.landscape4x3],
    title: '공지 제목',
  },
  render: (args) => (
    <StretchDemo imageUrls={args.imageUrls} label="Default (4:3)" />
  ),
};

export const AllAspectRatios: Story = {
  name: 'All Aspect Ratios',
  args: {
    imageUrls: [images.square],
    title: '비교',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {ratioItems.map(([label, src]) => (
        <StretchDemo key={label} imageUrls={[src]} label={label} />
      ))}
      <StretchDemo
        imageUrls={ratioItems.map(([, src]) => src)}
        label="Mixed (+5)"
        lines={6}
      />
    </div>
  ),
};
