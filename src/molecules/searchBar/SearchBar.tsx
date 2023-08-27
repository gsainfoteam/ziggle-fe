import React, { useState } from "react";
import useIsMobile from "src/hooks/useIsMobile";
import { MOBILE_BREAKPOINT } from "src/types/types";
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 4px 8px;
  }
`;

interface SearchProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

// 검색 아이콘과 X 아이콘을 컴포넌트 내부에서 변경하도록 구현했습니다
// Submit 될 시 검색 아이콘이 X 아이콘으로 바뀌며 그 이후에 다시 keyword가 수정될 경우 X 아이콘이 검색 아이콘으로 바뀝니다

const SearchBar = ({ onSubmit, placeholder }: SearchProps) => {
  const [keyword, setKeyword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();

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
        name={"searchQuery"}
        placeholder={placeholder}
        value={keyword}
        onChange={handleKeywordChange}
        fontSize={isMobile ? "1.125rem" : "1.5rem"}
        color={colorSet.primary}
        padding={isMobile ? "0.375rem" : "0.5rem"}
        style={{
          flexGrow: 1,
          lineHeight: "1.5rem",
        }}
      />
      {isSubmitted ? (
        <Button
          type={"button"}
          onClick={handleDeleteClick}
          style={{
            marginRight: "2px",
          }}
        >
          <Icon.XPrimary width={isMobile ? "20px" : "27px"} />
        </Button>
      ) : (
        <Button type={"submit"}>
          <Icon.SearchPrimary
            width={isMobile ? "28px" : "32px"}
            height={isMobile ? "28px" : "32px"}
          />
        </Button>
      )}
    </SearchWrapper>
  );
};

export default SearchBar;
