/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetNotices($offset: Int, $limit: Int) {\n    notices(offset: $offset, limit: $limit) {\n      list {\n        id\n        views\n        body\n        currentDeadline\n        createdAt\n        updatedAt\n        deletedAt\n        author\n        imageUrl\n        tags {\n          id\n          name\n        }\n        contents {\n          id\n          lang\n          title\n          body\n          deadline\n          createdAt\n          noticeId\n        }\n        files {\n          uuid\n          name\n          createdAt\n          url\n          type\n          noticeId\n        }\n      }\n      total\n    }\n  }\n": types.GetNoticesDocument,
    "\n  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {\n    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n": types.CreateNoticeDocument,
    "\n  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!) {\n    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n": types.AttachInternationalNoticeDocument,
    "\n  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {\n    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n": types.CreateAdditionalNoticeDocument,
    "\n  mutation DeleteNotice($id: Int!) {\n    deleteNotice(id: $id)\n  }\n": types.DeleteNoticeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetNotices($offset: Int, $limit: Int) {\n    notices(offset: $offset, limit: $limit) {\n      list {\n        id\n        views\n        body\n        currentDeadline\n        createdAt\n        updatedAt\n        deletedAt\n        author\n        imageUrl\n        tags {\n          id\n          name\n        }\n        contents {\n          id\n          lang\n          title\n          body\n          deadline\n          createdAt\n          noticeId\n        }\n        files {\n          uuid\n          name\n          createdAt\n          url\n          type\n          noticeId\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query GetNotices($offset: Int, $limit: Int) {\n    notices(offset: $offset, limit: $limit) {\n      list {\n        id\n        views\n        body\n        currentDeadline\n        createdAt\n        updatedAt\n        deletedAt\n        author\n        imageUrl\n        tags {\n          id\n          name\n        }\n        contents {\n          id\n          lang\n          title\n          body\n          deadline\n          createdAt\n          noticeId\n        }\n        files {\n          uuid\n          name\n          createdAt\n          url\n          type\n          noticeId\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {\n    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {\n    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!) {\n    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!) {\n    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {\n    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {\n    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {\n      id\n      contents {\n        id\n        lang\n        title\n        body\n        deadline\n        createdAt\n        noticeId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteNotice($id: Int!) {\n    deleteNotice(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteNotice($id: Int!) {\n    deleteNotice(id: $id)\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;