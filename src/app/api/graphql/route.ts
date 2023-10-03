import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

import { getAllNotices, getNotice } from '@/api/notice/notice';
import { Resolvers } from '@/generated/graphql';

import NoticesAPI from './notices-api';
import typeDefs from './schema.graphql';

export interface MyContext {
  dataSources: {
    noticesAPI: NoticesAPI;
  };
}

const resolvers: Resolvers = {
  Query: {
    notices: (_, { offset, limit }, { dataSources }) =>
      dataSources.noticesAPI.getNotices({
        offset: offset ?? 0,
        limit: limit ?? 10,
      }),
    notice: (_, { id }, { dataSources }) =>
      dataSources.noticesAPI.getNotice(id),
  },
};

const server = new ApolloServer<MyContext>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, MyContext>(
  server,
  {
    context: async (req) => ({
      req,
      dataSources: {
        noticesAPI: new NoticesAPI({ cache: server.cache }),
      },
    }),
  },
);

export { handler as GET, handler as POST };
