import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import queryKeys from "src/apis/queryKeys";
import { createTag, searchTags } from "src/apis/tag/tag-api";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Icon from "src/atoms/icon/Icon";
import Input from "src/atoms/inputs/input/Input";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import TagChip from "src/molecules/tag/TagChip";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import { Tag } from "src/types/types";
import styled from "styled-components";

const TagOption = styled(Button)`
  padding: 10px;
  &:hover {
    background-color: ${colorSet.secondary};
  }
`;

interface TagSelectorProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const TagSelector = ({ tags, setTags }: TagSelectorProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const { data } = useQuery([queryKeys.searchTags, keyword], searchTags, {
    enabled: keyword !== "",
  });
  const isMobile = useIsMobile();

  const handleTag = useMutation(createTag, {});

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.includes(" ")) {
      const newTag = event.target.value.trim();
      if (tags.find((tag) => tag.name === newTag)) {
        setKeyword("");
        return;
      }

      const existingTag = data?.find((tag) => tag.name === newTag);
      if (existingTag) {
        setTags([...tags, existingTag]);
        setKeyword("");
        return;
      }

      handleTag.mutate(
        {
          name: newTag,
        },
        {
          onSuccess: (data) => {
            setTags([...tags, data]);
            setKeyword("");
          },
        },
      );
      return;
    }

    setKeyword(event.target.value);
  };

  const handleTagOptionClick = (tag: Tag) => {
    setTags([...tags, tag]);
    setKeyword("");
  };

  return (
    <Flex flexDirection={"column"} gap={"15px"}>
      <Flex gap={isMobile ? "8px" : "12px"}>
        <Icon.TagBlack width={isMobile ? "18px" : "24px"} />
        <Text font={Font.Medium} size={isMobile ? "1rem" : "1.25rem"}>
          태그 설정
        </Text>
      </Flex>

      <Flex flexDirection={"column"}>
        <Flex
          gap={"5px"}
          alignItems={"center"}
          style={{
            border: `1.5px solid ${colorSet.primary}`,
            borderRadius: "8px",
            padding: isMobile ? "8px" : "12px",
          }}
        >
          {tags.map((tag) => (
            <TagChip
              key={tag.name}
              label={tag.name}
              onDeleteClick={() => {
                setTags(tags.filter((t) => t.id !== tag.id));
              }}
            />
          ))}
          <Input
            value={keyword}
            placeholder={
              tags.length === 0 ? "태그를 입력하세요 (띄어쓰기로 구분)" : ""
            }
            onChange={handleKeywordChange}
            style={{
              flexGrow: 1,
              fontSize: isMobile ? "0.75rem" : "1rem",
            }}
          />
        </Flex>
        <Flex
          style={{
            position: "relative",
          }}
        >
          <Flex
            width={"calc(100% - 20px)"}
            flexDirection={"column"}
            style={{
              position: "absolute",
              top: "-4px",
              left: "10px",
              zIndex: 10,
              backgroundColor: "white",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {data?.slice(0, 5).map((tag) => (
              <TagOption key={tag.id} onClick={() => handleTagOptionClick(tag)}>
                <Text font={Font.Regular} size={"0.875rem"} textAlign={"left"}>
                  {tag.name}
                </Text>
              </TagOption>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TagSelector;
