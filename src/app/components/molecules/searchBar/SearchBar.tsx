import React, { useState } from 'react';

import Button from '../../atoms/Button';

interface SearchProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

// 검색 아이콘과 X 아이콘을 컴포넌트 내부에서 변경하도록 구현했습니다
// Submit 될 시 검색 아이콘이 X 아이콘으로 바뀌며 그 이후에 다시 keyword가 수정될 경우 X 아이콘이 검색 아이콘으로 바뀝니다

const SearchBar = ({ onSubmit, placeholder }: SearchProps) => {
  const [keyword, setKeyword] = useState('');
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
    setKeyword('');
    setIsSubmitted(false);
  };

  return (
    <form
      className={
        'flex align-middle border-primary border-2 rounded-[5px] px-[10px] py-[20px] md:px-[4px] md:py-[8px]'
      }
      onSubmit={handleSubmit}
    >
      <input
        className={
          'w-full md:w-96 p-0.375 md:p-0.5 text-primary text-lg md:text-2xl'
        }
        name={'searchQuery'}
        placeholder={placeholder}
        value={keyword}
        onChange={handleKeywordChange}
      />
      {isSubmitted ? (
        <Button
          type={'button'}
          onClick={handleDeleteClick}
          style={{
            marginRight: '2px',
          }}
        >
          {/* <Icon.XPrimary width={isMobile ? "20px" : "27px"} /> */}
        </Button>
      ) : (
        <Button type={'submit'}>
          {/* <Icon.SearchPrimary
            width={isMobile ? "28px" : "32px"}
            height={isMobile ? "28px" : "32px"}
          /> */}
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
