import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import queryKeys from "src/apis/queryKeys";
import { createTag, searchTags } from "src/apis/tag/tag-api";
import Flex from "src/atoms/containers/flex/Flex";
import Icon from "src/atoms/icon/Icon";
import Input from "src/atoms/inputs/input/Input";
import Text from "src/atoms/text/Text";
import TagChip from "src/molecules/tag/TagChip";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import { Tag } from "src/types/types";

interface TagSelectorProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const TagSelector = ({ tags, setTags }: TagSelectorProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const { data } = useQuery([queryKeys.searchTags, keyword], searchTags);

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

  return (
    <Flex flexDirection={"column"} gap={"15px"}>
      <Flex gap={"12px"}>
        <Icon.TagBlack width={"24px"} />
        <Text font={Font.Medium} size={"1.25rem"}>
          태그 설정
        </Text>
      </Flex>

      <Flex
        gap={"5px"}
        style={{
          border: `1.5px solid ${colorSet.primary}`,
          borderRadius: "8px",
          padding: "12px",
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
          placeholder={
            tags.length === 0 ? "태그를 입력하세요 (띄어쓰기로 구분)" : ""
          }
          onChange={handleKeywordChange}
          style={{
            flexGrow: 1,
          }}
        />
      </Flex>
    </Flex>
  );
};

export default TagSelector;
