import { Check } from 'lucide-react';

import { cn } from '@/common/utils';

type CheckboxProps = React.ComponentPropsWithRef<'input'> & {
  checked: boolean;
};

export const Checkbox = ({
  checked,
  disabled,
  className,
  ...rest
}: CheckboxProps) => (
  <label
    className={cn(
      'relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-[5px] border transition-colors',
      'has-[:focus-visible]:outline-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2',
      checked
        ? 'border-primary bg-primary'
        : 'border-border bg-background',
      disabled && 'cursor-not-allowed opacity-40',
      className,
    )}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      className="sr-only"
      {...rest}
    />
    {checked && (
      <Check size={13} strokeWidth={3} className="text-on-primary" />
    )}
  </label>
);
