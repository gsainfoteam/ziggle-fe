'use client';

import '@/app/initDayjs';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          notices: {
            keyArgs: false,
            merge: (existing, incoming, { args }) => {
              const merged = existing ? existing.list.slice(0) : [];
              if (incoming) {
                if (args) {
                  const { offset = 0 } = args;
                  for (let i = 0; i < incoming.list.length; ++i) {
                    merged[offset + i] = incoming.list[i];
                  }
                } else {
                  merged.push.apply(merged, incoming.list);
                }
              }
              return { ...incoming, list: merged };
            },
          },
        },
      },
    },
  }),
});

const InitClient = ({ children }: React.PropsWithChildren) => (
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ApolloProvider>
);

export default InitClient;
