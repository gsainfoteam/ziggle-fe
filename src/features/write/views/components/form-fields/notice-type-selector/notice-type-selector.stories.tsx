import { FormProvider, useForm } from 'react-hook-form';

import {
  defaultNoticeFormValues,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import { NoticeTypeSelector } from '.';

import type { Meta, StoryObj, Decorator } from '@storybook/react-vite';

const withDefaults =
  (overrides: Partial<NoticeFormValues>): Decorator =>
  (Story) => {
    const methods = useForm<NoticeFormValues>({
      defaultValues: { ...defaultNoticeFormValues, ...overrides },
    });
    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    );
  };

const meta = {
  title: 'Write/NoticeTypeSelector',
  component: NoticeTypeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NoticeTypeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Recruit: Story = {
  decorators: [withDefaults({ noticeType: 'recruit' })],
};

export const Event: Story = {
  decorators: [withDefaults({ noticeType: 'event' })],
};

export const General: Story = {
  decorators: [withDefaults({ noticeType: 'general' })],
};

export const Disabled: Story = {
  args: { disabled: true },
  decorators: [withDefaults({ noticeType: 'recruit' })],
};
