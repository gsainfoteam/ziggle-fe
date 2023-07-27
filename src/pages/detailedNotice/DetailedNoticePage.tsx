import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import dummyDetailedNotice from "src/mock/dummy-detailed-notice";

import NoticeInfo from "./NoticeInfo";
import ZaboShowcase from "./ZaboShowcase";

const DetailedNoticePage = () => {
  const dummy1 = dummyDetailedNotice.dummyDetailedNotice1;

  return (
    <>
      <Area>
        <ZaboShowcase src={dummy1.images[0]} />
        <Content>
          <NoticeInfo
            deadline={dummy1.deadline}
            title={dummy1.title}
            isReminded={dummyDetailedNotice.dummyDetailedNotice1.isReminded}
            author={dummy1.author}
            dateCreated={dummy1.dateCreated}
            viewCount={dummy1.viewCount}
            tags={dummy1.tags}
          />
        </Content>
      </Area>
    </>
  );
};

export default DetailedNoticePage;
