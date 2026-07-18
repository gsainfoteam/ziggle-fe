import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  ConfettiIcon,
  MegaphoneIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react';
import { Chip } from '@/common/components';
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {noticeTypes.map((noticeType) => (
          <button
            type="button"
            className="cursor-pointer disabled:cursor-not-allowed"
            key={noticeType}
            disabled={disabled}
            onClick={() => field.onChange(noticeType)}
          >
            <Chip
              variant={
                selectedNoticeType === noticeType ? 'selected' : 'deselected'
              }
              disabled={disabled}
            >
              {(() => {
                switch (noticeType) {
                  case 'recruit':
                    return <UsersThreeIcon weight="fill" />;
                  case 'event':
                    return <ConfettiIcon weight="fill" />;
                  case 'general':
                    return <MegaphoneIcon weight="fill" />;
                }
              })()}
              <span>{t(`notice_types.${noticeType}.label`)}</span>
            </Chip>
          </button>
        ))}
      </div>

      <div className="bg-muted flex flex-col gap-1 rounded-xl px-4 py-3.5">
        <p className="text-foreground text-sm font-semibold">
          {t(`notice_types.${selectedNoticeType}.description.title`)}
        </p>
        <p className="text-foreground text-sm">
          {t(`notice_types.${selectedNoticeType}.description.content`)}
        </p>
        <p className="text-muted-foreground text-sm">
          {t(`notice_types.${selectedNoticeType}.description.example`)}
        </p>
      </div>
    </div>
  );
};
