import styled from "styled-components";

import Tag from "../../molecules/tag/Tag";
import colorSet from "../../styles/colorSet";

const TagSelectWrapper = styled.div`
  border-radius: 10px;
  border: 1.5px solid ${colorSet.primary};
  height: 48px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 16px;
`;

interface TagSelectProps {
  tags: string[];
  onDelete?: (tag: string) => void;
}

const TagSelect = ({ tags, onDelete }: TagSelectProps) => {
  return (
    <TagSelectWrapper>
      {tags.map((tag) => (
        <Tag key={tag} label={tag} onDeleteClick={() => onDelete?.(tag)} />
      ))}
    </TagSelectWrapper>
  );
};

export default TagSelect;
