import { useQuery } from "@tanstack/react-query";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import ZaboCarousel from "src/templates/zaboCarousel/ZaboCarousel";
import { noticesToManyZabos } from "src/utils/noticeToZabo";

const AcademicNotices = () => {
  const gistAcademicNoticeUrl =
    "https://www.gist.ac.kr/kr/html/sub05/050209.html";

  const { data } = useQuery(
    [
      queryKeys.getNotice,
      {
        tags: ["academic"],
      },
    ],
    getAllNotices,
  );

  if (!data) return <></>;

  return (
    <ZaboCarousel
      manyZabos={noticesToManyZabos(data.list)}
      carouselTitle={"📰 학사공지"}
      link={gistAcademicNoticeUrl}
      logName={"EventNotices"}
    />
  );
};

export default AcademicNotices;
