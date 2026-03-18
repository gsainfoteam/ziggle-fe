import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import WithdrawalModal from './WithdrawalModal';

const meta: Meta<typeof WithdrawalModal> = {
  title: 'WithdrawalModal',
  component: WithdrawalModal,
};

export default meta;

type Story = StoryObj<typeof WithdrawalModal>;

const baseArgs = {
  lng: 'ko' as const,
  isOpen: false,
};

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  render: (args: Story['args']) => {
    const [open, setOpen] = React.useState(args?.isOpen ?? false);

    return (
      <>
        <button
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
          onClick={() => setOpen(true)}
        >
          회원탈퇴
        </button>
        <WithdrawalModal
          {...args}
          isOpen={open}
          close={() => setOpen(false)}
          lng={args?.lng ?? 'ko'}
          onSuccess={args?.onSuccess}
        />
      </>
    );
  },
};