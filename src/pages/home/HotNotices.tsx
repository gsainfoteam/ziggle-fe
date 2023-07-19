import dummyZabos from "src/mock/dummy-zabos";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";

const HotNotices = () => {
  // const { data } = useQuery(

  return (
    <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🔥 오늘 끓는 공지"} />
  );
};

export default HotNotices;
