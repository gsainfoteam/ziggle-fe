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
  const { t } = useTranslation('notice');
  return (
    <div className="grid grid-cols-[90px_90px_1fr] justify-items-stretch">
      <button
        onClick={() => setWritingTab('korean')}
        className={cn(
          'border-b-[3px] p-[15px] pb-3',
          writingTab === 'korean' ? 'border-primary' : 'border-grey',
        )}
      >
        <p
          className={cn(
            'text-center',
            writingTab === 'korean' ? 'text-primary' : 'text-grey',
          )}
        >
          {t('write.koreanNotice')}
        </p>
      </button>
      <button
        onClick={() => setWritingTab('english')}
        className={cn(
          'border-b-[3px] p-[15px] pb-3',
          writingTab === 'english' ? 'border-primary' : 'border-grey',
        )}
      >
        <p
          className={cn(
            'text-center',
            writingTab === 'english' ? 'text-primary' : 'text-grey',
          )}
        >
          {t('write.englishNotice')}
        </p>
      </button>
      <div className="border-grey border-b-[3px]"></div>
    </div>
  );
};
