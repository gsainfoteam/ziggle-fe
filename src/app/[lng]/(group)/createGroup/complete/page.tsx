import { Trans } from 'react-i18next/TransWithoutContext';

import Button from '@/app/components/atoms/Button';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import CompleteAnimation from './CompleteAnimation';

const CreateGroupSequenceComplete = async ({
  params: { lng },
}: {
  params: PropsWithLng;
}) => {
  const { t } = await createTranslation(lng);

  return (
    <>
      <section className="flex w-full flex-col items-center justify-center py-[60px] md:min-h-[500px]">
        <CompleteAnimation />

        <h2 className="mb-[10px] mt-[15px] break-keep text-center text-[28px] font-bold">
          <Trans t={t} i18nKey="createGroup.complete.title">
            {{ groupName: 'asasdfsddf' }}
          </Trans>
        </h2>
        <p className="text-greyDark">{t('createGroup.complete.description')}</p>
      </section>

      <Button
        variant="contained"
        className="w-full py-[15px] text-[18px] md:w-[240px]"
        isBig
      >
        {t('createGroup.goBack')}
      </Button>
    </>
  );
};

export default CreateGroupSequenceComplete;
