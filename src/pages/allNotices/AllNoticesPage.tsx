import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import Pagination from "src/molecules/pagination/Pagination";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import SearchResult from "src/templates/searchResult/SearchResult";
import SearchResultText from "src/templates/searchResultText/SearchResultText";

const NOTICE_PER_PAGE = 30;

const AllNoticesPage = () => {
  const [page, setPage] = useState<number>(0);

  const { data } = useQuery(
    [
      queryKeys.getAllNotices,
      {
        offset: page * NOTICE_PER_PAGE,
        limit: NOTICE_PER_PAGE,
        orderBy: "recent",
      },
    ],
    getAllNotices,
  );

  return (
    <Area>
      <Spacer height={"50px"} />
      <Content>
        <Text as={"h1"} size={"2.5rem"} font={Font.Bold}>
          전체 공지
        </Text>

        <Spacer height={"8px"} />

        <Text size={"1rem"} font={Font.Medium} color={colorSet.secondaryText}>
          모든 공지들이 시간 순으로 정렬되어 있습니다.
        </Text>
      </Content>

      <Spacer height={"50px"} />

      <Content>
        <Flex justifyContent={"center"}>
          <Pagination
            page={page}
            setPage={setPage}
            totalItems={data?.total ?? 0}
            itemsPerPage={NOTICE_PER_PAGE}
          />
        </Flex>

        <Spacer height={"30px"} />

        {data?.list.map((notice) =>
          notice.imageUrl ? (
            <SearchResult
              id={notice.id}
              deadline={notice.deadline}
              title={notice.title}
              author={notice.author}
              tags={notice.tags}
              date={notice.createdAt}
              viewCount={notice.views}
              thumbnailUrl={notice.imageUrl}
              searchQuery={""}
              key={notice.id}
            />
          ) : (
            <SearchResultText
              id={notice.id}
              deadline={notice.deadline}
              title={notice.title}
              author={notice.author}
              tags={notice.tags}
              date={notice.createdAt}
              viewCount={notice.views}
              content={notice.body}
              searchQuery={""}
              thumbnailUrl=""
              key={notice.id}
            />
          ),
        )}

        <Spacer height={"100px"} />

        <Flex justifyContent={"center"}>
          <Pagination
            page={page}
            setPage={setPage}
            totalItems={data?.total ?? 0}
            itemsPerPage={NOTICE_PER_PAGE}
          />
        </Flex>
      </Content>
    </Area>
  );
};

export default AllNoticesPage;
