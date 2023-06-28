import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";
import { dummyZabos } from "../../templates/zaboCarousel/ZaboCarousel.stories";

const HotNotices = () => {
  // const { data } = useQuery(

  return (
    <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🔥 오늘 끓는 공지"} />
  );
};

export default HotNotices;
