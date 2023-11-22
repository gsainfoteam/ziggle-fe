import dayjs from 'dayjs';
import Link from 'next/link';

import { createTranslation, PropsWithLng } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';
import LazyCat from '@/assets/lazy-cat.svg';

// interface Tag {
//   id: number;
//   name: string;
// }

interface NoticeBase {
  id: number;
  title: string;
  //views: number;
  //body: string;
  //deadline: string | null;
  createdAt: string;
  //author: string;
  //tags: Tag[];
}

interface Notice extends NoticeBase {
  //imageUrl: string | null;
}

interface MypageTableProps {
  title: string;
  articles: Notice[];
  link: string;
}

const UnderLinedText = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-50 m-5 border-b border-gray-200 text-white">
      {children}
    </div>
  );
};

const MypageTable = async ({
  title,
  articles,
  link,
  lng,
}: PropsWithLng<MypageTableProps>) => {
  const { t } = await createTranslation(lng);
  return (
    <div className="w-[550px] rounded-lg bg-white shadow-md dark:bg-text xl:w-[600px]">
      <div className="w-full border-collapse border-spacing-0 overflow-hidden rounded-lg border border-white">
        <div className="m-0 flex w-full border-collapse border-spacing-0 flex-row bg-primary">
          <div className="rounded-tl-10 w-3/4">
            <div className="m-5 text-xl font-bold text-white">{title}</div>
          </div>
          <div className="rounded-tr-10 w-1/4 text-right">
            <Link
              href={link}
              className="text-s text-regular flex h-full items-end justify-end text-white"
            >
              <UnderLinedText>{t('mypage.totalList')}</UnderLinedText>
            </Link>
          </div>
        </div>

        {articles.map((articleObj, index) => {
          const isLastRow = index === articles.length - 1;
          const underLine = isLastRow ? '' : 'border-b border-gray-300';
          return (
            <Link
              key={index}
              className={`flex h-[70px] ${underLine} bg-colorless flex-row items-center justify-between`}
              href={`/notice/${articleObj.id}`}
            >
              <div className="leading-1.5 pb-0  sm:pb-0">
                <div className="text-regular m-3.5 text-text dark:text-white">
                  {articleObj.title}
                </div>
              </div>
              <div className="items-end justify-end">
                <div className="text-regular text-secondayText m-5">
                  {dayjs(articleObj.createdAt).format('YYYY-MM-DD')}
                </div>
              </div>
            </Link>
          );
        })}
        {articles.length === 0 && (
          <div className="p-30 bg-colorless rounded-bl-0 rounded-br-10 flex h-full flex-col items-center justify-center">
            <LazyCat className="w-50 h-50 p-5" />
            <div className="text-regular text-secondayText m-5">
              {t('mypage.noArticle')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MypageTable;
