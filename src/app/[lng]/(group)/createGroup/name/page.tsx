'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  GROUP_CREATION_NAME_ANIMATION_CONTAINER_VARIANT as CONTAINER_VARIANT,
  GROUP_CREATION_NAME_ANIMATION_ITEM_VARIANT as ITEM_VARIANT,
} from '@/app/[lng]/(group)/createGroup/animations';
import Button from '@/app/components/atoms/Button';
import Input from '@/app/components/molecules/Input';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import useGroupNameValidation from './useGroupNameValidation';
const CreateGroupSequenceName = ({
  params: { lng },
}: {
  params: PropsWithLng;
}) => {
  const { t } = useTranslation(lng);
  const { setGroupName, isGroupNameExists, isNextButtonValid } =
    useGroupNameValidation();

  const [isExiting, setIsExiting] = useState(false);

  const router = useRouter();
  const handleNextClick = () => {
    setIsExiting(true);

    setTimeout(() => {
      router.push(`/${lng}/createGroup/complete`);
    }, 600);
  };

  return (
    <>
      <div className="w-full md:flex md:h-[500px] md:flex-col md:items-center">
        <AnimatePresence>
          {!isExiting && (
            <motion.section
              variants={CONTAINER_VARIANT}
              animate="visible"
              exit="out"
              className={[
                'md:flex md:h-[500px] md:w-[400px] md:flex-col md:justify-center md:p-0',
                'w-full py-[60px]',
              ].join(' ')}
            >
              <motion.h2
                variants={ITEM_VARIANT}
                className="mb-[20px] text-2xl font-bold md:text-[28px]"
              >
                {t('createGroup.name.enterGroupName')}
              </motion.h2>

              <motion.div variants={ITEM_VARIANT}>
                <Input
                  placeholder={t('createGroup.name.placeholder')}
                  width="100%"
                  className="w-full"
                  title={t('createGroup.name.groupName')}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                  errorText={
                    isGroupNameExists
                      ? t('createGroup.name.exceptions.groupNameAlreadyExist')
                      : undefined
                  }
                />
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      <Button
        variant={isNextButtonValid ? 'contained' : 'disabled'}
        className="w-full py-[15px] text-[18px] md:w-[240px]"
        isBig
        disabled={!isNextButtonValid}
        onClick={handleNextClick}
      >
        {t('createGroup.next')}
      </Button>
    </>
  );
};

export default CreateGroupSequenceName;
