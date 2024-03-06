'use client';

import '@/app/initDayjs';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { SWRConfig } from 'swr';

import api from '@/api';

import { PropsWithLng } from '../../i18next';

const apolloCache = new InMemoryCache({
  typePolicies: {
    Content: {
      keyFields: false,
    },
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

const InstallApp = dynamic(() => import('./InstallApp'), {
  ssr: false,
});

const InitClient = ({
  lng,
  children,
}: React.PropsWithChildren<PropsWithLng>) => (
  <SWRConfig
    value={{ fetcher: (path) => api.get(path).then(({ data }) => data) }}
  >
    <ApolloProvider client={apolloClient}>
      <Suspense>
        <InstallApp lng={lng} />
      </Suspense>
      {children}
    </ApolloProvider>
  </SWRConfig>
);

export default InitClient;
