import { cn } from '@/common/utils';

export const writeFieldClassName = cn(
  'border-border bg-muted text-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-2.5 outline-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60',
);

export const writeFieldInvalidClassName = cn('border-red-500');

export const writeFieldShellClassName = cn(
  'border-border bg-muted flex flex-wrap items-center gap-1.5 rounded-xl border px-2 py-1.5 outline-none focus-within:outline-none',
);

export const writeBlockHeadingClassName = cn(
  'text-foreground text-lg font-semibold tracking-tight',
);

export const writeFieldStackClassName = cn('flex flex-col gap-2');

export const writeFieldLabelClassName = cn(
  'text-foreground block text-sm font-medium',
);

export const writeHintClassName = cn('text-muted-foreground text-sm');

export const writeRequiredMarkClassName = cn('text-primary ml-0.5');

export const writeErrorClassName = cn('text-sm text-red-500');

export function writeFieldClassNames(invalid?: boolean) {
  return cn(writeFieldClassName, invalid && writeFieldInvalidClassName);
}
