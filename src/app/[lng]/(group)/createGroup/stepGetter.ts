import { ParseKeys } from 'i18next';

import { PropsWithT } from '@/app/i18next';

interface Step {
  step: number;
  stepTranslation: ParseKeys;
  stepNameTranslation: ParseKeys;
}

const stepGetter = (
  stepParam: string | undefined,
  { t }: PropsWithT,
): Step | never => {
  if (!stepParam) {
    throw new Error('param must be specified to get matched step.');
  }

  let step: Step = {
    step: 0,
    stepTranslation: t('error'),
    stepNameTranslation: t('error'),
  };

  switch (stepParam) {
    case 'name':
      step = {
        step: 1,
        stepTranslation: t('createGroup.name.step'),
        stepNameTranslation: t('createGroup.name.stepName'),
      };
      break;
    case 'members':
      step = {
        step: 2,
        stepTranslation: t('createGroup.members.step'),
        stepNameTranslation: t('createGroup.members.stepName'),
      };
      break;
    case 'complete':
      step = {
        step: 3,
        stepTranslation: t('createGroup.complete.step'),
        stepNameTranslation: t('createGroup.complete.stepName'),
      };
  }

  if (
    step.stepNameTranslation === t('error') ||
    step.stepNameTranslation === t('error')
  ) {
    throw new Error('invalid stepParam for stepGetter');
  }

  return step;
};

export default stepGetter;
