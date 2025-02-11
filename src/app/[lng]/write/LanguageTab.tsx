import { PropsWithT } from '@/app/i18next';

interface LanguageTabProps {
  writingTab: 'korean' | 'english';
  setWritingTab: (writingTab: 'korean' | 'english') => void;
}

const LanguageTab = ({
  writingTab,
  setWritingTab,
  t,
}: PropsWithT<LanguageTabProps>) => {
  return (
    <div className={'grid grid-cols-[90px_90px_1fr] justify-items-stretch'}>
      <button
        data-testid="write-korean-version-toggle"
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
        data-testid="write-english-version-toggle"
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
      <div className={'border-b-[3px] border-grey'}></div>
    </div>
  );
};

export default LanguageTab;
