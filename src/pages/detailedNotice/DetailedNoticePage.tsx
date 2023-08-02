import { useState } from "react";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Spacer from "src/atoms/spacer/Spacer";
import dummyDetailedNotice from "src/mock/dummy-detailed-notice";
import colorSet from "src/styles/colorSet";
import styled from "styled-components";

import BackToMainBtn from "./BackToMainBtn";
import FullPageImageViewer from "./FullPageImageViewer";
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

// 자보가 숨겨진 것처럼 보이기 위해 제작
const CoverContent = styled(Content)`
  z-index: 1;
  background-color: ${colorSet.colorless};
`;

const DetailedNoticePage = () => {
  const dummyData: dummyDetailedNotice =
    dummyDetailedNotice.dummyDetailedNotice2;

  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);

  return (
    <>
      <Area>
        <ZaboShowcase
          src={dummyData.images[0]}
          onShow={() => {
            setShowImageViewer(true);
          }}
        />

        <CoverContent>
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
        </CoverContent>
      </Area>

      {showImageViewer && (
        <FullPageImageViewer
          srcs={dummyData.images}
          startIndex={0}
          onClose={() => {
            setShowImageViewer(false);
          }}
        />
      )}
    </>
  );
};

export default DetailedNoticePage;
