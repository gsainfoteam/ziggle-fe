import BannerInfoteam from '@/assets/images/banner_infoteam.svg?react';
import BannerPotG from '@/assets/images/banner_pot-g.svg?react';
import { BannerCarousel } from '@/common/components';

const slides = [
  {
    image: BannerInfoteam,
    url: 'https://www.notion.so/infoteam-rulrudino/2026-309365ea27df80488137d0680fd51686',
  },
  { image: BannerPotG, url: 'https://pot-g.gistory.me/' },
];

export function HomeBannerCarousel() {
  return <BannerCarousel slides={slides} />;
}
