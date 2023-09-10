import { useViewportSize } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import Zabo from "src/organisms/zabo/Zabo";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import SearchResult from "src/templates/searchResult/SearchResult";
import { MOBILE_BREAKPOINT } from "src/types/types";
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

const ITEMS_PER_CALL = 10;

const HowAboutThese = () => {
  // masonry width 조정을 위해 HowboutThese 컴포넌트의 width를 가져옴
  const observer = useViewportSize();
  const observerWidth = observer.width;
  const observerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { data, fetchNextPage } = useInfiniteQuery(
    [queryKeys.getAllNotices],
    ({ queryKey, pageParam = 0 }) =>
      getAllNotices({
        queryKey: [
          queryKey[0],
          {
            offset: pageParam * ITEMS_PER_CALL,
          },
        ],
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (
          lastPage.total >
          allPages.reduce((acc, cur) => acc + cur.list.length, 0)
        ) {
          return allPages.length;
        }
      },
    },
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        fetchNextPage();
        observer.disconnect();
      }
    });
    const current = observerRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [observerRef, fetchNextPage, data]);

  return (
    <>
      <Text
        size={isMobile ? "1.5rem" : "2.5rem"}
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
            {data?.pages.map((page, pIndex) =>
              page.list.map((notice, lIndex) => {
                const zabo = noticeToZabo(notice, "width", 300);

                const zaboComponent = isMobile ? (
                  <SearchResult
                    key={zabo.id}
                    {...zabo}
                    thumbnailUrl={zabo.thumbnailUrl ?? ""}
                    logName={"howAboutThese"}
                    searchQuery={""}
                    tags={[]}
                  />
                ) : (
                  <Zabo
                    key={zabo.id}
                    {...zabo}
                    origin="width"
                    size={300}
                    logName={"howAboutThese"}
                  />
                );
                return pIndex + 1 === data.pages.length &&
                  lIndex + 1 === page.list.length ? (
                  <div ref={observerRef} key={zabo.id}>
                    {zaboComponent}
                  </div>
                ) : (
                  zaboComponent
                );
              }),
            )}
          </Masonry>
        </ResponsiveMasonry>
      </MasonryResizer>
    </>
  );
};

export default HowAboutThese;
