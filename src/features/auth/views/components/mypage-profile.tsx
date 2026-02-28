import { useTranslation } from 'react-i18next';

import { MypageBox } from './mypage-box';
import { useUser } from '../../viewmodels';

export const MypageProfile = () => {
  const { t } = useTranslation('auth');
  const { data: user } = useUser();

  if (!user) return null;

  const MYPAGE_FIELDS: {
    field: string | undefined;
    label: string;
  }[] = [
    {
      field: user.name,
      label: t('mypage.name'),
    },
    {
      field: user.studentNumber ?? '-',
      label: t('mypage.id'),
    },
    {
      field: user.email,
      label: t('mypage.email'),
    },
  ];

  return (
    <MypageBox>
      <div className="text-text dark:text-dark_white m-0 self-stretch text-left text-2xl font-semibold">
        {t('mypage.info')}
      </div>
      {MYPAGE_FIELDS.map(({ field, label }) => (
        <div
          key={field}
          className="flex w-full flex-wrap justify-between gap-4"
        >
          <div className="text-text dark:text-dark_white m-0 text-xl font-medium">
            {label}
          </div>
          <div className="text-greyDark dark:text-dark_grey m-0 text-xl font-normal">
            {field}
          </div>
        </div>
      ))}
    </MypageBox>
  );
};
