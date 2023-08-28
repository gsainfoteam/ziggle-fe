import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import useAuth from "src/hooks/useAuth";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import NoticesWithPagination from "src/templates/noticesWithPagination/NoticesWithPagination";
import Paths from "src/types/paths";

const NOTICE_PER_PAGE = 30;

const RemindedNoticesPage = () => {
  useAuth({
    redirectUrl: Paths.home,
  });
  const isMobile = useIsMobile();
  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useQuery(
    [
      queryKeys.getAllNotices,
      {
        offset: page * NOTICE_PER_PAGE,
        limit: NOTICE_PER_PAGE,
        my: "reminders",
      },
    ],
    getAllNotices,
  );

  return (
    <Area>
      <Spacer height={isMobile ? "30px" : "50px"} />
      <Content>
        <Text as={"h1"} size={isMobile ? "1.5rem" : "2.5rem"} font={Font.Bold}>
          🔔 리마인더 설정한 공지
        </Text>

        <Spacer height={"8px"} />

        <Text
          size={isMobile ? "0.75rem" : "1rem"}
          font={Font.Medium}
          color={colorSet.secondaryText}
        >
          알림을 설정한 공지들을 모아서 보여드려요
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

export default RemindedNoticesPage;
