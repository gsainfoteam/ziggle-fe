import { useQuery } from "@tanstack/react-query";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import { noticesToManyZabos } from "src/utils/noticeToZabo";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";

const UrgentNotices = () => {
  const { data } = useQuery(
    [
      queryKeys.getNotice,
      {
        orderBy: "deadline",
      },
    ],
    getAllNotices,
  );

  if (!data) return <></>;
  return (
    <ZaboCarousel
      manyZabos={noticesToManyZabos(data.list)}
      carouselTitle={"🌟 마감임박"}
      carouselBGColor={"#FFF3F3"}
      logName={"UrgentNotices"}
    />
  );
};

export default UrgentNotices;
