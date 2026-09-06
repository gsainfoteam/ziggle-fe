import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Chip } from '@/common/components';
import { cn } from '@/common/utils';
import type { NoticeFormValues } from '@/features/write/viewmodels';

import { writeRequiredMarkClassName } from '../field-styles';

export const LanguageTab = () => {
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const { field } = useController({ control, name: 'writingTab' });
  const writingTab = field.value;

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label={t('sections.content')}
    >
      {(
        [
          ['korean', t('fields.korean_content')],
          ['english', t('fields.english_content')],
        ] as const
      ).map(([tab, label]) => {
        const selected = writingTab === tab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => field.onChange(tab)}
            className="cursor-pointer"
          >
            <Chip variant={selected ? 'selected' : 'deselected'}>
              {label}
              <span
                className={cn(
                  selected ? 'text-on-primary' : writeRequiredMarkClassName,
                )}
                aria-hidden
              >
                *
              </span>
            </Chip>
          </button>
        );
      })}
    </div>
  );
};
