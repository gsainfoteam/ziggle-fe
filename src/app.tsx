import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { AccountProvider } from '@infoteam/account-react';
import { Toaster } from 'sonner';

import { Loading } from './common/components';
import { account } from './common/lib';
import { ThemeProvider } from './common/lib/theme';
import { queryClient, router } from './main';

import '@/common/lib/dayjs-init';
import '@/common/lib/init-amplitude';
import '@/common/lib/i18n';

export function App() {
  return (
    <AccountProvider client={account} fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Toaster />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </AccountProvider>
  );
}
