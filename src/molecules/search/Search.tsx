import React, { useState } from "react";
import styled from "styled-components";

import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import Input from "../../atoms/inputs/input/Input";
import colorSet from "../../styles/colorSet";

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  border: 2px solid ${colorSet.primary};
  border-radius: 5px;
  padding: 10px 20px;
`;

interface SearchProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

// 검색 아이콘과 X 아이콘을 컴포넌트 내부에서 변경하도록 구현했습니다
// Submit 될 시 검색 아이콘이 X 아이콘으로 바뀌며 그 이후에 다시 keyword가 수정될 경우 X 아이콘이 검색 아이콘으로 바뀝니다

const Search = ({ onSubmit, placeholder }: SearchProps) => {
  const [keyword, setKeyword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit(e);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setIsSubmitted(false);
  };

  const handleDeleteClick = () => {
    setKeyword("");
    setIsSubmitted(false);
  };

  return (
    <SearchWrapper onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        value={keyword}
        onChange={handleKeywordChange}
        fontSize={"1.5rem"}
        color={colorSet.primary}
        style={{
          flexGrow: 1,
        }}
      />
      {isSubmitted ? (
        <Button type={"button"} onClick={handleDeleteClick}>
          <Icon.XPrimary />
        </Button>
      ) : (
        <Button type={"submit"}>
          <Icon.SearchPrimary width={"32px"} height={"32px"} />
        </Button>
      )}
    </SearchWrapper>
  );
};

export default Search;
