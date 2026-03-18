import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import WithdrawalModal from './WithdrawalModal';
import WithdrawalSuccessModal from './WithdrawalSuccessModal';
import WithdrawalErrorModal from './WithdrawalErrorModal';

const meta: Meta<typeof WithdrawalModal> = {
  title: 'WithdrawalModal',
  component: WithdrawalModal,
};

export default meta;

type Story = StoryObj<typeof WithdrawalModal>;

export const Default: Story = {
  args: {
    lng: 'ko' as const,
    isOpen: false,
  },
  render: (args: Story['args']) => {
    const lng = (args?.lng ?? 'ko') as 'ko' | 'en';
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);

    return (
      <>
        <button
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm"
          onClick={() => setOpenConfirm(true)}
        >
          회원탈퇴
        </button>
        <WithdrawalModal
          isOpen={openConfirm}
          close={() => setOpenConfirm(false)}
          lng={lng}
          
          onWithdraw={async () => {}}
          onSuccess={() => {
            setOpenConfirm(false);
            setOpenSuccess(true);
          }}
        />

        <WithdrawalSuccessModal
          isOpen={openSuccess}
          close={() => setOpenSuccess(false)}
          lng={lng}
        />
      </>
    );
  },
};

export const Failure: Story = {
  args: {
    lng: 'ko' as const,
    isOpen: true,
  },
  render: (args: Story['args']) => {
    const lng = (args?.lng ?? 'ko') as 'ko' | 'en';
    const [openConfirm, setOpenConfirm] = React.useState(true);
    const [openError, setOpenError] = React.useState(false);

    return (
      <>
        <WithdrawalModal
          isOpen={openConfirm}
          close={() => setOpenConfirm(false)}
          lng={lng}
          
          onWithdraw={async () => {
            throw new Error('withdrawal failed');
          }}
          onFailure={() => {
            setOpenError(true);
          }}
        />

        <WithdrawalErrorModal
          isOpen={openError}
          close={() => setOpenError(false)}
          lng={lng}
        />
      </>
    );
  },
};