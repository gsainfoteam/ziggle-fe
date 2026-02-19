"use client";

import BannerCarousel from '@/app/components/shared/BannerCarousel';
import BannerInfoteam from '@/assets/images/banner_infoteam.svg';
import BannerPotg from '@/assets/images/banner_pot-g.svg';

const slides = [
  {
    image: BannerInfoteam,
    url: 'https://www.notion.so/infoteam-rulrudino/2026-309365ea27df80488137d0680fd51686',
  },
  { image: BannerPotg, url: 'https://pot-g.gistory.me/' },
];

export default function HomeBannerCarousel() {
  return <BannerCarousel slides={slides} />;
}
