import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

const AllNoticeLayout = async ({
  params: { lng },
  children,
}: {
  params: { lng: Locale };
  children: React.ReactNode;
}) => {
  const { t } = await createTranslation(lng, 'translation');

  return (
    <div className="content mx-auto">
      <div className="flex flex-col gap-2 my-7 md:my-12">
        <h1 className="text-2xl md:text-4xl font-bold">
          {t('notices.all.label')}
        </h1>
        <div className="text-xs md:text-base font-medium text-secondayText">
          {t('notices.all.description')}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AllNoticeLayout;
