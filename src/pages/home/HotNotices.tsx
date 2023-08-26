import { useQuery } from "@tanstack/react-query";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import { noticesToManyZabos } from "src/utils/noticeToZabo";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";
import { NoticeSectionProps } from "./HomePage";

const HotNotices = ({ link }: NoticeSectionProps) => {
  const { data } = useQuery(
    [
      queryKeys.getNotice,
      {
        orderBy: "hot",
      },
    ],
    getAllNotices,
  );

  if (!data) return <></>;
  return (
    <ZaboCarousel
      manyZabos={noticesToManyZabos(data.list)}
      carouselTitle={"🔥 오늘 끓는 공지"}
      link={link}
    />
  );
};

export default HotNotices;
