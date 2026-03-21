import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { WithdrawalErrorModal } from './withdrawal-error-modal';
import { WithdrawalModal } from './withdrawal-modal';
import { WithdrawalSuccessModal } from './withdrawal-success-modal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const noop = () => { };
const queryClient = new QueryClient();

const meta: Meta<typeof WithdrawalModal> = {
  title: 'Features/Auth/WithdrawalModal',
  component: WithdrawalModal,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
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
