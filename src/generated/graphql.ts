/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  files: Array<NoticeFile>;
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

export type GetNoticesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetNoticesQuery = { __typename?: 'Query', notices: { __typename?: 'Notices', total: number, list: Array<{ __typename?: 'Notice', id: number, views: number, body: string, currentDeadline?: any | null, createdAt: any, updatedAt: any, deletedAt?: any | null, author: string, imageUrl?: string | null, tags: Array<{ __typename?: 'Tag', id: number, name: string }>, contents: Array<{ __typename?: 'Content', id: number, lang: string, title: string, body: string, deadline?: any | null, createdAt: any, noticeId: number }> }> } };

export type CreateNoticeMutationVariables = Exact<{
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  deadline?: InputMaybe<Scalars['Date']['input']>;
  tags?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateNoticeMutation = { __typename?: 'Mutation', createNotice: { __typename?: 'DetailedNotice', id: number, contents: Array<{ __typename?: 'Content', id: number, lang: string, title: string, body: string, deadline?: any | null, createdAt: any, noticeId: number }> } };

export type AttachInternationalNoticeMutationVariables = Exact<{
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  deadline?: InputMaybe<Scalars['Date']['input']>;
  noticeId: Scalars['Int']['input'];
  contentId: Scalars['Int']['input'];
  lang: Scalars['String']['input'];
}>;


export type AttachInternationalNoticeMutation = { __typename?: 'Mutation', attachInternationalNotice: { __typename?: 'DetailedNotice', id: number, contents: Array<{ __typename?: 'Content', id: number, lang: string, title: string, body: string, deadline?: any | null, createdAt: any }> } };

export type CreateAdditionalNoticeMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  body: Scalars['String']['input'];
  deadline?: InputMaybe<Scalars['Date']['input']>;
  noticeId: Scalars['Int']['input'];
}>;


export type CreateAdditionalNoticeMutation = { __typename?: 'Mutation', createAdditionalNotice: { __typename?: 'DetailedNotice', id: number, contents: Array<{ __typename?: 'Content', id: number, lang: string, title: string, body: string, deadline?: any | null, createdAt: any, noticeId: number }> } };

export type DeleteNoticeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteNoticeMutation = { __typename?: 'Mutation', deleteNotice: boolean };


export const GetNoticesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"RECENT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"currentDeadline"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"noticeId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetNoticesQuery, GetNoticesQueryVariables>;
export const CreateNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"images"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"deadline"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"images"},"value":{"kind":"Variable","name":{"kind":"Name","value":"images"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"noticeId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateNoticeMutation, CreateNoticeMutationVariables>;
export const AttachInternationalNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttachInternationalNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noticeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lang"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachInternationalNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"deadline"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}}},{"kind":"Argument","name":{"kind":"Name","value":"noticeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noticeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lang"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lang"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<AttachInternationalNoticeMutation, AttachInternationalNoticeMutationVariables>;
export const CreateAdditionalNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAdditionalNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noticeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAdditionalNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"deadline"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}}},{"kind":"Argument","name":{"kind":"Name","value":"noticeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noticeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"noticeId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAdditionalNoticeMutation, CreateAdditionalNoticeMutationVariables>;
export const DeleteNoticeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNotice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteNoticeMutation, DeleteNoticeMutationVariables>;