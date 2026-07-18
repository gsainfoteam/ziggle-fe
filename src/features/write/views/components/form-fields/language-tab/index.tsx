import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';
import type { NoticeFormValues } from '@/features/write/viewmodels';

export const LanguageTab = () => {
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const { field } = useController({ control, name: 'writingTab' });
  const writingTab = field.value;
  const setWritingTab = (tab: 'korean' | 'english') => field.onChange(tab);

  return (
    <div className="grid grid-cols-[90px_90px_1fr] justify-items-stretch">
      <button
        onClick={() => setWritingTab('korean')}
        className={cn(
          'border-b-[3px] p-3.75 pb-3',
          writingTab === 'korean'
            ? 'border-primary'
            : 'border-muted-foreground',
        )}
      >
        <p
          className={cn(
            'text-center',
            writingTab === 'korean' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {t('fields.korean_notice')}
        </p>
      </button>
      <button
        onClick={() => setWritingTab('english')}
        className={cn(
          'border-b-[3px] p-3.75 pb-3',
          writingTab === 'english'
            ? 'border-primary'
            : 'border-muted-foreground',
        )}
      >
        <p
          className={cn(
            'text-center',
            writingTab === 'english' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {t('fields.english_notice')}
        </p>
      </button>
      <div className="border-muted-foreground border-b-[3px]"></div>
    </div>
  );
};
