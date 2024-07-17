import { createTranslation, PropsWithLng } from '@/app/i18next';

const CreateGroupSequenceName = async ({
  params: { lng, step },
}: {
  params: PropsWithLng & { step: string };
}) => {
  const { t } = await createTranslation(lng);
  return (
    <>
      <section
        className={[
          'md:flex md:h-[500px] md:w-[400px] md:flex-col md:justify-center md:p-0',
          'py-[60px]',
        ].join(' ')}
      >
        <h2 className="mb-[20px] text-2xl font-bold md:text-[28px]">
          {t('createGroup.name.enterGroupName')}
        </h2>
      </section>
    </>
  );
};

export default CreateGroupSequenceName;
