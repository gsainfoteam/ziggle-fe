import { InputHTMLAttributes, PropsWithChildren, useId } from 'react';

import CheckboxCheckedIcon from '@/assets/icons/checkbox-checked.svg';
import CheckboxNotCheckedIcon from '@/assets/icons/checkbox-not-checked.svg';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlId?: string;
}

const Checkbox = ({
  children,
  checked,
  onChange,
  htmlId,
  ...inputProps
}: PropsWithChildren<CheckboxProps>) => {
  const createdId = useId();
  const id = htmlId ?? createdId;

  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        {...inputProps}
      />

      <div className="flex gap-2">
        {checked ? (
          <CheckboxCheckedIcon className="w-5 dark:fill-white md:w-6" />
        ) : (
          <CheckboxNotCheckedIcon className="w-5 dark:fill-white md:w-6" />
        )}
        {children}
      </div>
    </label>
  );
};

export default Checkbox;
