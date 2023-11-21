import { InputHTMLAttributes } from 'react';

import { T } from '@/app/i18next';

import RadioDeselected from './assets/radio-deselected.svg';
import RadioSelected from './assets/radio-selected.svg';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlId?: string;
  selected: string;
}
const AddNoticeRadio = ({
  label,
  selected,
  onChange,
  t,
  ...props
}: CheckboxProps & { t: T }) => {
  return (
    <div className={'flex flex-col gap-[10px]'}>
      <label htmlFor={'remindId'}>
        <input
          id={'remindId'}
          type={'checkbox'}
          checked={selected === 'remind'}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
          }}
          value={'remind'}
          style={{
            display: 'none',
          }}
          {...props}
        />

        <div className={'flex gap-2 md:gap-[10px]'}>
          {selected === 'remind' ? (
            <RadioSelected className={'w-[16px] md:w-[20px]'} />
          ) : (
            <RadioDeselected className={'w-[16px] md:w-[20px]'} />
          )}

          <p
            className={`font-regular text-sm ${
              selected === 'remind' ? 'text-primary' : 'text-secondaryText'
            } group-hover:text-text md:text-base`}
          >
            {t('zabo.additionalNotices.alertToReminded')}
          </p>
        </div>
      </label>
      <label htmlFor={'allId'}>
        <input
          id={'allId'}
          type={'checkbox'}
          checked={selected === 'all'}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
          }}
          value={'all'}
          style={{
            display: 'none',
          }}
          {...props}
        />

        <div className={'flex gap-2 md:gap-[10px]'}>
          {selected === 'all' ? (
            <RadioSelected className={'w-4 md:w-5'} />
          ) : (
            <RadioDeselected className={'w-[16px] md:w-[20px]'} />
          )}

          <p
            className={`font-regular text-sm ${
              selected === 'all' ? 'text-primary' : 'text-secondaryText'
            } group-hover:text-text md:text-base`}
          >
            {t('zabo.additionalNotices.alertToAll')}
          </p>
        </div>
      </label>
    </div>
  );
};

export default AddNoticeRadio;
