import LazyCat from "@/assets/lazy-cat.svg";

interface Tag {
  id: number;
  name: string;
}

interface NoticeBase {
  id: number;
  title: string;
  views: number;
  body: string;
  deadline: string | null;
  createdAt: string;
  author: string;
  tags: Tag[];
}

interface Notice extends NoticeBase {
  imageUrl: string | null;
}

interface MypageTableProps {
  title: string;
  articles: Notice[];
  link: string;
}

const MypageTable = ({ title, articles, link }: MypageTableProps) => {
  return (
    <div className="rounded-lg shadow-md bg-white w-[700px]">
      <div className="w-full border border-white border-separate border-collapse border-spacing-0 rounded-lg">
        <div className="m-0 flex flex-row w-full border border-separate border-collapse border-spacing-0 rounded-tl-lg rounded-tr-lg bg-primary">
          <div className="w-4/5 rounded-tl-10">
            <div className="text-xl m-5 text-white font-bold">
              {title}
            </div>
          </div>
          <div className="rounded-tr-10">
            <div className="flex items-center justify-center text-s text-regular text-white h-full">
              전체보기
            </div>
          </div>
        </div>

        {articles.length > 0 &&
          articles.map((articleObj, index) => {
            const isLastRow = index === articles.length - 1;
            const borderBottomRadius = isLastRow ? "10px" : "0px";
            return (
              <div
                key={index}
                className={`flex items-center flex-row justify-between bg-colorless rounded-bl-${borderBottomRadius} rounded-br-${borderBottomRadius} border border-gray-200`}
              >
                <div
                  className={`p-10 sm:p-20 pb-0 sm:pb-0 rounded-bl-${borderBottomRadius} leading-1.5 w-70`}
                >
                  <div className="text-regular m-5 text-white">
                    {articleObj.title}
                  </div>
                </div>
                <div className={`rounded-br-${borderBottomRadius} p-0 sm:p-10`}>
                  <div className="text-regular m-5 text-white">
                    {formatISODate(articleObj.createdAt)}
                  </div>
                </div>
              </div>
            );
          })}
        {articles.length === 0 && (
          <div className="flex flex-col h-full justify-center items-center p-30 bg-colorless rounded-bl-0 rounded-br-10">
            <LazyCat className="p-5 w-50 h-50" />
            <div className="text-regular m-5 text-secondayText">
              아직 저장된 글이 없습니다. =ㅅ=
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MypageTable;
