import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';
import type { NoticeFormValues } from '@/features/write/viewmodels';

import {
  writeErrorClassName,
  writeFieldClassNames,
  writeFieldLabelClassName,
  writeFieldStackClassName,
} from '../../form-fields/field-styles';

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
    <div className={writeFieldStackClassName}>
      <label className={writeFieldLabelClassName}>
        {t('detail.additional_notices.title')}
      </label>

      <textarea
        className={cn(
          writeFieldClassNames(Boolean(koreanError)),
          'min-h-24 resize-none',
        )}
        placeholder={t('detail.additional_notices.placeholder')}
        rows={3}
        aria-invalid={Boolean(koreanError)}
        {...register('korean.additionalContent')}
      />
      {koreanError?.message && (
        <p className={writeErrorClassName}>{koreanError.message}</p>
      )}

      {isEnglishSupported && (
        <textarea
          className={cn(writeFieldClassNames(false), 'min-h-24 resize-none')}
          placeholder={t('detail.additional_notices.en_placeholder')}
          rows={3}
          {...register('english.additionalContent')}
        />
      )}
    </div>
  );
};
