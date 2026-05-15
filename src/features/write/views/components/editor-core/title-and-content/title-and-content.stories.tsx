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

import { EditorRefsProvider } from '../notice-editor/editor-refs-context';

import { TitleAndContent } from '.';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

/**
 * Live RHF state viewer — re-renders on every form change so you can verify
 * that TinyMCE's `onEditorChange` propagates to `korean.content` / `english.content`,
 * and that title input updates `korean.title` / `english.title`.
 */
const FormStateView = () => {
  const { control } = useFormContext<NoticeFormValues>();
  const values = useWatch({ control });
  return (
    <details className="bg-greyLight dark:bg-dark_greyDark mt-8 rounded-md p-3">
      <summary className="cursor-pointer text-sm font-semibold">
        Live form state (RHF)
      </summary>
      <pre className="mt-2 max-h-80 overflow-auto text-xs">
        {JSON.stringify(values, null, 2)}
      </pre>
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
      <FormProvider {...methods}>
        <EditorRefsProvider>
          <div className="mx-auto w-full max-w-[800px] px-4 py-4">
            <Story />
            <FormStateView />
          </div>
        </EditorRefsProvider>
      </FormProvider>
    );
  };

const meta = {
  title: 'Write/TitleAndContent',
  component: TitleAndContent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TitleAndContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KoreanEmpty: Story = {
  args: { lang: 'korean' },
  decorators: [withDefaults({})],
};

export const KoreanPrefilled: Story = {
  args: { lang: 'korean' },
  decorators: [
    withDefaults({
      korean: {
        title: '미리 채워진 제목',
        content:
          '<p>미리 채워진 본문입니다. RHF defaultValues가 TinyMCE 초기값으로 잘 주입되는지 확인하세요.</p><ul><li>리스트 항목 1</li><li>리스트 항목 2</li></ul>',
        additionalContent: undefined,
      },
    }),
  ],
};

export const English: Story = {
  args: { lang: 'english' },
  decorators: [
    withDefaults({
      english: { title: '', content: '', additionalContent: undefined },
    }),
  ],
};

export const Disabled: Story = {
  args: { lang: 'korean', disabled: true },
  decorators: [
    withDefaults({
      korean: {
        title: '편집 불가 상태의 제목',
        content: '<p>편집할 수 없는 본문입니다.</p>',
        additionalContent: undefined,
      },
    }),
  ],
};
