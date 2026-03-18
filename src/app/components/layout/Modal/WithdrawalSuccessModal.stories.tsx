import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import WithdrawalSuccessModal from './WithdrawalSuccessModal';

const meta: Meta<typeof WithdrawalSuccessModal> = {
  title: 'WithdrawalSuccessModal',
  component: WithdrawalSuccessModal,
};

export default meta;

type Story = StoryObj<typeof WithdrawalSuccessModal>;

export const Default: Story = {
  args: {
    lng: 'ko',
    isOpen: true,
    close: () => {},
  },
  render: (args) => {
    const [open, setOpen] = React.useState(true);

    return (
      <>
        <button
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
          onClick={() => setOpen(true)}
        >
          탈퇴 성공
        </button>
        <WithdrawalSuccessModal
          {...args}
          isOpen={open}
          close={() => setOpen(false)}
        />
      </>
    );
  },
};

