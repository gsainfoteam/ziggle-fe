import { useState } from 'react';

import { overlay } from 'overlay-kit';

import { Button } from '../button';
import { confirmDialog } from '../dialog';

import { Popover } from './index';

import type { Placement } from '@floating-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface PopoverPlaygroundArgs {
  placement?: Placement;
  offset?: number;
}

const PopoverPlayground = ({
  placement = 'bottom-start',
  offset = 8,
}: PopoverPlaygroundArgs) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-64 items-center justify-center">
      <Button
        variant="contained"
        onClick={(event) => {
          setAnchor(event.currentTarget);
          setIsOpen((value) => !value);
        }}
      >
        Popover 토글
      </Button>
      <Popover.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={anchor}
        placement={placement}
        offset={offset}
      >
        <Popover.Body className="w-64">
          <p className="text-sm font-semibold">앵커 기반 Popover</p>
          <p className="text-muted-foreground mt-1 text-xs">
            outsidePress / Escape로 닫힙니다.
          </p>
        </Popover.Body>
      </Popover.Root>
    </div>
  );
};

const meta = {
  title: 'Common/UI/Popover',
  component: PopoverPlayground,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ] satisfies Placement[],
    },
    offset: { control: 'number' },
  },
} satisfies Meta<typeof PopoverPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placement: 'bottom-start', offset: 8 },
};

export const TopEnd: Story = {
  args: { placement: 'top-end', offset: 8 },
};

export const Right: Story = {
  args: { placement: 'right', offset: 8 },
};

const ImperativePopover = () => (
  <div className="flex h-48 items-center justify-center">
    <Button
      variant="contained"
      onClick={(event) => {
        const anchor = event.currentTarget;
        overlay.open(({ isOpen, close, unmount }) => (
          <Popover.Root
            isOpen={isOpen}
            onClose={close}
            onExitComplete={unmount}
            anchor={anchor}
            placement="bottom-start"
          >
            <Popover.Body className="w-56">
              <p className="text-sm font-medium">overlay.open()</p>
              <p className="text-muted-foreground mt-1 text-xs">
                e.currentTarget을 클로저로 캡쳐했습니다.
              </p>
              <Button
                variant="outlined"
                className="mt-3 w-full"
                onClick={close}
              >
                닫기
              </Button>
            </Popover.Body>
          </Popover.Root>
        ));
      }}
    >
      overlay.open으로 열기
    </Button>
  </div>
);

export const Imperative: Story = {
  render: () => <ImperativePopover />,
};

const ProfileMenuScenario = () => {
  const [log, setLog] = useState<string[]>([]);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const mockUser = {
    name: '홍길동',
    email: 'gildong@gm.gist.ac.kr',
  };

  return (
    <div className="flex h-64 items-start justify-end gap-4 p-6">
      <ul className="text-muted-foreground flex-1 text-sm">
        {log.map((entry, i) => (
          <li key={i}>· {entry}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={(event) => {
          setAnchor(event.currentTarget);
          setIsOpen((v) => !v);
        }}
        className="bg-muted flex h-10 w-10 items-center justify-center rounded-full font-semibold"
      >
        {mockUser.name[0]}
      </button>
      <Popover.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={anchor}
        placement="bottom-end"
      >
        <div className="bg-background w-72 rounded-2xl border border-transparent p-5 shadow-2xl">
          <div className="flex flex-col items-center gap-1 py-5">
            <div className="bg-muted mb-2 flex size-16 items-center justify-center rounded-full text-2xl font-semibold">
              {mockUser.name[0]}
            </div>
            <div className="text-foreground text-xl font-semibold">
              {mockUser.name}
            </div>
            <div className="text-primary text-sm">{mockUser.email}</div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setLog((l) => [...l, 'profile manage 클릭']);
                setIsOpen(false);
              }}
              className="bg-muted hover:bg-border rounded-xl px-4 py-3 text-left text-sm font-medium"
            >
              계정 관리
            </button>
            <button
              type="button"
              onClick={() => {
                setLog((l) => [...l, 'logout 클릭']);
                setIsOpen(false);
              }}
              className="bg-muted hover:bg-border rounded-xl px-4 py-3 text-left text-sm font-medium"
            >
              로그아웃
            </button>
            <button
              type="button"
              onClick={async () => {
                setIsOpen(false);
                const ok = await confirmDialog({
                  title: '정말 탈퇴하시겠어요?',
                  description:
                    '계정과 관련된 모든 정보가 삭제됩니다.\n이 작업은 되돌릴 수 없어요.',
                  destructive: true,
                });
                setLog((l) => [...l, ok ? 'withdraw 확정' : 'withdraw 취소']);
              }}
              className="bg-muted hover:bg-border rounded-xl px-4 py-3 text-left text-sm font-medium"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </Popover.Root>
    </div>
  );
};

export const ProfileMenu: Story = {
  render: () => <ProfileMenuScenario />,
};

const SelectDropdownScenario = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  const items: { value: 'ko' | 'en'; label: string }[] = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: 'English' },
  ];

  return (
    <div className="flex h-64 items-start justify-center pt-12">
      <button
        type="button"
        onClick={(event) => {
          setAnchor(event.currentTarget);
          setIsOpen((v) => !v);
        }}
        className="hover:bg-border flex w-48 items-center gap-5 rounded-md px-4 py-2"
      >
        <span className="font-medium">언어 설정</span>
        <span className="text-muted-foreground ml-auto text-sm">
          {items.find((i) => i.value === language)?.label}
        </span>
      </button>
      <Popover.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={anchor}
        placement="bottom-start"
      >
        <Popover.Body className="flex w-48 flex-col gap-1 p-1.5">
          {items.map((item) => (
            <button
              type="button"
              key={item.value}
              role="option"
              onClick={() => {
                setLanguage(item.value);
                setIsOpen(false);
              }}
              className={
                'hover:bg-muted rounded-md px-4 py-2 text-left transition' +
                (item.value === language
                  ? 'bg-muted font-semibold'
                  : 'font-normal')
              }
            >
              {item.label}
            </button>
          ))}
        </Popover.Body>
      </Popover.Root>
    </div>
  );
};

export const SelectDropdown: Story = {
  render: () => <SelectDropdownScenario />,
};
