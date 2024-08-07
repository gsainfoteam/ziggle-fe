'use client';

import { AnimatePresence, motion } from 'framer-motion';

import {
  GROUP_CREATION_MEMBERS_ANIMATION_CONTAINER_VARIANT as CONTAINER_VARIANT,
  GROUP_CREATION_MEMBERS_ANIMATION_ITEM_VARIANT as ITEM_VARIANT,
} from '@/app/[lng]/(group)/createGroup/animations';
import Button from '@/app/components/atoms/Button';
import Input from '@/app/components/molecules/Input';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MemberCard from './MemberCard';

/** @deprecated this component is unused. */
const CreateGroupSequenceMembers = ({
  params: { lng },
}: {
  params: PropsWithLng;
}) => {
  const { t } = useTranslation(lng);

  return (
    <>
      <AnimatePresence>
        <motion.section
          initial="initial"
          animate="visible"
          exit="out"
          variants={CONTAINER_VARIANT}
          className={[
            'md:min-h-[500px] md:w-[400px] md:p-0 md:pb-[100px] md:pt-[60px]',
            'w-full py-[60px]',
          ].join(' ')}
        >
          <motion.h2
            variants={ITEM_VARIANT}
            className="mb-[20px] text-2xl font-bold md:text-[28px]"
          >
            {t('createGroup.members.inviteGroupMembers')}
          </motion.h2>

          <motion.div variants={ITEM_VARIANT}>
            <Input
              placeholder={t('createGroup.members.placeholder')}
              width="100%"
              buttonValue={t('createGroup.enter')}
            />
          </motion.div>

          <motion.section
            variants={ITEM_VARIANT}
            className="mt-[15px] flex w-full flex-col gap-[5px]"
          >
            <MemberCard name="asdf" email="asdf@gmail.com" />
          </motion.section>
        </motion.section>
      </AnimatePresence>

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
