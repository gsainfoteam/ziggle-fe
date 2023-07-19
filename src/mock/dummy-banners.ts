import { BannerProps } from "src/types/types";

import banner3 from "../pages/home/assets/banner_LEGACY.webp";
import banner1 from "../pages/home/assets/banner1.png";
import banner2 from "../pages/home/assets/banner2.png";

const dummyBanners: BannerProps[] = [
  {
    imageUrl: banner1,
    objectPosition: "right",
  },
  {
    imageUrl: banner2,
  },
  {
    imageUrl: banner3,
    objectPosition: "left",
  },
];

export default dummyBanners;