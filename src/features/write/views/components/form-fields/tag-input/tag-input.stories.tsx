import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import {
  defaultNoticeFormValues,
  type NoticeFormValues,
} from '@/features/write/viewmodels';

import { TagInput } from '.';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const queryClient = new QueryClient();

const TagsView = () => {
  const { control } = useFormContext<NoticeFormValues>();
  const tags = useWatch({ control, name: 'tags' });
  return (
    <details className="bg-muted mt-4 rounded-md p-3">
      <summary className="cursor-pointer text-sm font-semibold">
        Live tags state
      </summary>
      <pre className="mt-2 text-xs">{JSON.stringify(tags, null, 2)}</pre>
    </details>
  );
};

const withDefaults =
  (overrides: Partial<NoticeFormValues>): Decorator =>
  (Story) => {
    const methods = useForm<NoticeFormValues>({
      defaultValues: { ...defaultNoticeFormValues, ...overrides },
    });
    return (
      <QueryClientProvider client={queryClient}>
        <FormProvider {...methods}>
          <div className="mx-auto w-full max-w-[600px] p-4">
            <Story />
            <TagsView />
          </div>
        </FormProvider>
      </QueryClientProvider>
    );
  };

const meta = {
  title: 'Write/TagInput',
  component: TagInput,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  decorators: [withDefaults({})],
};

export const Prefilled: Story = {
  decorators: [
    withDefaults({
      tags: [
        { id: 1, name: '모집' },
        { id: 2, name: '동아리' },
        { id: 3, name: '봄학기' },
      ],
    }),
  ],
};
