import type { components } from '@/@types/api-schema';

export type User = Omit<components['schemas']['UserInfoRes'], 'isAdmin'> & {
  /** Older deployments may omit this field; only true grants admin access. */
  isAdmin?: boolean;
};
export { ApiPaths } from '@/@types/api-schema';
