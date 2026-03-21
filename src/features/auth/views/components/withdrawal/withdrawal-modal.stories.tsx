import type { Meta, StoryObj } from '@storybook/react';

import { WithdrawalErrorModal } from './withdrawal-error-modal';
import { WithdrawalModal } from './withdrawal-modal';
import { WithdrawalSuccessModal } from './withdrawal-success-modal';

const noop = () => { };

const meta: Meta<typeof WithdrawalModal> = {
  title: 'Auth/WithdrawalModal',
  component: WithdrawalModal,
};

export default meta;

type Story = StoryObj<typeof WithdrawalModal>;

export const Confirm: Story = {
  render: () => (
    <WithdrawalModal isOpen close={noop} />
  ),
};

export const Success: Story = {
  render: () => (
    <WithdrawalSuccessModal isOpen close={noop} />
  ),
};

export const ErrorState: Story = {
  render: () => (
    <WithdrawalErrorModal isOpen close={noop} />
  ),
};
