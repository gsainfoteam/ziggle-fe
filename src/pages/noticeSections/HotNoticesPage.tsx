import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import NoticesWithPagination from "src/templates/noticesWithPagination/NoticesWithPagination";

const NOTICE_PER_PAGE = 30;

const HotNoticesPage = () => {
  const [page, setPage] = useState<number>(0);
  const isMobile = useIsMobile();

  const { data, isLoading } = useQuery(
    [
      queryKeys.getNotice,
      {
        offset: page * NOTICE_PER_PAGE,
        limit: NOTICE_PER_PAGE,
        orderBy: "hot",
      },
    ],
    getAllNotices,
  );

  return (
    <Area>
      <Spacer height={isMobile ? "30px" : "50px"} />
      <Content>
        <Text as={"h1"} size={isMobile ? "1.5rem" : "2.5rem"} font={Font.Bold}>
          🔥 오늘 끓는 공지
        </Text>

        <Spacer height={"8px"} />

        <Text
          size={isMobile ? "0.75rem" : "1rem"}
          font={Font.Medium}
          color={colorSet.secondaryText}
        >
          지난 일주일 동안 조회수가 150이 넘은 공지들이 여기서 지글지글 끓고
          있어요
        </Text>
      </Content>

      <Spacer height={isMobile ? "30px" : "50px"} />

      <Content>
        <NoticesWithPagination
          notices={data?.list}
          isLoading={isLoading}
          noticePerPage={NOTICE_PER_PAGE}
          page={page}
          setPage={setPage}
        />
      </Content>
    </Area>
  );
};

export default HotNoticesPage;
