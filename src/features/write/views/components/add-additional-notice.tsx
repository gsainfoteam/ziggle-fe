import { useTranslation } from 'react-i18next';

import AddIcon from '@/assets/icons/add.svg?react';

interface AddAdditionalNoticesProps {
  noticeId: number;
  originallyHasDeadline?: string;
  koreanContent: string;
  englishContent?: string;
  onKoreanContentChange: (value: string) => void;
  onEnglishContentChange?: (value: string) => void;
}

export const AddAdditionalNotice = ({
  koreanContent,
  englishContent,
  onKoreanContentChange,
  onEnglishContentChange,
}: AddAdditionalNoticesProps) => {
  const { t } = useTranslation('notice');

  const isEnglishSupported =
    englishContent !== undefined && onEnglishContentChange !== undefined;

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-3">
        <AddIcon className="stroke-text dark:stroke-dark_white w-5 md:w-6" />

        <p className="text-lg font-medium">
          {t('zabo.additionalNotices.title')}
        </p>
      </div>

      <textarea
        className="border-primary mt-1 mb-3 grow resize-none rounded-[10px] border border-solid bg-transparent p-4 text-base dark:text-white"
        name={'searchQuery'}
        placeholder={t('zabo.additionalNotices.additionalNoticePlaceholder')}
        rows={3}
        value={koreanContent}
        onChange={(event) => {
          onKoreanContentChange(event.target.value);
        }}
      />

      {isEnglishSupported && (
        <textarea
          className="border-primary mt-1 mb-3 grow resize-none rounded-[10px] border border-solid bg-transparent p-4 text-base dark:text-white"
          name={'searchQuery'}
          placeholder={t(
            'zabo.additionalNotices.enAdditionalNoticePlaceholder',
          )}
          rows={3}
          value={englishContent}
          onChange={(event) => {
            onEnglishContentChange(event.target.value);
          }}
        />
      )}
    </div>
  );
};
