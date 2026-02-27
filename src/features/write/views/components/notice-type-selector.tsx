import { useTranslation } from 'react-i18next';

import EventIcon from '@/assets/icons/event.svg?react';
import GeneralIcon from '@/assets/icons/general.svg?react';
import RecruitIcon from '@/assets/icons/recruit.svg?react';

import Chip from './chip';

export type NoticeType = 'recruit' | 'event' | 'general';
const noticeTypes: NoticeType[] = ['recruit', 'event', 'general'];

interface NoticeTypeSelectorProps {
  selectedNoticeType: NoticeType;
  setNoticeType: (noticeType: NoticeType) => void;
  disabled?: boolean;
}

export const NoticeTypeSelector = ({
  selectedNoticeType,
  setNoticeType,
  disabled,
}: NoticeTypeSelectorProps) => {
  const { t } = useTranslation('notice');
  // t('write.noticeTypes.recruit.label'), t('write.noticeTypes.event.label'), t('write.noticeTypes.general.label')
  // t('write.noticeTypes.recruit.description.title'), t('write.noticeTypes.event.description.title'), t('write.noticeTypes.general.description.title')
  // t('write.noticeTypes.recruit.description.content'), t('write.noticeTypes.event.description.content'), t('write.noticeTypes.general.description.content')
  // t('write.noticeTypes.recruit.description.example'), t('write.noticeTypes.event.description.example'), t('write.noticeTypes.general.description.example')
  return (
    <>
      <div className="mb-5 flex gap-[10px]">
        {noticeTypes.map((noticeType) => (
          <div
            className="cursor-pointer"
            key={noticeType}
            onClick={() => {
              if (disabled) return;
              setNoticeType(noticeType);
              // TODO: send log
              // sendLog(LogEvents.writingSelectType, {
              //   type: noticeType,
              // });
            }}
          >
            <Chip
              variant={
                selectedNoticeType === noticeType ? 'selected' : 'deselected'
              }
              disabled={disabled}
              className={'gap-[5px]'}
            >
              {(() => {
                switch (noticeType) {
                  case 'recruit':
                    return <RecruitIcon />;
                  case 'event':
                    return <EventIcon />;
                  case 'general':
                    return <GeneralIcon />;
                }
              })()}
              <p className="text-base">
                {t(`write.noticeTypes.${noticeType}.label`)}
              </p>
            </Chip>
          </div>
        ))}
      </div>

      {noticeTypes.map((noticeType) => (
        <div
          key={noticeType}
          className={`${selectedNoticeType !== noticeType && 'hidden'} bg-greyLight dark:bg-dark_greyDark rounded-[10px] p-6`}
        >
          <p className="text-text mb-2 text-base font-semibold md:text-xl">
            {t(`write.noticeTypes.${noticeType}.description.title`)}
          </p>
          <p className="font-regular text-text text-sm md:text-base">
            {t(`write.noticeTypes.${noticeType}.description.content`)}
          </p>
          <p className="font-regular text-secondaryText text-sm md:text-base">
            {t(`write.noticeTypes.${noticeType}.description.example`)}
          </p>
        </div>
      ))}
    </>
  );
};
