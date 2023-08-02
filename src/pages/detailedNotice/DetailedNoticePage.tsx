import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Spacer from "src/atoms/spacer/Spacer";
import dummyDetailedNotice from "src/mock/dummy-detailed-notice";

import BackToMainBtn from "./BackToMainBtn";
import HowboutThese from "./HowboutThese";
import ImageCarousel from "./ImageCarousel";
import NoticeContent from "./NoticeContent";
import NoticeInfo from "./NoticeInfo";
import ZaboShowcase from "./ZaboShowcase";

export interface dummyDetailedNotice {
  title: string;
  isReminded: boolean;
  images: string[];
  deadline?: string;
  author: string;
  dateCreated: string;
  viewCount: number;
  tags: string[];
  content: string;
}

const DetailedNoticePage = () => {
  const dummyData: dummyDetailedNotice =
    dummyDetailedNotice.dummyDetailedNotice1;

  return (
    <Area>
      <ZaboShowcase src={dummyData.images[0]} />

      <Content>
        <Spacer height={"50px"} />

        <BackToMainBtn />

        <Spacer height={"20px"} />

        <NoticeInfo
          deadline={dummyData.deadline ?? undefined}
          title={dummyData.title}
          isReminded={dummyDetailedNotice.dummyDetailedNotice1.isReminded}
          author={dummyData.author}
          dateCreated={dummyData.dateCreated}
          viewCount={dummyData.viewCount}
          tags={dummyData.tags}
        />

        <Spacer height={"20px"} />

        <NoticeContent content={dummyData.content} />

        <Spacer height={"80px"} />

        <ImageCarousel imageSrcs={dummyData.images} />

        <Spacer height={"80px"} />

        <HowboutThese />
      </Content>
    </Area>
  );
};

export default DetailedNoticePage;
