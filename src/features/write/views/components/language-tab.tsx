import { useTranslation } from 'react-i18next';

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
    <div className={'grid grid-cols-[90px_90px_1fr] justify-items-stretch'}>
      <button
        onClick={() => setWritingTab('korean')}
        className={
          'border-b-[3px] p-[15px] pb-3 ' +
          (writingTab === 'korean' ? 'border-primary' : 'border-grey')
        }
      >
        <p
          className={
            'text-center ' +
            (writingTab === 'korean' ? 'text-primary' : 'text-grey')
          }
        >
          {t('write.koreanNotice')}
        </p>
      </button>
      <button
        onClick={() => setWritingTab('english')}
        className={
          'border-b-[3px] p-[15px] pb-3 ' +
          (writingTab === 'english' ? 'border-primary' : 'border-grey')
        }
      >
        <p
          className={
            'text-center ' +
            (writingTab === 'english' ? 'text-primary' : 'text-grey')
          }
        >
          {t('write.englishNotice')}
        </p>
      </button>
      <div className={'border-grey border-b-[3px]'}></div>
    </div>
  );
};
