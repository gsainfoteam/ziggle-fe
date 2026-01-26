import type { Meta, StoryObj } from '@storybook/react';

import PolicyModal from './PolicyModal';

const meta: Meta<typeof PolicyModal> = {
  title: 'PolicyModal',
  component: PolicyModal,
};

export default meta;

type Story = StoryObj<typeof PolicyModal>;

export const Primary: Story = {
  args: {
    close: () => {},
    lng: 'ko',
    isOpen: true,
    overlayId: 'story-overlay-id',
  },
};
