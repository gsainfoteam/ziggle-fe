import { Meta, StoryFn } from "@storybook/react";

// import colorSet from "src/styles/colorSet";
import ZaboCarousel from "./ZaboCarousel";

export default {
  title: "templates/zaboCarousel/ZaboCarousel",
  component: ZaboCarousel,
} as Meta<typeof ZaboCarousel>;

const Template: StoryFn<typeof ZaboCarousel> = (args) => (
  <ZaboCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  carouselTitle: "🌟 마감임박",
  manyZabos: [
    {
      id: 0,
      thumbnailUrl: "https://picsum.photos/3000/3000?random=1",
      title: "23년도 인포팀 신규 부원 모집",
      date: "2023.02.13",
      viewCount: 110,
      author: "이정우",
      organization: "INFOTEAM",
    },
    {
      id: 1,
      thumbnailUrl: "https://picsum.photos/4000/2000?random=2",
      title: "별 보는 낭만동아리 스페이스바 2023년도 신입 부원 리크루팅",
      date: "2023.02.13",
      viewCount: 110,
      author: "이정우",
      organization: "INFOTEAM",
    },
    {
      id: 2,
      thumbnailUrl: "https://picsum.photos/3000/4000?random=3",
      title: "공연동아리 지대로 연극 <ART> 선착순 티켓팅!!",
      date: "2023.02.13",
      viewCount: 110,
      author: "이정우",
      organization: "INFOTEAM",
    },
    {
      id: 3,
      thumbnailUrl: "https://picsum.photos/4000/4000?random=4",
      title: "휴익에 어서와!!! 23년도 휴강익스프레스 리크루팅 시작!!!! 많관부",
      date: "2023.02.13",
      viewCount: 110,
      author: "이정우",
      organization: "INFOTEAM",
    },
    {
      id: 4,
      thumbnailUrl: "https://picsum.photos/1000/1200?random=5",
      title: "MACMOO 막무가내 마라맛 원데이클래스",
      date: "2023.02.13",
      viewCount: 110,
      author: "이정우",
      organization: "INFOTEAM",
    },
    {
      id: 5,
      thumbnailUrl: "https://picsum.photos/1200/700?random=6",
      title: "공연동아리 지대로 연극 <ART> 선착순 티켓팅!!",
      date: "2023.02.13",
      viewCount: 110,
      author: "이정우",
      organization: "INFOTEAM",
    },
  ],
  //   carouselBGColor: colorSet.secondary,
};
