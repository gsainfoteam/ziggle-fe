import { createTranslation, PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import BonFire from '@/assets/logos/bonfire.svg';

const NotInGroup = async ({ params: { lng } }: { params: PropsWithLng }) => {
  const { t } = await createTranslation(lng);

  return (
    <div className="flex flex-col items-center ">
      <BonFire />
      <div className="mt-5 text-lg font-semibold text-greyDark">
        {t('group.mainLogo')}
      </div>
    </div>
  );
};

export default NotInGroup;
