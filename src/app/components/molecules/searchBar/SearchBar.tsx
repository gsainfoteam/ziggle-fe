import React, { useState } from 'react';

import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';

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
        'flex rounded-[5px] border-2 border-primary px-[4px] py-[8px] align-middle md:px-[10px] md:py-[8px]'
      }
      onSubmit={handleSubmit}
    >
      <input
        className={
          'p-0.375 w-full text-lg text-primary md:w-96 md:p-0.5 md:text-xl'
        }
        name={'searchQuery'}
        placeholder={placeholder}
        value={keyword}
        onChange={handleKeywordChange}
      />
      {isSubmitted ? (
        <Button type={'button'} onClick={handleDeleteClick}>
          <CloseIcon className={'mx-[6px] h-5 w-5 fill-primary'} />
        </Button>
      ) : (
        <Button type={'submit'}>
          <SearchIcon className={'h-8 w-8 fill-primary'} />
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
