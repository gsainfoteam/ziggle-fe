import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";
import { dummyZabos } from "../../templates/zaboCarousel/ZaboCarousel.stories";

const RecruitNotices = () => {
  // const { data } = useQuery([queryKeys.getNotice], getAllNotices);

  return <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🎯 모집"} />;
};

export default RecruitNotices;
