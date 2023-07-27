import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Spacer from "src/atoms/spacer/Spacer";
import dummyDetailedNotice from "src/mock/dummy-detailed-notice";

import NoticeContent from "./NoticeContent";
import NoticeInfo from "./NoticeInfo";
import ZaboShowcase from "./ZaboShowcase";

const DetailedNoticePage = () => {
  const dummy1 = dummyDetailedNotice.dummyDetailedNotice1;

  return (
    <Area>
      <ZaboShowcase src={dummy1.images[0]} />
      <Content>
        <Spacer height={"50px"} />

        <NoticeInfo
          deadline={dummy1.deadline}
          title={dummy1.title}
          isReminded={dummyDetailedNotice.dummyDetailedNotice1.isReminded}
          author={dummy1.author}
          dateCreated={dummy1.dateCreated}
          viewCount={dummy1.viewCount}
          tags={dummy1.tags}
        />

        <Spacer height={"20px"} />

        <NoticeContent content={dummy1.content} />
      </Content>
    </Area>
  );
};

export default DetailedNoticePage;
