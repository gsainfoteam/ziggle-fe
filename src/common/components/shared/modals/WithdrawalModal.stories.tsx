import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import WithdrawalModal from './Withdrawal';
import WithdrawalSuccessModal from './WithdrawalSuccess';
import WithdrawalErrorModal from './WithdrawalError';

const meta: Meta<typeof WithdrawalModal> = {
  title: 'Common/Shared/WithdrawalModal',
  component: WithdrawalModal,
};

export default meta;

type Story = StoryObj<typeof WithdrawalModal>;

export const Default: Story = {
  args: { isOpen: false },
  render: () => {
    const lng = 'ko' as const;
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
    isOpen: true,
  },
  render: () => {
    const lng = 'ko' as const;
    const [openConfirm, setOpenConfirm] = React.useState(true);
    const [openError, setOpenError] = React.useState(false);

    return (
      <>
        <WithdrawalModal
          isOpen={openConfirm}
          close={() => setOpenConfirm(false)}
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