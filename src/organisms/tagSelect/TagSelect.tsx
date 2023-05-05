import { useEffect, useState } from "react";
import styled from "styled-components";

import Input from "../../atoms/inputs/input/Input";
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
  overflow: scroll;
  > * {
    flex: 0 0 auto;
  }
`;

interface TagSelectProps {
  tags: string[];
  onDelete?: (tag: string) => void;
  onAdd?: (tag: string) => void;
}

const TagSelect = ({ tags, onDelete, onAdd }: TagSelectProps) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!input.includes(" ")) return;
    onAdd?.(input.split(" ")[0]);
    setInput("");
  }, [input, onAdd]);

  return (
    <TagSelectWrapper>
      {tags.map((tag) => (
        <Tag key={tag} label={tag} onDeleteClick={() => onDelete?.(tag)} />
      ))}
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
    </TagSelectWrapper>
  );
};

export default TagSelect;
