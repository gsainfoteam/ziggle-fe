import { createTranslation, PropsWithLng } from '@/app/i18next';

const CreateGroupSequence = async ({
  params: { lng, step },
}: {
  params: PropsWithLng & { step: string };
}) => {
  const { t } = await createTranslation(lng);
  return <></>;
};

export default CreateGroupSequence;
