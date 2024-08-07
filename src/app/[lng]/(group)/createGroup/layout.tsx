'use client';

import { usePathname } from 'next/navigation';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import StatusBar from './StatusBar';
import stepGetter from './stepGetter';

export default function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  const { t } = useTranslation(lng);

  const pathname = usePathname();
  const stepParam = pathname.split('/').pop();
  const step = stepGetter(stepParam, { t });

  return (
    <main className="flex flex-col items-center py-10">
      <div className="content flex max-w-[800px] flex-col">
        <h1 className="mb-[25px] text-4xl font-bold">
          {t('createGroup.createGroup')}
        </h1>

        <div className="flex items-center gap-[10px]">
          <div className="text-lg font-bold text-primary">
            {step.stepTranslation}
          </div>
          <div className="h-[1px] w-[40px] bg-greyDark" />
          <div className="text-lg font-medium text-greyDark">
            {step.stepNameTranslation}
          </div>
        </div>

        <div className="mt-[14px] w-full">
          <StatusBar maxStep={2} currentStep={step.step} />
        </div>
      </div>

      <div className="content flex max-w-[800px] flex-col items-center">
        {children}
      </div>
    </main>
  );
}
