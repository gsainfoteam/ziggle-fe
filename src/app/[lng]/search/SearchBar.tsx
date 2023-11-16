'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { useTranslation } from '@/app/i18next/client';
import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';

import Button from '../../components/atoms/Button';

// 검색 아이콘과 X 아이콘을 컴포넌트 내부에서 변경하도록 구현했습니다
// Submit 될 시 검색 아이콘이 X 아이콘으로 바뀌며 그 이후에 다시 keyword가 수정될 경우 X 아이콘이 검색 아이콘으로 바뀝니다
export const SearchBar = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('query') ?? '');
  const { replace } = useRouter();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setIsSubmitted(false);
  };

  const handleDeleteClick = () => {
    setKeyword('');
    setIsSubmitted(false);
  };

  const search = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const query = formData.get('searchQuery') as string;
    if (query) {
      params.set('query', query);
      setIsSubmitted(true);
    } else {
      params.delete('query');
      setIsSubmitted(false);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      action={search}
      className="flex align-middle border-primary border-2 rounded-[5px] px-[4px] py-[8px] md:px-[10px] md:py-[8px]"
    >
      <input
        className="w-full md:w-96 p-0.375 md:p-0.5 text-primary text-lg outline-none bg-transparent md:text-xl"
        name="searchQuery"
        placeholder={t('searchPage.searchBar.placeholder')}
        value={keyword}
        onChange={handleKeywordChange}
      />
      {isSubmitted ? (
        <Button type="button" onClick={handleDeleteClick}>
          <CloseIcon className="fill-primary w-5 h-5 mx-[6px]" />
        </Button>
      ) : (
        <Button type="submit">
          <SearchIcon className="fill-primary w-8 h-8" />
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
