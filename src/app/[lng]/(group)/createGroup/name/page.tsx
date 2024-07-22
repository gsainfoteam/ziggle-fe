import Button from '@/app/components/atoms/Button';
import Input from '@/app/components/molecules/Input';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import useDebouncedState from '@/hooks/useDebouncedState';

const CreateGroupSequenceName = async ({
  params: { lng },
}: {
  params: PropsWithLng;
}) => {
  const { t } = await createTranslation(lng);

  const [debouncedGroupName, setGroupName, groupName] =
    useDebouncedState<string>('');

  return (
    <>
      <section
        className={[
          'md:flex md:h-[500px] md:w-[400px] md:flex-col md:justify-center md:p-0',
          'w-full py-[60px]',
        ].join(' ')}
      >
        <h2 className="mb-[20px] text-2xl font-bold md:text-[28px]">
          {t('createGroup.name.enterGroupName')}
        </h2>

        <Input
          placeholder={t('createGroup.name.placeholder')}
          width="100%"
          className="w-full"
          title={t('createGroup.name.groupName')}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
      </section>
      <Button
        variant="disabled"
        className="w-full py-[15px] text-[18px] md:w-[240px]"
        isBig
      >
        {t('createGroup.next')}
      </Button>
    </>
  );
};

export default CreateGroupSequenceName;
