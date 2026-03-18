import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

interface LanguageTabProps {
  writingTab: 'korean' | 'english';
  setWritingTab: (writingTab: 'korean' | 'english') => void;
}

export const LanguageTab = ({
  writingTab,
  setWritingTab,
}: LanguageTabProps) => {
  const { t } = useTranslation('write');
  return (
    <div className="grid grid-cols-[90px_90px_1fr] justify-items-stretch">
      <button
        onClick={() => setWritingTab('korean')}
        className={cn(
          'border-b-[3px] p-3.75 pb-3',
          writingTab === 'korean' ? 'border-primary' : 'border-grey',
        )}
      >
        <p
          className={cn(
            'text-center',
            writingTab === 'korean' ? 'text-primary' : 'text-grey',
          )}
        >
          {t('fields.korean_notice')}
        </p>
      </button>
      <button
        onClick={() => setWritingTab('english')}
        className={cn(
          'border-b-[3px] p-3.75 pb-3',
          writingTab === 'english' ? 'border-primary' : 'border-grey',
        )}
      >
        <p
          className={cn(
            'text-center',
            writingTab === 'english' ? 'text-primary' : 'text-grey',
          )}
        >
          {t('fields.english_notice')}
        </p>
      </button>
      <div className="border-grey border-b-[3px]"></div>
    </div>
  );
};
