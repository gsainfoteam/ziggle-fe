import { FormProvider, useForm } from 'react-hook-form';

import {
  defaultNoticeFormValues,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import { EditorRefsProvider } from '../notice-editor/editor-refs-context';

import { DeepLButton } from '.';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const FormDecorator: Decorator = (Story) => {
  const methods = useForm<NoticeFormValues>({
    defaultValues: defaultNoticeFormValues,
  });
  return (
    <FormProvider {...methods}>
      <EditorRefsProvider>
        <Story />
      </EditorRefsProvider>
    </FormProvider>
  );
};

const meta = {
  title: 'Write/DeepLButton',
  component: DeepLButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [FormDecorator],
  argTypes: {
    lang: {
      control: 'select',
      options: ['korean', 'english'],
    },
  },
} satisfies Meta<typeof DeepLButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromKorean: Story = {
  args: { lang: 'korean' },
};

export const FromEnglish: Story = {
  args: { lang: 'english' },
};
