import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotice, getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import { Trash } from "src/assets/Icons";
import Button, { ButtonVariant } from "src/atoms/button/Button";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import useAuth from "src/hooks/useAuth";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import LoadingCatAnimation from "src/templates/loadingCatAnimation/LoadingCatAnimation";
import SearchResult from "src/templates/searchResult/SearchResult";
import SearchResultText from "src/templates/searchResultText/SearchResultText";
import Paths from "src/types/paths";
import Swal from "sweetalert2";

interface MenuSumProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const MenuSum = ({ children, onDelete }: MenuSumProps) => {
  useAuth({
    redirectUrl: Paths.home,
  });

  return (
    <Flex flexDirection="column">
      {children}

      <Spacer height={"10px"} />

      <Flex>
        <Button
          onClick={onDelete}
          variant={ButtonVariant.contained}
          style={{
            paddingLeft: "16px",
          }}
        >
          <Flex gap="4px">
            <Trash size="18px" />
            <Text size="0.875rem" font={Font.Medium} color={colorSet.colorless}>
              삭제하기
            </Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

const WrittenNoticesPage = () => {
  const queryClient = useQueryClient();

  const handleNotice = useMutation(deleteNotice, {
    onSuccess: () => {
      Swal.fire({
        text: "정상적으로 삭제되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.getAllNotices] });
    },
  });

  const removeNotice = (id: number) => {
    Swal.fire({
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        handleNotice.mutate({ id });
      }
    });
  };

  const { data, isLoading } = useQuery(
    [
      queryKeys.getAllNotices,
      {
        limit: 10000,
        my: "own",
      },
    ],
    getAllNotices,
  );

  return (
    <Area>
      <Spacer height={"50px"} />
      <Content>
        <Text as={"h1"} size={"2.5rem"} font={Font.Bold}>
          ✍️ 내가 게시한 공지
        </Text>

        <Spacer height={"8px"} />

        <Text size={"1rem"} font={Font.Medium} color={colorSet.secondaryText}>
          내가 작성한 공지들을 모아서 보여드려요
        </Text>
      </Content>

      <Spacer height={"50px"} />

      <Content>
        <Flex
          gap="20px"
          flexDirection="column"
          style={{
            flexWrap: "nowrap",
          }}
        >
          {isLoading && <LoadingCatAnimation />}

          {data?.list.map((notice) => (
            <MenuSum
              key={notice.id}
              onDelete={() => {
                removeNotice(notice.id);
              }}
            >
              {notice.imageUrl ? (
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
              )}
            </MenuSum>
          ))}
        </Flex>
      </Content>
    </Area>
  );
};

export default WrittenNoticesPage;
