import { useQuery } from "@tanstack/react-query";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import { noticesToManyZabos } from "src/utils/noticeToZabo";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";
import { NoticeSectionProps } from "./HomePage";

const GeneralNotices = ({ link }: NoticeSectionProps) => {
  const { data } = useQuery(
    [
      queryKeys.getNotice,
      {
        tags: ["general"],
      },
    ],
    getAllNotices,
  );

  if (!data) return <></>;

  return (
    <ZaboCarousel
      manyZabos={noticesToManyZabos(data.list)}
      carouselTitle={"🔔 일반"}
      link={link}
      logName={"GeneralNotices"}
    />
  );
};

export default GeneralNotices;
