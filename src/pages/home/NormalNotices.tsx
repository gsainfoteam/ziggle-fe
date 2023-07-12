import dummyZabos from "src/mock/dummy-zabos";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";

const NormalNotices = () => {
  // const { data } = useQuery([queryKeys.getNotice], getAllNotices);

  return <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🔔 일반"} />;
};

export default NormalNotices;
