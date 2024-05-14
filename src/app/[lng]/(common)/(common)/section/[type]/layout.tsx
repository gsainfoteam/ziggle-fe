import { createTranslation, PropsWithLng } from '@/app/i18next';

const AllNoticeLayout = async ({
  params: { lng, type },
  children,
}: {
  params: PropsWithLng<{ type: 'all' | 'urgent' }>;
  children: React.ReactNode;
}) => {
  const { t } = await createTranslation(lng);

  return (
    <div className="content mx-auto">
      <div className="my-7 flex flex-col gap-2 md:my-12">
        <h1 className="text-2xl font-bold md:text-4xl">
          {t(`notices.${type === 'urgent' ? 'deadline' : type}.label`)}
        </h1>
        <div className="text-xs font-medium text-secondaryText md:text-base">
          {t(`notices.${type === 'urgent' ? 'deadline' : type}.description`)}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AllNoticeLayout;
