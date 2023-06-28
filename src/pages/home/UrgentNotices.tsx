import ZaboCarousel from "../../templates/zaboCarousel/ZaboCarousel";
import { dummyZabos } from "../../templates/zaboCarousel/ZaboCarousel.stories";

const UrgentNotices = () => {
  // const { data } = useQuery([queryKeys.getNotice], getAllNotices);

  return (
    <ZaboCarousel
      manyZabos={dummyZabos}
      carouselTitle={"🌟 마감임박"}
      carouselBGColor={"#FFF3F3"}
    />
  );
};

export default UrgentNotices;
