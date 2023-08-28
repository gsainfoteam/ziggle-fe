import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Pagination from "src/molecules/pagination/Pagination";
import { Notice } from "src/types/types";

import LoadingCatAnimation from "../loadingCatAnimation/LoadingCatAnimation";
import SearchResult from "../searchResult/SearchResult";
import SearchResultText from "../searchResultText/SearchResultText";

interface NoticesWithPaginationProps {
  isLoading: boolean;
  notices: Notice[] | undefined;
  noticePerPage: number;

  page: number;
  setPage: (page: number) => void;
}

const NoticesWithPagination = ({
  isLoading,
  notices,
  noticePerPage,
  page,
  setPage,
}: NoticesWithPaginationProps) => {
  return (
    <>
      <Flex justifyContent={"center"}>
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={notices?.length ?? 0}
          itemsPerPage={noticePerPage}
        />
      </Flex>

      <Spacer height={"30px"} />

      <Flex
        gap="10px"
        flexDirection="column"
        style={{
          flexWrap: "nowrap",
        }}
      >
        <Flex
          gap="10px"
          flexDirection="column"
          style={{
            flexWrap: "nowrap",
          }}
        >
          {isLoading && <LoadingCatAnimation />}

          {notices?.map((notice) =>
            notice.imageUrl ? (
              <SearchResult
                id={notice.id}
                deadline={notice.deadline ?? undefined}
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
                deadline={notice.deadline ?? undefined}
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
        </Flex>
      </Flex>

      <Spacer height={"100px"} />

      <Flex justifyContent={"center"}>
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={notices?.length ?? 0}
          itemsPerPage={noticePerPage}
        />
      </Flex>
    </>
  );
};

export default NoticesWithPagination;
