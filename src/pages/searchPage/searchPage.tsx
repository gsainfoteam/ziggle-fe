import { useState } from "react";
import { Search, XXPrimary } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import Text from "src/atoms/text/Text";
import dummySearchResult from "src/mock/dummy-searchresult";
import SearchTagSelect from "src/molecules/searchTagSelect/searchTagSelect";
import defaults from "src/styles/defaults";
import Font from "src/styles/font";
import SearchResult from "src/templates/searchResult/SearchResult";
import SearchResultText from "src/templates/searchResultText/SearchResultText";
import { NoticeType } from "src/types/types";

import { ReactComponent as SearchNoResult } from "../../../src/atoms/icon/assets/searchNoResult.svg";
import SearchVar from "../../molecules/search/Search";
import colorSet from "../../styles/colorSet";

const n = 3;
const SearchPage = () => {
  const handleSubmit = () => {};
  const handleTagChange = (selected: NoticeType[]) => {
    setSelectedTags(selected);
  };
  const [showResults, setShowResults] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [defaultResults, setDefaultResults] = useState(true);
  const [selectedTags, setSelectedTags] = useState<NoticeType[]>([]);
  const result = () => {
    setShowResults(true);
    setDefaultResults(false);
    setNoResults(false);
  };

  const noResult = () => {
    setNoResults(true);
    setDefaultResults(false);
    setShowResults(false);
  };

  return (
    <>
      <Area>
        <Content>
          <Button style={{ background: colorSet.placeholder }} onClick={result}>
            result
          </Button>
          <Button onClick={noResult} style={{ margin: "10px" }}>
            noResult
          </Button>

          <div
            style={{
              height: "150px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button>
              <XXPrimary size="25px" color={colorSet.secondaryText} />
            </Button>
          </div>
          <p
            style={{
              paddingLeft: defaults.pageSideGap,
              paddingRight: defaults.pageSideGap,
            }}
          >
            <p style={{ width: "700px", margin: "0 auto" }}>
              <SearchVar
                onSubmit={handleSubmit}
                placeholder={"공지 제목이나 태그로 검색"}
              />
              <p style={{ height: "30px", margin: "0 auto" }} />
              <p style={{ height: "40px", margin: "0 auto" }}>
                <SearchTagSelect
                  selected={selectedTags}
                  onChange={handleTagChange}
                />
              </p>
              <p
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "50px",
                }}
              >
                {defaultResults && (
                  <p>
                    <Search
                      size="250px"
                      color={colorSet.secondaryText}
                    ></Search>
                    <p style={{ height: "10px", margin: "0 auto" }}></p>
                    <Text
                      size="1.7rem"
                      color={colorSet.secondaryText}
                      font={Font.Medium}
                      style={{ paddingTop: "20px" }}
                    >
                      검색어를 입력해주세요
                    </Text>
                  </p>
                )}

                {showResults && (
                  <p>
                    <p
                      style={{
                        paddingTop: "0px",
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
                        style={{ padding: 0 }}
                      >
                        ♨ 지글 공지
                      </Text>
                    </p>
                    {Array.from({ length: n }).map((_, index) => (
                      <div style={{ margin: "20px" }} key={index}>
                        <SearchResult
                          deadline={dummySearchResult.deadline}
                          title={dummySearchResult.title}
                          author={dummySearchResult.author}
                          tags={dummySearchResult.tags}
                          date={dummySearchResult.date}
                          viewCount={dummySearchResult.viewCount}
                          thumbnailUrl={dummySearchResult.thumbnailUrl}
                          searchQuery="이"
                        />
                      </div>
                    ))}

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
                    </p>
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
                    ))}
                  </p>
                )}

                {noResults && (
                  <p>
                    <p style={{ height: "10px", margin: "0 auto" }}></p>
                    <SearchNoResult></SearchNoResult>
                    <Text
                      size="1.5rem"
                      color={colorSet.secondaryText}
                      font={Font.Bold}
                      style={{ paddingTop: "20px" }}
                    >
                      검색 결과가 존재하지 않습니다.
                    </Text>
                  </p>
                )}
              </p>
            </p>
          </p>
          <p style={{ height: "300px", margin: "0 auto" }} />
        </Content>
      </Area>
    </>
  );
};

export default SearchPage;
