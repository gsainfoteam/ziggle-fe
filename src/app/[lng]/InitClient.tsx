'use client';

import '@/app/initDayjs';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import dynamic from 'next/dynamic';

const apolloCache = new InMemoryCache({
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
});

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: apolloCache,
});

const InstallApp = dynamic(() => import('./InstallApp'), { ssr: false });

const InitClient = ({ children }: React.PropsWithChildren) => (
  <ApolloProvider client={apolloClient}>
    <InstallApp />
    {children}
  </ApolloProvider>
);

export default InitClient;
