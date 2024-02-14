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
    "\n  query GetNotices($offset: Int, $limit: Int) {\n    notices(offset: $offset, limit: $limit, orderBy: RECENT) {\n      list {\n        id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n      }\n      total\n    }\n  }\n": types.GetNoticesDocument,
    "\n  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {\n    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {\n      id\n      additionalContents {\n        id\n        deadline\n        content\n        lang\n        createdAt\n      }\n    }\n  }\n": types.CreateNoticeDocument,
    "\n  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!, $lang: String!) {\n    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId, lang: $lang) {\n      id\n    }\n  }\n": types.AttachInternationalNoticeDocument,
    "\n  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {\n    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {\n      id\n      additionalContents {\n        id\n        deadline\n        content\n        lang\n        createdAt\n      }\n    }\n  }\n": types.CreateAdditionalNoticeDocument,
    "\n  mutation DeleteNotice($id: Int!) {\n    deleteNotice(id: $id)\n  }\n": types.DeleteNoticeDocument,
    "\n  mutation AddReaction($noticeId: Int!, $emoji: String!) {\n    addReaction(noticeId: $noticeId, emoji: $emoji) {\n      id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n    }\n  }\n": types.AddReactionDocument,
    "\n  mutation DeleteReaction($noticeId: Int!, $emoji: String!) {\n    deleteReaction(noticeId: $noticeId, emoji: $emoji) {\n      id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n    }\n  }\n": types.DeleteReactionDocument,
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
export function gql(source: "\n  query GetNotices($offset: Int, $limit: Int) {\n    notices(offset: $offset, limit: $limit, orderBy: RECENT) {\n      list {\n        id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query GetNotices($offset: Int, $limit: Int) {\n    notices(offset: $offset, limit: $limit, orderBy: RECENT) {\n      list {\n        id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {\n    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {\n      id\n      additionalContents {\n        id\n        deadline\n        content\n        lang\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateNotice($title: String!, $body: String!, $deadline: Date, $tags: [Int!], $images: [String!]) {\n    createNotice(title: $title, body: $body, deadline: $deadline, tags: $tags, images: $images) {\n      id\n      additionalContents {\n        id\n        deadline\n        content\n        lang\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!, $lang: String!) {\n    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId, lang: $lang) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AttachInternationalNotice($title: String!, $body: String!, $deadline: Date, $noticeId: Int!, $contentId: Int!, $lang: String!) {\n    attachInternationalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId, contentId: $contentId, lang: $lang) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {\n    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {\n      id\n      additionalContents {\n        id\n        deadline\n        content\n        lang\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAdditionalNotice($title: String, $body: String!, $deadline: Date, $noticeId: Int!) {\n    createAdditionalNotice(title: $title, body: $body, deadline: $deadline, noticeId: $noticeId) {\n      id\n      additionalContents {\n        id\n        deadline\n        content\n        lang\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteNotice($id: Int!) {\n    deleteNotice(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteNotice($id: Int!) {\n    deleteNotice(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddReaction($noticeId: Int!, $emoji: String!) {\n    addReaction(noticeId: $noticeId, emoji: $emoji) {\n      id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n    }\n  }\n"): (typeof documents)["\n  mutation AddReaction($noticeId: Int!, $emoji: String!) {\n    addReaction(noticeId: $noticeId, emoji: $emoji) {\n      id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteReaction($noticeId: Int!, $emoji: String!) {\n    deleteReaction(noticeId: $noticeId, emoji: $emoji) {\n      id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteReaction($noticeId: Int!, $emoji: String!) {\n    deleteReaction(noticeId: $noticeId, emoji: $emoji) {\n      id\n        title\n        deadline\n        currentDeadline\n        langs\n        content\n        author {\n          name\n          uuid\n        }\n        createdAt\n        tags\n        views\n        imageUrls\n        documentUrls\n        isReminded\n        reactions {\n          emoji\n          count\n          isReacted\n        }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;