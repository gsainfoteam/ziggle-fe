import { useRef, useState } from 'react';

import { type Editor } from 'tinymce';

import { TinyMCEEditor } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const Wrapped = ({
  initialValue = '',
  disabled,
}: {
  initialValue?: string;
  disabled?: boolean;
}) => {
  const ref = useRef<Editor | null>(null);
  const [value, setValue] = useState(initialValue);
  return (
    <div className="mx-auto w-full max-w-[800px] p-4">
      <TinyMCEEditor
        ref={ref}
        value={value}
        onEditorChange={(next) => setValue(next)}
        disabled={disabled}
      />
      <details className="bg-greyLight dark:bg-dark_greyDark mt-4 rounded-md p-3">
        <summary className="cursor-pointer text-sm font-semibold">
          Live HTML value
        </summary>
        <pre className="mt-2 max-h-60 overflow-auto text-xs whitespace-pre-wrap">
          {value || '(empty)'}
        </pre>
      </details>
    </div>
  );
};

const meta = {
  title: 'Write/TinyMCEEditor',
  component: Wrapped,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Wrapped>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Prefilled: Story = {
  args: {
    initialValue:
      '<h2>제목</h2><p>본문 텍스트. <strong>강조</strong>나 <em>기울임</em>도 됩니다.</p><ul><li>리스트 1</li><li>리스트 2</li></ul>',
  },
};

export const Disabled: Story = {
  args: {
    initialValue: '<p>편집 불가 상태의 본문입니다.</p>',
    disabled: true,
  },
};
