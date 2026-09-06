import { useState } from 'react';

import { overlay } from 'overlay-kit';

import { Button } from '../button';

import { Drawer } from './index';

import type { DrawerSide } from './context';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface DrawerPlaygroundArgs {
  side?: DrawerSide;
  size?: 'compact' | 'default' | 'large';
  dragToDismiss?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

const DrawerPlayground = ({
  side = 'bottom',
  size = 'default',
  dragToDismiss = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: DrawerPlaygroundArgs) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Drawer 열기
      </Button>
      <Drawer.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        side={side}
        size={size}
        dragToDismiss={dragToDismiss}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
      >
        <Drawer.Header>
          <Drawer.Title>드로어 제목</Drawer.Title>
          <Drawer.Description>
            손가락/포인터로 끌어서 닫을 수도 있습니다.
          </Drawer.Description>
        </Drawer.Header>
        <Drawer.Body>
          <p>4방향 슬라이드. side / size를 바꿔보세요.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button
            variant="muted"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            확인
          </Button>
        </Drawer.Footer>
        <Drawer.Close />
      </Drawer.Root>
    </div>
  );
};

const meta = {
  title: 'Common/UI/Drawer',
  component: DrawerPlayground,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'] satisfies DrawerSide[],
    },
    size: {
      control: 'select',
      options: ['compact', 'default', 'large'],
    },
    dragToDismiss: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
} satisfies Meta<typeof DrawerPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomSheet: Story = { args: { side: 'bottom', size: 'default' } };
export const BottomSheetCompact: Story = {
  args: { side: 'bottom', size: 'compact' },
};
export const BottomSheetLarge: Story = {
  args: { side: 'bottom', size: 'large' },
};
export const Right: Story = { args: { side: 'right' } };
export const Left: Story = { args: { side: 'left' } };
export const Top: Story = { args: { side: 'top' } };
export const NoDrag: Story = {
  args: { side: 'bottom', dragToDismiss: false },
};

const ImperativeDrawer = () => (
  <Button
    variant="contained"
    onClick={() => {
      overlay.open(({ isOpen, close, unmount }) => (
        <Drawer.Root
          isOpen={isOpen}
          onClose={close}
          onExitComplete={unmount}
          side="right"
        >
          <Drawer.Header>
            <Drawer.Title>imperative</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <p>overlay-kit으로 마운트한 Drawer</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="contained" onClick={close} className="flex-1">
              닫기
            </Button>
          </Drawer.Footer>
          <Drawer.Close />
        </Drawer.Root>
      ));
    }}
  >
    overlay.open으로 열기
  </Button>
);

export const Imperative: Story = {
  render: () => <ImperativeDrawer />,
};
