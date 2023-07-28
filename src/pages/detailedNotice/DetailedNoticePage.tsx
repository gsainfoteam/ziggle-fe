import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Spacer from "src/atoms/spacer/Spacer";
import dummyDetailedNotice from "src/mock/dummy-detailed-notice";

import BackToMainBtn from "./BackToMainBtn";
import ImageCarousel from "./ImageCarousel";
import NoticeContent from "./NoticeContent";
import NoticeInfo from "./NoticeInfo";
import ZaboShowcase from "./ZaboShowcase";

const DetailedNoticePage = () => {
  const dummy1 = dummyDetailedNotice.dummyDetailedNotice2;

  return (
    <Area>
      <ZaboShowcase src={dummy1.images[0]} />

      <Content>
        <Spacer height={"50px"} />

        <BackToMainBtn />

        <Spacer height={"20px"} />

        <NoticeInfo
          deadline={dummy1.deadline ?? undefined}
          title={dummy1.title}
          isReminded={dummyDetailedNotice.dummyDetailedNotice1.isReminded}
          author={dummy1.author}
          dateCreated={dummy1.dateCreated}
          viewCount={dummy1.viewCount}
          tags={dummy1.tags}
        />

        <Spacer height={"20px"} />

        <NoticeContent content={dummy1.content} />

        <Spacer height={"80px"} />

        <ImageCarousel imageSrcs={dummy1.images} />
      </Content>
    </Area>
  );
};

export default DetailedNoticePage;
