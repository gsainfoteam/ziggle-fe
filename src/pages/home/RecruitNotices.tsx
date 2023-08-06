import { useQuery } from "@tanstack/react-query";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import { noticesToManyZabos } from "src/utils/noticeToZabo";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";

const RecruitNotices = () => {
  const { data } = useQuery(
    [
      queryKeys.getNotice,
      {
        tags: ["recruit"],
      },
    ],
    getAllNotices,
  );

  if (!data) return <></>;

  return (
    <ZaboCarousel
      manyZabos={noticesToManyZabos(data.list)}
      carouselTitle={"🎯 모집"}
    />
  );
};

export default RecruitNotices;
