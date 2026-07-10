import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AddIcon from '@/assets/icons/add.svg?react';
import type { NoticeFormValues } from '@/features/write/viewmodels';

export const AddAdditionalNotice = () => {
  const { t } = useTranslation('notice');
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<NoticeFormValues>();

  const english = useWatch({ control, name: 'english' });
  const isEnglishSupported = english !== undefined;
  const koreanError = errors.korean?.additionalContent;

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-3">
        <AddIcon className="stroke-text dark:stroke-dark_white w-5 md:w-6" />

        <p className="text-lg font-medium">
          {t('detail.additional_notices.title')}
        </p>
      </div>

      <textarea
        className="border-primary mt-1 mb-3 grow resize-none rounded-[10px] border border-solid bg-transparent p-4 text-base dark:text-white"
        placeholder={t('detail.additional_notices.placeholder')}
        rows={3}
        {...register('korean.additionalContent')}
      />
      {koreanError?.message && (
        <div className="font-regular text-secondaryText mb-3 text-sm">
          {'⚠️ '}
          {koreanError.message}
        </div>
      )}

      {isEnglishSupported && (
        <textarea
          className="border-primary mt-1 mb-3 grow resize-none rounded-[10px] border border-solid bg-transparent p-4 text-base dark:text-white"
          placeholder={t('detail.additional_notices.en_placeholder')}
          rows={3}
          {...register('english.additionalContent')}
        />
      )}
    </div>
  );
};
