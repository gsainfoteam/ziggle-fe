import dummyZabos from "src/mock/dummy-zabos";

import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";

const EventNotices = () => {
  // const { data } = useQuery(

  return <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🎈 행사"} />;
};

export default EventNotices;
