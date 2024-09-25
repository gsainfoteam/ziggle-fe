import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import Chip from '@/app/components/Chip';
import { PropsWithT } from '@/app/i18next';
import EventIcon from '@/assets/icons/event.svg';
import GeneralIcon from '@/assets/icons/general.svg';
import RecruitIcon from '@/assets/icons/recruit.svg';

export type NoticeType = 'recruit' | 'event' | 'general';
const noticeTypes: NoticeType[] = ['recruit', 'event', 'general'];

interface NoticeTypeSelectorProps {
  selectedNoticeType: NoticeType;
  setNoticeType: (noticeType: NoticeType) => void;
  disabled?: boolean;
}

const NoticeTypeSelector = ({
  selectedNoticeType,
  setNoticeType,
  t,
  disabled,
}: PropsWithT<NoticeTypeSelectorProps>) => {
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
              sendLog(LogEvents.noticeWritingPageSetType, {
                type: noticeType,
              });
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
          className={`${selectedNoticeType !== noticeType && 'hidden'}
            rounded-[10px] bg-greyLight p-6 dark:bg-dark_greyDark
          `}
        >
          <p className="mb-2 text-base font-semibold text-text md:text-xl">
            {t(`write.noticeTypes.${noticeType}.description.title`)}
          </p>
          <p className="font-regular text-sm text-text md:text-base">
            {t(`write.noticeTypes.${noticeType}.description.content`)}
          </p>
          <p className="font-regular text-sm text-secondaryText md:text-base">
            {t(`write.noticeTypes.${noticeType}.description.example`)}
          </p>
        </div>
      ))}
    </>
  );
};

export default NoticeTypeSelector;
