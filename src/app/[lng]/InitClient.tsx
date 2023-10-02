'use client';

import '@/app/initDayjs';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const InitClient = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default InitClient;
