import { NoticeCardTags } from './tags';

import type { Meta, StoryObj } from '@storybook/react-vite';

const manyTags = [
  '모집',
  '동아리',
  '스터디',
  '개발',
  '디자인',
  '기획',
  '행사',
  '공모전',
];

const meta = {
  title: 'Notice/NoticeCard/Tags',
  component: NoticeCardTags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeCardTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tags: ['모집', '동아리', '스터디'] },
};

export const NoTags: Story = {
  args: { tags: [] },
};

export const ResizablePreview: Story = {
  args: { tags: manyTags },
  render: () => <ResizableWrapper tags={manyTags} />,
};

const ResizableWrapper = ({ tags }: { tags: string[] }) => (
  <div>
    <p className="text-greyDark mb-2 text-xs">← 오른쪽 하단 드래그로 폭 조절</p>
    <div
      className="resize overflow-hidden border border-dashed border-gray-300 p-2"
      style={{ width: 400, minWidth: 80 }}
    >
      <NoticeCardTags tags={tags} />
    </div>
  </div>
);
