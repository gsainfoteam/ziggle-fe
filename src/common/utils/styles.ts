import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { createTV } from 'tailwind-variants';

const tokens = [] as const;

const twMergeConfig = {
  override: {
    classGroups: {
      'font-size': tokens,
      'font-weight': tokens,
    },
  },
};

const twMerge = extendTailwindMerge(twMergeConfig);

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export const cv = createTV({ twMerge: true, twMergeConfig });
