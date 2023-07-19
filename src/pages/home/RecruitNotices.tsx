import dummyZabos from "src/mock/dummy-zabos";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";

const RecruitNotices = () => {
  // const { data } = useQuery([queryKeys.getNotice], getAllNotices);

  return <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🎯 모집"} />;
};

export default RecruitNotices;
