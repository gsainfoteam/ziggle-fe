import Flex from "src/atoms/containers/flex/Flex";
import Icon from "src/atoms/icon/Icon";
import Input from "src/atoms/inputs/input/Input";
import Text from "src/atoms/text/Text";
import Tag from "src/molecules/tag/Tag";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

interface TagSelectorProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagSelector = ({ tags, setTags }: TagSelectorProps) => {
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
          <Tag
            key={tag}
            label={tag}
            onDeleteClick={() => {
              setTags(tags.filter((t) => t !== tag));
            }}
          />
        ))}
        <Input
          placeholder={
            tags.length === 0 ? "태그를 입력하세요 (띄어쓰기로 구분)" : ""
          }
          onChange={(event) => {
            const tag = event.target.value;
            if (tag.includes(" ")) {
              setTags([...tags, ...tag.split(" ").filter((t) => t !== "")]);
              event.target.value = "";
            }
          }}
          style={{
            flexGrow: 1,
          }}
        />
      </Flex>
    </Flex>
  );
};

export default TagSelector;
