import { cn } from '@/common/utils';

export const writeFieldClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-2.5 outline-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

export const writeFieldInvalidClassName = 'border-red-500';

export const writeFieldShellClassName =
  'border-border bg-muted flex flex-wrap items-center gap-1.5 rounded-xl border px-2 py-1.5 outline-none focus-within:outline-none';

export const writeBlockHeadingClassName =
  'text-foreground text-lg font-semibold tracking-tight';

export const writeFieldStackClassName = 'flex flex-col gap-2';

export const writeFieldLabelClassName =
  'text-foreground block text-sm font-medium';

export const writeHintClassName = 'text-muted-foreground text-sm';

export const writeRequiredMarkClassName = 'text-primary ml-0.5';

export const writeErrorClassName = 'text-red-500 text-sm';

export function writeFieldClassNames(invalid?: boolean) {
  return cn(writeFieldClassName, invalid && writeFieldInvalidClassName);
}
