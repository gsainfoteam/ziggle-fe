import { FormProvider, useForm } from 'react-hook-form';

import {
  defaultNoticeFormValues,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import { AddAdditionalNotice } from '.';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

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
  title: 'Write/AddAdditionalNotice',
  component: AddAdditionalNotice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddAdditionalNotice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KoreanOnly: Story = {
  decorators: [
    withDefaults({
      korean: { title: '', content: '', additionalContent: '' },
    }),
  ],
};

export const WithEnglish: Story = {
  decorators: [
    withDefaults({
      korean: { title: '', content: '', additionalContent: '' },
      english: { title: '', content: '', additionalContent: '' },
    }),
  ],
};

export const WithContent: Story = {
  decorators: [
    withDefaults({
      korean: {
        title: '',
        content: '',
        additionalContent:
          '이번 주 수요일 행사 시간이 오후 3시에서 오후 4시로 변경되었습니다.',
      },
      english: {
        title: '',
        content: '',
        additionalContent:
          'This Wednesday event time has been changed from 3 PM to 4 PM.',
      },
    }),
  ],
};
