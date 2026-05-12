import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import EventIcon from '@/assets/icons/event.svg?react';
import GeneralIcon from '@/assets/icons/general.svg?react';
import RecruitIcon from '@/assets/icons/recruit.svg?react';
import { Chip } from '@/common/components';
import { cn } from '@/common/utils';
import type { NoticeFormValues, NoticeType } from '@/features/write/viewmodels';

const noticeTypes: NoticeType[] = ['recruit', 'event', 'general'];

interface NoticeTypeSelectorProps {
  disabled?: boolean;
}

export const NoticeTypeSelector = ({ disabled }: NoticeTypeSelectorProps) => {
  const { t } = useTranslation('write');
  const { control } = useFormContext<NoticeFormValues>();
  const { field } = useController({ control, name: 'noticeType' });
  const selectedNoticeType = field.value;

  return (
    <>
      <div className="mb-5 flex gap-2.5">
        {noticeTypes.map((noticeType) => (
          <div
            className="cursor-pointer"
            key={noticeType}
            onClick={() => {
              if (disabled) return;
              field.onChange(noticeType);
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
