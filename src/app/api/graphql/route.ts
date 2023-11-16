import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

import { Resolvers } from '@/generated/server';

import NoticesAPI from './notices-api';
import typeDefs from './schema.graphql';

export interface MyContext {
  dataSources: {
    noticesAPI: NoticesAPI;
  };
}

const resolvers: Resolvers = {
  Query: {
    notices: (
      _,
      { offset, limit, my, orderBy, search, tags },
      { dataSources },
    ) =>
      dataSources.noticesAPI.getNotices({
        offset: offset ?? 0,
        limit: limit ?? 10,
        my: my ? (my.toLowerCase() as Lowercase<typeof my>) : undefined,
        orderBy: orderBy
          ? (orderBy.toLowerCase() as Lowercase<typeof orderBy>)
          : undefined,
        search: search ?? undefined,
        tags: tags ?? undefined,
      }),
    notice: (_, { id }, { dataSources }) =>
      dataSources.noticesAPI.getNotice(id),
  },
  Mutation: {
    createNotice: (
      _,
      { title, body, deadline, tags, images },
      { dataSources },
    ) =>
      dataSources.noticesAPI.createNotice({
        title,
        body,
        deadline,
        tags,
        images,
      }),
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
