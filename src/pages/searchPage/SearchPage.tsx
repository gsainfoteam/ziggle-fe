import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";
import { getAllNotices } from "src/apis/notice/notice-api";
import queryKeys from "src/apis/queryKeys";
import { Close } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import SearchTagSelect from "src/molecules/searchTagSelect/searchTagSelect";
import Font from "src/styles/font";
import SearchResult from "src/templates/searchResult/SearchResult";
import SearchResultText from "src/templates/searchResultText/SearchResultText";
import { NoticeType } from "src/types/types";
import { isEmpty } from "src/utils/utils";

import { ReactComponent as SearchNoResult } from "../../../src/atoms/icon/assets/searchNoResult.svg";
import SearchBar from "../../molecules/searchBar/SearchBar";
import colorSet from "../../styles/colorSet";
import CloseBtnAnimation from "./CloseBtnAnimation";
import SearchBarAnimation from "./SearchBarAnimation";
import SearchGif from "./SearchGif";

const SearchPage = () => {
  const [selectedTags, setSelectedTags] = useState<NoticeType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { data } = useQuery(
    [
      queryKeys.getAllNotices,
      {
        search: searchKeyword,
        tags: selectedTags,
      },
    ],
    getAllNotices,
    {
      enabled: searchKeyword !== "",
    },
  );

  useEffect(() => {
    sendLog(LogEvents.Search, {
      query: searchKeyword,
      types: selectedTags,
    });
  }, [searchKeyword, selectedTags]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO : submit 동작

    console.log(e.currentTarget.searchQuery);
    const searchQuery = e.currentTarget.searchQuery as HTMLInputElement;
    setSearchKeyword(searchQuery.value); // SearchBar 수정할 때 주의
    sendLog(LogEvents.SearchPageSubmit, {
      query: searchQuery.value,
    });
  };

  const handleTagChange = (selected: NoticeType[]) => {
    setSelectedTags(selected);
    sendLog(LogEvents.SearchPageTypeChange, {
      types: selected,
    });
  };

  const navigator = useNavigate();
  const goBack = () => {
    sendLog(LogEvents.SearchPageClickCancel);
    navigator(-1);
  };

  return (
    <>
      <Area>
        <Content>
          <Spacer height={"50px"} />
          <div
            style={{
              height: "100px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CloseBtnAnimation.AnimationWrapper>
              <Button onClick={goBack}>
                <Close size="25px" color={colorSet.secondaryText} />
              </Button>
            </CloseBtnAnimation.AnimationWrapper>
          </div>
          <Flex>
            <div
              style={{
                width: "100%",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              <SearchBarAnimation.AnimationWrapper>
                <SearchBar
                  onSubmit={handleSubmit}
                  placeholder={"공지 제목이나 태그로 검색"}
                />
                <Spacer height={"12px"} />
                <SearchTagSelect
                  selected={selectedTags}
                  onChange={handleTagChange}
                />
              </SearchBarAnimation.AnimationWrapper>
            </div>
          </Flex>

          {!data && (
            <Flex justifyContent={"center"} width={"100%"}>
              <Flex justifyContent="center" flexDirection={"column"}>
                <Spacer height={"100px"} />
                <SearchGif width={"230px"} />
                <Spacer height={"10px"} />
                <Text
                  size="1.5rem"
                  color={colorSet.secondaryText}
                  font={Font.Medium}
                  style={{ paddingTop: "20px", marginTop: "-30px" }}
                >
                  검색어를 입력해주세요
                </Text>
              </Flex>
            </Flex>
          )}

          {data && !isEmpty(data.list) && (
            <div>
              <Spacer height={"30px"} />

              <Text
                size="2.5rem"
                color={colorSet.text}
                font={Font.Bold}
                style={{ padding: 0 }}
              >
                ♨ 지글 공지
              </Text>

              <Spacer height={"30px"} />

              {data.list.map((notice) =>
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
                    searchQuery={searchKeyword}
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
                    searchQuery={searchKeyword}
                    thumbnailUrl=""
                    key={notice.id}
                  />
                ),
              )}
              {/* 
                    <p
                      style={{
                        paddingTop: "10px",
                        paddingBottom: "0px",
                        paddingLeft: defaults.pageSideGap,
                        paddingRight: defaults.pageSideGap,
                        height: "100px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text
                        size="3.5rem"
                        color={colorSet.text}
                        font={Font.Bold}
                        style={{ padding: "0px" }}
                      >
                        📰 학사 공지
                      </Text>
                    </div>
                    {Array.from({ length: n }).map((_, index) => (
                      <div style={{ margin: "20px" }} key={index}>
                        <SearchResultText
                          deadline={dummySearchResult.deadline}
                          title={dummySearchResult.title}
                          author={dummySearchResult.author}
                          tags={dummySearchResult.tags}
                          date={dummySearchResult.date}
                          viewCount={dummySearchResult.viewCount}
                          content={dummySearchResult.content}
                          searchQuery="이"
                          thumbnailUrl=""
                        />
                      </div>
                    ))} */}
            </div>
          )}

          {data && isEmpty(data.list) && (
            <Flex justifyContent={"center"} width={"100%"}>
              <Flex justifyContent={"center"} flexDirection={"column"}>
                <Spacer height={"80px"} />
                <div style={{ height: "10px", margin: "0 auto" }}></div>
                <SearchNoResult></SearchNoResult>
                <Text
                  size="1.5rem"
                  color={colorSet.secondaryText}
                  font={Font.Bold}
                  style={{ paddingTop: "20px" }}
                >
                  검색 결과가 존재하지 않습니다.
                </Text>
              </Flex>
            </Flex>
          )}
          <div style={{ height: "300px", margin: "0 auto" }} />
        </Content>
      </Area>
    </>
  );
};

export default SearchPage;
