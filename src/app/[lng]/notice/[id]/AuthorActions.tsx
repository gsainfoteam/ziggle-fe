'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

import { DELETE_NOTICE } from '@/api/notice/notice';
import { T } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import AddIcon from '@/assets/icons/add.svg';
import ArrowIcon from '@/assets/icons/arrow-right.svg';
import LanguageIcon from '@/assets/icons/language.svg';
import RemoveIcon from '@/assets/icons/remove.svg';

import { apolloClient } from '../../InitClient';

interface WriterActionsProps {
  isEnglishNoticeExist: boolean;
  isAdditionalNoticeLimit: boolean;
  noticeId: number;
}

const AuthorActions = ({
  isEnglishNoticeExist,
  isAdditionalNoticeLimit,
  noticeId,
  lng,
}: WriterActionsProps & { lng: Locale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { t } = useTranslation(lng);
  const router = useRouter();

  const handleRemoveNotice = ({
    noticeId,
    t,
  }: { noticeId: number } & { t: T }) => {
    Swal.fire({
      text: t('zabo.authorActions.removeSure'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('alertResponse.confirm'),
      cancelButtonText: t('alertResponse.cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotice(noticeId)
          .then(() => {
            router.push(`/${lng}`);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const deleteNotice = async (noticeId: number) => {
    return await apolloClient.mutate({
      mutation: DELETE_NOTICE,
      variables: { id: noticeId },
    });
  };

  const handleWriteEnglishNotice = async () => {}

  return (
    <>
      {isMenuOpen ? (
        <div className="flex flex-col">
          <div
            className={
              'w-full rounded-t-2xl border-2 border-b-[1px] border-solid border-secondaryText ' +
              'cursor-pointer bg-secondary py-4 pl-6 pr-5 dark:bg-primary/10'
            }
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-xl text-primary">
                {t('zabo.authorActions.title')}
              </div>
              <div className="-rotate-90">
                <ArrowIcon className="w-6 fill-none stroke-primary dark:fill-none dark:stroke-primary" />
              </div>
            </div>
          </div>

          <div
            className={
              'w-full rounded-b-2xl border-2 border-t-[1px] border-solid border-secondaryText ' +
              'flex flex-col gap-y-4 px-6 py-6'
            }
          >
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                handleRemoveNotice({ noticeId, t });
              }}
            >
              <RemoveIcon className="w-6" />
              <div className="font-regular text-base text-secondaryText">
                {t('zabo.authorActions.removeNotice')}
              </div>
            </div>

            {!isEnglishNoticeExist && (
              <div className="flex cursor-pointer items-center gap-2">
                <LanguageIcon className="w-6 fill-primary" />
                <div className="font-regular text-base text-primary">
                  {t('zabo.authorActions.writeEnglishNotice')}
                </div>
              </div>
            )}

            <div className="flex cursor-pointer flex-col">
              <div className="flex items-center gap-2">
                <AddIcon className="w-6 fill-primary" />
                <div className="font-regular text-base text-primary">
                  {t('zabo.authorActions.writeAdditionalNotice')}
                </div>
              </div>

              <div className="text-sm text-secondaryText">
                {t('zabo.authorActions.writeAdditionalNoticeDescription')}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full cursor-pointer rounded-2xl border-2 border-solid border-secondaryText py-4 pl-6 pr-5"
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-xl">{t('zabo.authorActions.title')}</div>
            <div className="rotate-90">
              <ArrowIcon className="w-6 fill-none stroke-black dark:fill-none dark:stroke-white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorActions;
