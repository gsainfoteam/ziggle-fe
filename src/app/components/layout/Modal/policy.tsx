import privacyData from './policy.json';

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-3xl text-gray-800 dark:text-dark_white">
      {/* 헤더 영역 */}
      <h1 className="mb-2 text-3xl font-bold">{privacyData.meta.title}</h1>
      <p className="mb-6 text-sm text-gray-500">
        시행일: {privacyData.meta.effectiveDate} | {privacyData.meta.publisher}
      </p>

      {/* 공지사항 박스 */}
      <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        {privacyData.notices.map((notice, idx) => (
          <p
            key={idx}
            className="dark: mb-1 flex items-start gap-2 text-sm text-black last:mb-0 "
          >
            <span>💡</span>
            {notice}
          </p>
        ))}
      </div>

      <p className="mb-8 leading-relaxed">{privacyData.intro}</p>

      {/* 본문 섹션 반복 렌더링 */}
      <div className="space-y-10">
        {privacyData.sections.map((section) => (
          <section key={section.id}>
            <h2 className="mb-4 text-xl font-bold text-primary">
              {section.id}. {section.title}
            </h2>

            <div className="space-y-4 pl-2">
              {section.content.map((item, idx) => (
                <div key={idx}>
                  {'subtitle' in item && (
                    <h3 className="mb-1 font-semibold">• {item.subtitle}</h3>
                  )}

                  {'text' in item && (
                    <p className="dark: text-dark mb-2 whitespace-pre-wrap">
                      {item.text}
                    </p>
                  )}

                  {/* 리스트 항목이 있다면 */}
                  {'items' in item && (
                    <ul className="list-inside list-disc rounded-md bg-gray-50 p-3 text-gray-600">
                      {item.items?.map((li: string, i: number) => (
                        <li key={i} className="mb-1">
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}

                  {'link' in item && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-500 underline"
                    >
                      관련 링크 바로가기 &rarr;
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
