import { TermsModal } from './terms-modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Auth/TermsModal',
  component: TermsModal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TermsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Privacy: Story = {
  args: {
    termsOpen: { type: 'privacy', version: '250302' },
    onClose: () => {},
  },
};

export const Tos: Story = {
  args: {
    termsOpen: { type: 'tos', version: '250302' },
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    termsOpen: null,
    onClose: () => {},
  },
};
