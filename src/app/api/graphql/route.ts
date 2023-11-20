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
  accessToken: string | null;
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
      { dataSources, accessToken },
    ) =>
      dataSources.noticesAPI.createNotice(
        { title, body, deadline, tags, images },
        accessToken!,
      ),
    attachInternationalNotice: (
      _,
      { title, body, deadline, noticeId, contentId },
      { dataSources, accessToken },
    ) =>
      dataSources.noticesAPI.attachInternationalNotice(
        { title, body, deadline, noticeId, contentId },
        accessToken!,
      ),
    createAdditionalNotice: (
      _,
      { title, body, deadline, noticeId },
      { dataSources, accessToken },
    ) =>
      dataSources.noticesAPI.createAdditionalNotice(
        { title: title || undefined, body, deadline, noticeId },
        accessToken!,
      ),
  },
};

const server = new ApolloServer<MyContext>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest, MyContext>(
  server,
  {
    context: async (req) => {
      const accessToken = req.cookies.get('access_token')?.value ?? null;
      return {
        req,
        accessToken,
        dataSources: {
          noticesAPI: new NoticesAPI({ cache: server.cache }),
        },
      };
    },
  },
);

export { handler as GET, handler as POST };
