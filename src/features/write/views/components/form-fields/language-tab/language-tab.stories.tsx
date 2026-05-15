import { FormProvider, useForm } from 'react-hook-form';

import {
  defaultNoticeFormValues,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import { LanguageTab } from '.';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const withTab =
  (writingTab: 'korean' | 'english'): Decorator =>
  (Story) => {
    const methods = useForm<NoticeFormValues>({
      defaultValues: { ...defaultNoticeFormValues, writingTab },
    });
    return (
      <FormProvider {...methods}>
        <Story />
      </FormProvider>
    );
  };

const meta = {
  title: 'Write/LanguageTab',
  component: LanguageTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  decorators: [withTab('korean')],
};

export const English: Story = {
  decorators: [withTab('english')],
};
