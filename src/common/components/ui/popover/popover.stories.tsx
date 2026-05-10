import { useState } from 'react';

import { overlay } from 'overlay-kit';

import { Button } from '../button';
import { confirmDialog } from '../dialog';

import { Popover } from './index';

import type { Placement } from '@floating-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface PopoverPlaygroundArgs {
  placement?: Placement;
  responsive?: boolean;
  offset?: number;
}

const PopoverPlayground = ({
  placement = 'bottom-start',
  responsive = false,
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
        responsive={responsive}
      >
        <Popover.Body className="w-64">
          <p className="text-sm font-semibold">앵커 기반 Popover</p>
          <p className="text-greyDark dark:text-dark_grey mt-1 text-xs">
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
    responsive: { control: 'boolean' },
    offset: { control: 'number' },
  },
} satisfies Meta<typeof PopoverPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placement: 'bottom-start', responsive: false, offset: 8 },
};

export const TopEnd: Story = {
  args: { placement: 'top-end', responsive: false, offset: 8 },
};

export const Right: Story = {
  args: { placement: 'right', responsive: false, offset: 8 },
};

const ResponsiveMobileDemo = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-64 items-center justify-center">
      <Button
        variant="contained"
        onClick={(event) => {
          setAnchor(event.currentTarget);
          setIsOpen(true);
        }}
      >
        Popover 열기
      </Button>
      <Popover.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={anchor}
        placement="bottom-end"
        responsive
        className="max-md:h-full max-md:max-h-none max-md:w-full max-md:max-w-none"
      >
        <div className="dark:bg-dark_dark flex h-full w-full flex-col gap-4 bg-white p-6 md:h-auto md:w-72 md:rounded-2xl md:border md:p-4 md:shadow-xl">
          <h3 className="text-lg font-semibold">Profile-style 패널</h3>
          <p className="text-sm">
            데스크탑은 anchor 옆 dropdown, 모바일은 풀스크린 takeover.
          </p>
          <Button
            variant="outlined"
            className="mt-auto"
            onClick={() => setIsOpen(false)}
          >
            닫기
          </Button>
        </div>
      </Popover.Root>
    </div>
  );
};

export const ResponsiveMobile: Story = {
  render: () => <ResponsiveMobileDemo />,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
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
              <p className="text-greyDark dark:text-dark_grey mt-1 text-xs">
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
      <ul className="text-greyDark dark:text-dark_grey flex-1 text-sm">
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
        className="bg-greyLight dark:bg-dark_greyDark flex h-10 w-10 items-center justify-center rounded-full font-semibold"
      >
        {mockUser.name[0]}
      </button>
      <Popover.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor={anchor}
        placement="bottom-end"
        responsive
        className="max-md:h-full max-md:max-h-none max-md:w-full max-md:max-w-none"
      >
        <div className="dark:bg-dark_dark dark:border-dark_greyBorder w-72 rounded-2xl border border-transparent bg-white p-5 shadow-2xl max-md:flex max-md:h-full max-md:w-full max-md:flex-col max-md:rounded-none max-md:border-none max-md:shadow-none">
          <div className="flex flex-col items-center gap-1 py-5">
            <div className="bg-greyLight dark:bg-dark_greyDark mb-2 flex size-16 items-center justify-center rounded-full text-2xl font-semibold">
              {mockUser.name[0]}
            </div>
            <div className="text-text dark:text-dark_white text-xl font-semibold">
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
              className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey rounded-xl px-4 py-3 text-left text-sm font-medium"
            >
              계정 관리
            </button>
            <button
              type="button"
              onClick={() => {
                setLog((l) => [...l, 'logout 클릭']);
                setIsOpen(false);
              }}
              className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey rounded-xl px-4 py-3 text-left text-sm font-medium"
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
              className="bg-greyLight dark:bg-dark_greyDark hover:bg-greyBorder dark:hover:bg-dark_grey rounded-xl px-4 py-3 text-left text-sm font-medium"
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
        className="dark:hover:bg-dark_grey flex w-48 items-center gap-5 rounded-md px-4 py-2 hover:bg-gray-300"
      >
        <span className="font-medium">언어 설정</span>
        <span className="text-greyDark ml-auto text-sm">
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
              aria-selected={item.value === language}
              onClick={() => {
                setLanguage(item.value);
                setIsOpen(false);
              }}
              className={
                'dark:hover:bg-dark_grey rounded-md px-4 py-2 text-left transition hover:bg-gray-200 ' +
                (item.value === language
                  ? 'bg-greyLight dark:bg-dark_greyDark font-semibold'
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
