/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  File: { input: File; output: File; }
};

export type Mutation = {
  process_image?: Maybe<ProcessResponse>;
};


export type MutationProcess_ImageArgs = {
  camera_image?: InputMaybe<Scalars['File']['input']>;
  original_image?: InputMaybe<Scalars['File']['input']>;
};

export type ProcessResponse = {
  url?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  hello?: Maybe<Hello_Response>;
};

export type Hello_Response = {
  message?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type UploadImageMutationMutationVariables = Exact<{
  somefile?: InputMaybe<Scalars['File']['input']>;
  somefile2?: InputMaybe<Scalars['File']['input']>;
}>;


export type UploadImageMutationMutation = { process_image?: { url?: string | null } | null };


export const UploadImageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadImageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"somefile"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"File"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"somefile2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"File"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"process_image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"camera_image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"somefile"}}},{"kind":"Argument","name":{"kind":"Name","value":"original_image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"somefile2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadImageMutationMutation, UploadImageMutationMutationVariables>;