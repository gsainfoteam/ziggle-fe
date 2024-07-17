import { ComponentProps, forwardRef } from 'react';

import Button from '../../atoms/Button';

interface InputProps extends ComponentProps<'input'> {
  buttonValue?: string;
  onButtonClick?: () => void;
  title?: string;
}

const Input = forwardRef(
  (
    { width, buttonValue, onButtonClick, title, ...rest }: InputProps,
    ref?: React.ForwardedRef<HTMLInputElement> | undefined,
  ) => {
    return (
      <div style={{ width }}>
        {title && <h6 className="mb-[10px] text-base font-medium">{title}</h6>}

        <div className="flex h-[48px] w-full gap-[10px]">
          <input
            ref={ref}
            {...rest}
            className={[
              'rounded-[10px] border-[1.5px] border-solid border-primary py-1 pl-4 pr-[10px]',
              rest.className,
            ].join(' ')}
          />

          {buttonValue && (
            <Button variant="contained" onClick={onButtonClick}>
              {buttonValue}
            </Button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'input';

export default Input;
