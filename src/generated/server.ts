import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../app/api/graphql/route';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Content = {
  __typename?: 'Content';
  body: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  deadline?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  lang: Scalars['String']['output'];
  noticeId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type DetailedNotice = {
  __typename?: 'DetailedNotice';
  author: Scalars['String']['output'];
  authorId: Scalars['String']['output'];
  body: Scalars['String']['output'];
  contents: Array<Content>;
  createdAt: Scalars['Date']['output'];
  currentDeadline?: Maybe<Scalars['Date']['output']>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
  files?: Maybe<Array<NoticeFile>>;
  id: Scalars['Int']['output'];
  imagesUrl: Array<Scalars['String']['output']>;
  reminder: Scalars['Boolean']['output'];
  tags: Array<Tag>;
  updatedAt: Scalars['Date']['output'];
  views: Scalars['Int']['output'];
};

export enum MineNotice {
  Own = 'OWN',
  Reminders = 'REMINDERS'
}

export type Mutation = {
  __typename?: 'Mutation';
  attachInternationalNotice: DetailedNotice;
  createAdditionalNotice: DetailedNotice;
  createNotice: DetailedNotice;
  deleteNotice: Scalars['Boolean']['output'];
};


export type MutationAttachInternationalNoticeArgs = {
  body: Scalars['String']['input'];
  contentId: Scalars['Int']['input'];
  deadline?: InputMaybe<Scalars['Date']['input']>;
  lang: Scalars['String']['input'];
  noticeId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateAdditionalNoticeArgs = {
  body: Scalars['String']['input'];
  deadline?: InputMaybe<Scalars['Date']['input']>;
  noticeId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateNoticeArgs = {
  body: Scalars['String']['input'];
  deadline?: InputMaybe<Scalars['Date']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
};


export type MutationDeleteNoticeArgs = {
  id: Scalars['Int']['input'];
};

export type Notice = {
  __typename?: 'Notice';
  author: Scalars['String']['output'];
  body: Scalars['String']['output'];
  contents: Array<Content>;
  createdAt: Scalars['Date']['output'];
  currentDeadline?: Maybe<Scalars['Date']['output']>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
  files?: Maybe<Array<NoticeFile>>;
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  tags: Array<Tag>;
  updatedAt: Scalars['Date']['output'];
  views: Scalars['Int']['output'];
};

export type NoticeFile = {
  __typename?: 'NoticeFile';
  createdAt: Scalars['Date']['output'];
  name: Scalars['String']['output'];
  noticeId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type Notices = {
  __typename?: 'Notices';
  list: Array<Notice>;
  total: Scalars['Int']['output'];
};

export enum OrderBy {
  Deadline = 'DEADLINE',
  Hot = 'HOT',
  Recent = 'RECENT'
}

export type Query = {
  __typename?: 'Query';
  notice?: Maybe<Notice>;
  notices: Notices;
};


export type QueryNoticeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryNoticesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  my?: InputMaybe<MineNotice>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrderBy>;
  search?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Content: ResolverTypeWrapper<Content>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DetailedNotice: ResolverTypeWrapper<DetailedNotice>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MineNotice: MineNotice;
  Mutation: ResolverTypeWrapper<{}>;
  Notice: ResolverTypeWrapper<Notice>;
  NoticeFile: ResolverTypeWrapper<NoticeFile>;
  Notices: ResolverTypeWrapper<Notices>;
  OrderBy: OrderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Content: Content;
  Date: Scalars['Date']['output'];
  DetailedNotice: DetailedNotice;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Notice: Notice;
  NoticeFile: NoticeFile;
  Notices: Notices;
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
};

export type ContentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noticeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DetailedNoticeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DetailedNotice'] = ResolversParentTypes['DetailedNotice']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contents?: Resolver<Array<ResolversTypes['Content']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  currentDeadline?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  files?: Resolver<Maybe<Array<ResolversTypes['NoticeFile']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imagesUrl?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  reminder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  attachInternationalNotice?: Resolver<ResolversTypes['DetailedNotice'], ParentType, ContextType, RequireFields<MutationAttachInternationalNoticeArgs, 'body' | 'contentId' | 'lang' | 'noticeId' | 'title'>>;
  createAdditionalNotice?: Resolver<ResolversTypes['DetailedNotice'], ParentType, ContextType, RequireFields<MutationCreateAdditionalNoticeArgs, 'body' | 'noticeId'>>;
  createNotice?: Resolver<ResolversTypes['DetailedNotice'], ParentType, ContextType, RequireFields<MutationCreateNoticeArgs, 'body' | 'title'>>;
  deleteNotice?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteNoticeArgs, 'id'>>;
};

export type NoticeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Notice'] = ResolversParentTypes['Notice']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contents?: Resolver<Array<ResolversTypes['Content']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  currentDeadline?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  files?: Resolver<Maybe<Array<ResolversTypes['NoticeFile']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoticeFileResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['NoticeFile'] = ResolversParentTypes['NoticeFile']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noticeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoticesResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Notices'] = ResolversParentTypes['Notices']> = {
  list?: Resolver<Array<ResolversTypes['Notice']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  notice?: Resolver<Maybe<ResolversTypes['Notice']>, ParentType, ContextType, RequireFields<QueryNoticeArgs, 'id'>>;
  notices?: Resolver<ResolversTypes['Notices'], ParentType, ContextType, Partial<QueryNoticesArgs>>;
};

export type TagResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  Content?: ContentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DetailedNotice?: DetailedNoticeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notice?: NoticeResolvers<ContextType>;
  NoticeFile?: NoticeFileResolvers<ContextType>;
  Notices?: NoticesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
};

