import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";
import { dummyZabos } from "../../templates/zaboCarousel/ZaboCarousel.stories";

const NormalNotices = () => {
  // const { data } = useQuery([queryKeys.getNotice], getAllNotices);

  return <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🔔 일반"} />;
};

export default NormalNotices;
