import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChangeLanguageBox } from './change-language-box';

const meta = {
  title: 'Features/Notice/Sidebar/ChangeLanguageBox',
  component: ChangeLanguageBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChangeLanguageBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const WithDayjsLocaleDemo = () => {
  useTranslation();
  return (
    <div className="flex flex-col items-center gap-4">
      <ChangeLanguageBox />
      <p className="text-sm">{dayjs().format('LLLL:ss')}</p>
    </div>
  );
};

export const WithDayjsLocale: Story = {
  render: () => <WithDayjsLocaleDemo />,
};
