import { FormProvider, useForm } from 'react-hook-form';

import {
  defaultNoticeFormValues,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import { AttachPhotoArea } from '.';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const FormDecorator: Decorator = (Story) => {
  const methods = useForm<NoticeFormValues>({
    defaultValues: defaultNoticeFormValues,
  });
  return (
    <FormProvider {...methods}>
      <Story />
    </FormProvider>
  );
};

const meta = {
  title: 'Write/AttachPhotoArea',
  component: AttachPhotoArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [FormDecorator],
} satisfies Meta<typeof AttachPhotoArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
