'use client';

import { useTranslation } from '@/app/i18next/client';

const PrivacyPolicy = ({ lng }: { lng: 'ko' | 'en' }) => {
  const { t, ready } = useTranslation(lng);
  if (!ready) return;
  if (ready)
    return (
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 text-gray-800 shadow-md dark:bg-gray-900 dark:text-gray-100">
        {/* --- Header --- */}
        <header className="mb-8 border-b border-gray-200 pb-4 dark:border-gray-700">
          <h1 className="mb-2 text-3xl font-bold">
            {t('privacyPolicyDetail.title')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('privacyPolicyDetail.effectiveDate')}
          </p>
        </header>

        <div className="space-y-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
            {t('privacyPolicyDetail.header')}
          </h2>

          {/* --- Section 1: Purpose --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.purpose.title')}
            </h3>
            <p className="mb-3 leading-relaxed">
              {t('privacyPolicyDetail.sections.purpose.content')}
            </p>
            <ul className="list-inside list-disc space-y-1 pl-4 text-gray-600 dark:text-gray-400">
              {(
                t('privacyPolicyDetail.sections.purpose.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* --- Section 2: Retention --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.retention.title')}
            </h3>
            <p className="leading-relaxed">
              {t('privacyPolicyDetail.sections.retention.content')}
            </p>
          </section>

          {/* --- Section 3: Items --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.items.title')}
            </h3>
            <p className="mb-3">
              {t('privacyPolicyDetail.sections.items.content')}
            </p>
            <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <p className="mb-1">
                <span className="font-semibold">· </span>
                {t('privacyPolicyDetail.sections.items.mandatory')}
              </p>
              <p>
                <span className="font-semibold">· </span>
                {t('privacyPolicyDetail.sections.items.optional')}
              </p>
            </div>
          </section>

          {/* --- Section 4: Third Party --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.thirdParty.title')}
            </h3>
            <p className="leading-relaxed">
              {t('privacyPolicyDetail.sections.thirdParty.content')}
            </p>
          </section>

          {/* --- Section 5: Entrustment --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.entrustment.title')}
            </h3>
            <p className="mb-3">
              {t('privacyPolicyDetail.sections.entrustment.content')}
            </p>
            <div className="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <p>{t('privacyPolicyDetail.sections.entrustment.trustee')}</p>
              <p>{t('privacyPolicyDetail.sections.entrustment.task')}</p>
            </div>
          </section>

          {/* --- Section 6: Rights --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.rights.title')}
            </h3>
            <p className="mb-3">
              {t('privacyPolicyDetail.sections.rights.content')}
            </p>
            <ul className="list-inside list-disc space-y-1 pl-4 text-gray-600 dark:text-gray-400">
              {(
                t('privacyPolicyDetail.sections.rights.list', {
                  returnObjects: true,
                }) as string[]
              ).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* --- Section 7: Safety --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.safety.title')}
            </h3>
            <p className="mb-3">
              {t('privacyPolicyDetail.sections.safety.content')}
            </p>
            <ul className="space-y-2 border-l-4 border-blue-500 bg-gray-50 py-3 pl-4 pr-3 dark:bg-gray-800">
              <li>{t('privacyPolicyDetail.sections.safety.managerial')}</li>
              <li>{t('privacyPolicyDetail.sections.safety.technical')}</li>
              <li>{t('privacyPolicyDetail.sections.safety.physical')}</li>
            </ul>
          </section>

          {/* --- Section 8: Officer --- */}
          <section>
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.officer.title')}
            </h3>
            <p className="mb-3">
              {t('privacyPolicyDetail.sections.officer.content')}
            </p>
            <div className="font-medium text-blue-600 dark:text-blue-400">
              <p>{t('privacyPolicyDetail.sections.officer.name')}</p>
              <p>{t('privacyPolicyDetail.sections.officer.contact')}</p>
            </div>
          </section>

          {/* --- Section 9: Changes --- */}
          <section className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
            <h3 className="mb-2 text-lg font-bold">
              {t('privacyPolicyDetail.sections.changes.title')}
            </h3>
            <p className="mb-4 leading-relaxed">
              {t('privacyPolicyDetail.sections.changes.content')}
            </p>
            <p className="text-right text-sm font-bold text-gray-500">
              {t('privacyPolicyDetail.sections.changes.lastModified')}
            </p>
          </section>
        </div>
      </div>
    );
};

export default PrivacyPolicy;
