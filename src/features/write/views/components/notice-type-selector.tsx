import { useTranslation } from 'react-i18next';

import EventIcon from '@/assets/icons/event.svg?react';
import GeneralIcon from '@/assets/icons/general.svg?react';
import RecruitIcon from '@/assets/icons/recruit.svg?react';
import { cn } from '@/common/utils';

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
  const { t } = useTranslation('write');
  // t('notice_types.recruit.label'), t('notice_types.event.label'), t('notice_types.general.label')
  // t('notice_types.recruit.description.title'), t('notice_types.event.description.title'), t('notice_types.general.description.title')
  // t('notice_types.recruit.description.content'), t('notice_types.event.description.content'), t('notice_types.general.description.content')
  // t('notice_types.recruit.description.example'), t('notice_types.event.description.example'), t('notice_types.general.description.example')
  return (
    <>
      <div className="mb-5 flex gap-2.5">
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
              className="gap-1.25"
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
                {t(`notice_types.${noticeType}.label`)}
              </p>
            </Chip>
          </div>
        ))}
      </div>

      {noticeTypes.map((noticeType) => (
        <div
          key={noticeType}
          className={cn(
            selectedNoticeType !== noticeType && 'hidden',
            'bg-greyLight dark:bg-dark_greyDark rounded-[10px] p-6',
          )}
        >
          <p className="text-text mb-2 text-base font-semibold md:text-xl">
            {t(`notice_types.${noticeType}.description.title`)}
          </p>
          <p className="font-regular text-text text-sm md:text-base">
            {t(`notice_types.${noticeType}.description.content`)}
          </p>
          <p className="font-regular text-secondaryText text-sm md:text-base">
            {t(`notice_types.${noticeType}.description.example`)}
          </p>
        </div>
      ))}
    </>
  );
};
