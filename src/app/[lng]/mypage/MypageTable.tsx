import dayjs from 'dayjs';

import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';
import LazyCat from '@/assets/lazy-cat.svg';

// interface Tag {
//   id: number;
//   name: string;
// }

interface NoticeBase {
  //id: number;
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

interface UnderLinedTextProps {
  text: string;
}

const UnderLinedText = ({ text }: UnderLinedTextProps) => {
  return (
    <div className="m-5 border-b border-gray-200 w-50 text-white">{text}</div>
  );
};

const MypageTable = async ({
  title,
  articles,
  link,
  lng,
}: MypageTableProps & { lng: Locale }) => {
  const { t } = await createTranslation(lng, 'translation');
  return (
    <div className="rounded-lg shadow-md bg-white w-[550px] xl:w-[600px]">
      <div className="w-full border border-white border-collapse border-spacing-0 rounded-lg">
        <div className="m-0 flex flex-row w-full border border-collapse border-spacing-0 rounded-tl-lg rounded-tr-lg bg-primary">
          <div className="w-3/4 rounded-tl-10">
            <div className="text-xl m-5 text-white font-bold">{title}</div>
          </div>
          <div className="w-1/4 rounded-tr-10 text-right">
            <div className="flex items-end justify-end text-s text-regular text-white h-full">
              <UnderLinedText text={t('mypage.totalList')}></UnderLinedText>
            </div>
          </div>
        </div>

        {articles.length > 0 &&
          articles.map((articleObj, index) => {
            const isLastRow = index === articles.length - 1;
            const borderBottomRadius = isLastRow ? '10px' : '0px';
            const underLine = isLastRow ? '' : 'border-b border-gray-300';
            return (
              <div
                key={index}
                className={`flex h-[70px] ${underLine} items-center flex-row justify-between bg-colorless rounded-bl-${borderBottomRadius} rounded-br-${borderBottomRadius}`}
              >
                <div
                  className={`pb-0 sm:pb-0 rounded-bl-${borderBottomRadius} leading-1.5`}
                >
                  <div className="text-regular m-3.5 text-text">
                    {articleObj.title}
                  </div>
                </div>
                <div
                  className={`items-end justify-end rounded-br-${borderBottomRadius}`}
                >
                  <div className="text-regular m-5 text-secondayText">
                    {dayjs(articleObj.createdAt).format('YYYY-MM-DD')}
                  </div>
                </div>
              </div>
            );
          })}
        {articles.length === 0 && (
          <div className="flex flex-col h-full justify-center items-center p-30 bg-colorless rounded-bl-0 rounded-br-10">
            <LazyCat className="p-5 w-50 h-50" />
            <div className="text-regular m-5 text-secondayText">
              {t('mypage.noArticle')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MypageTable;
