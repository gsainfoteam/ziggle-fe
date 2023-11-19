import { InputHTMLAttributes, useId } from 'react';

import RadioDeselected from './assets/radioDeselected.svg';
import RadioSelected from './assets/radioSelected.svg';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlId?: string;
}
const AddNoticeRadio = ({
  label,
  htmlId,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const id = useId();

  return (
    <div className={'flex gap-[10px]'}>
      <label htmlFor={htmlId || id}>
        <input
          id={htmlId || id}
          type={'checkbox'}
          checked={checked}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
          }}
          style={{
            display: 'none',
          }}
          {...props}
        />

        <div className={'flex gap-2 md:gap-[10px]'}>
          {checked ? (
            <RadioSelected className={'w-[16px] md:w-[20px]'} />
          ) : (
            <RadioDeselected className={'w-[16px] md:w-[20px]'} />
          )}

          <p
            className={
              'font-medium text-secondaryText group-hover:text-text text-sm md:text-xl'
            }
            // color={checked ? colorSet.text : colorSet.secondaryText}
          >
            리마인드 설정한 사람에게만 알림 보내기
          </p>
        </div>
      </label>
      <label htmlFor={htmlId || id}>
        <input
          id={htmlId || id}
          type={'checkbox'}
          checked={checked}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
          }}
          style={{
            display: 'none',
          }}
          {...props}
        />

        <div className={'flex gap-2 md:gap-[10px]'}>
          {checked ? (
            <RadioSelected className={'w-[16px] md:w-[20px]'} />
          ) : (
            <RadioDeselected className={'w-[16px] md:w-[20px]'} />
          )}

          <p
            className={
              'font-medium text-secondaryText group-hover:text-text text-sm md:text-xl'
            }
          >
            모든 사람에게 알림 보내기
          </p>
        </div>
      </label>
    </div>
  );
};

export default AddNoticeRadio;
