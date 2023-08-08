import { useViewportSize } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import TextZabo from "src/organisms/zabo/TextZabo";
import Zabo from "src/organisms/zabo/Zabo";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import { noticeToZabo } from "src/utils/noticeToZabo";
import styled, { css } from "styled-components";

const MasonryResizer = styled.div<{ observerWidth: number }>`
  ${({ observerWidth }) => {
    if (observerWidth >= 1600) {
      return css`
        width: 1260px;
      `;
    } else if (observerWidth >= 1200) {
      return css`
        width: 940px;
      `;
    } else if (observerWidth >= 700) {
      return css`
        width: 620px;
      `;
    } else if (observerWidth >= 350) {
      return css`
        width: 300px;
      `;
    }
  }};
`;

const HowAboutThese = () => {
  // masonry width 조정을 위해 HowboutThese 컴포넌트의 width를 가져옴
  const observer = useViewportSize();
  const observerWidth = observer.width;

  const { data } = useQuery([queryKeys.getAllNotices, {}], getAllNotices);

  return (
    <>
      <Text
        size="2.8rem"
        color={colorSet.text}
        font={Font.Bold}
        style={{ margin: 0 }}
      >
        🫧 이런 공지는 어떠신가요?
      </Text>

      <Spacer height={"25px"} />

      {/* 감지용 컴포넌트 */}
      {/* <div style={{ width: "100%" }}>{observerWidth}</div> */}

      <MasonryResizer observerWidth={observerWidth}>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 700: 2, 1200: 3, 1600: 4 }}
        >
          <Masonry gutter="15px">
            {data?.list.map((notice) => {
              const zabo = noticeToZabo(notice, "width", 300);

              if (zabo.thumbnailUrl === undefined) {
                // thumbnailUrl이 없으면 TextZabo로 렌더링
                return (
                  <TextZabo
                    key={zabo.id}
                    id={zabo.id}
                    title={zabo.title}
                    date={zabo.date}
                    viewCount={zabo.viewCount}
                    author={zabo.author}
                    content={zabo.content}
                    organization={zabo.organization}
                    origin="width"
                    size={300}
                  />
                );
              } else {
                // thumbnailUrl이 있으면 Zabo로 렌더링
                return (
                  <Zabo
                    key={zabo.id}
                    id={zabo.id}
                    title={zabo.title}
                    date={zabo.date}
                    viewCount={zabo.viewCount}
                    author={zabo.author}
                    organization={zabo.organization}
                    thumbnailUrl={zabo.thumbnailUrl}
                    origin="width"
                    size={300}
                  />
                );
              }
            })}
          </Masonry>
        </ResponsiveMasonry>
      </MasonryResizer>
    </>
  );
};

export default HowAboutThese;
