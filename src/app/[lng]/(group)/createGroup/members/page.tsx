import Button from '@/app/components/atoms/Button';
import Input from '@/app/components/molecules/Input';
import { createTranslation, PropsWithLng } from '@/app/i18next';

import MemberCard from './MemberCard';

const CreateGroupSequenceMembers = async ({
  params: { lng },
}: {
  params: PropsWithLng;
}) => {
  const { t } = await createTranslation(lng);

  return (
    <>
      <section
        className={[
          'md:min-h-[500px] md:w-[400px] md:p-0 md:pb-[100px] md:pt-[60px]',
          'w-full py-[60px]',
        ].join(' ')}
      >
        <h2 className="mb-[20px] text-2xl font-bold md:text-[28px]">
          {t('createGroup.members.inviteGroupMembers')}
        </h2>

        <Input
          placeholder={t('createGroup.members.placeholder')}
          width="100%"
          buttonValue={t('createGroup.enter')}
        />

        <section className="mt-[15px] flex w-full flex-col gap-[5px]">
          <MemberCard name="asdf" email="asdf@gmail.com" />
        </section>
      </section>

      <div className="flex w-full gap-[10px] md:w-auto">
        <Button
          variant="outlined"
          className="w-full py-[15px] text-[18px] md:w-[240px]"
          isBig
        >
          {t('createGroup.previous')}
        </Button>
        <Button
          variant="contained"
          className="w-full py-[15px] text-[18px] md:w-[240px]"
          isBig
        >
          {t('createGroup.skip')}
        </Button>
      </div>
    </>
  );
};

export default CreateGroupSequenceMembers;
