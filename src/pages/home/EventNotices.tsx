import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";
import { dummyZabos } from "../../templates/zaboCarousel/ZaboCarousel.stories";

const EventNotices = () => {
  // const { data } = useQuery(

  return <ZaboCarousel manyZabos={dummyZabos} carouselTitle={"🎈 행사"} />;
};

export default EventNotices;
