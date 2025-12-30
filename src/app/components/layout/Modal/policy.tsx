'use client';

import { useTranslation } from '@/app/i18next/client';

interface ContentItem {
  subtitle?: string;
  text?: string;
  items?: string[];
  link?: string;
}

interface Section {
  id: number;
  title: string;
  content: ContentItem[];
}

const PrivacyPolicy = ({ lng }: { lng: 'ko' | 'en' }) => {
  const { t } = useTranslation(lng, 'policy');

  const notices = t('notices', { returnObjects: true }) as string[];
  const sections = t('sections', { returnObjects: true }) as Section[];
  const intro = t('intro');

  return (
    <div className="mx-auto max-w-3xl text-gray-800 dark:text-gray-200">
      {/* 헤더 영역 */}
      <h1 className="mb-2 text-3xl font-bold">{t('meta.title')}</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {t('meta.effectiveDateTitle')}: {t('meta.effectiveDate')} |{' '}
        {t('meta.publisher')}
      </p>

      {/* 공지사항 박스 */}
      {Array.isArray(notices) && notices.length > 0 && (
        <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/30">
          {notices.map((notice, idx) => (
            <p
              key={idx}
              className="mb-1 flex items-start gap-2 text-sm text-black last:mb-0 dark:text-gray-200"
            >
              <span>💡</span>
              {notice}
            </p>
          ))}
        </div>
      )}

      <p className="mb-8 whitespace-pre-wrap leading-relaxed">{intro}</p>

      {/* 본문 섹션 반복 렌더링 */}
      <div className="space-y-10">
        {Array.isArray(sections) &&
          sections.map((section) => (
            <section key={section.id}>
              <h2 className="mb-4 text-xl font-bold text-primary dark:text-blue-400">
                {section.id}. {section.title}
              </h2>

              <div className="space-y-4 pl-2">
                {section.content.map((item, idx) => (
                  <div key={idx}>
                    {item.subtitle && (
                      <h3 className="mb-1 font-semibold dark:text-gray-100">
                        • {item.subtitle}
                      </h3>
                    )}

                    {item.text && (
                      <p className="mb-2 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {item.text}
                      </p>
                    )}

                    {/* 리스트 항목이 있다면 */}
                    {item.items && item.items.length > 0 && (
                      <ul className="list-inside list-disc rounded-md bg-gray-50 p-3 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        {item.items.map((li, i) => (
                          <li key={i} className="mb-1 last:mb-0">
                            {li}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-500 underline hover:text-blue-600 dark:text-blue-400"
                      >
                        {t('meta.relatedLink')} &rarr;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
