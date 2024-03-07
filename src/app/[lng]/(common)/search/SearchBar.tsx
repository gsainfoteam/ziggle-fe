'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';

import Button from '../../../components/atoms/Button';

interface SearchBarProps {
  lng: Locale;
}

// 검색 아이콘과 X 아이콘을 컴포넌트 내부에서 변경하도록 구현했습니다
// Submit 될 시 검색 아이콘이 X 아이콘으로 바뀌며 그 이후에 다시 keyword가 수정될 경우 X 아이콘이 검색 아이콘으로 바뀝니다
export const SearchBar = ({ lng }: SearchBarProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation(lng);
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
      className="flex w-[600px] justify-between overflow-clip rounded-[30px] border-[1px] border-greyBorder align-middle"
    >
      <input
        className="flex-1 bg-transparent px-[20px] py-[10px] text-lg text-text placeholder-greyDark outline-none"
        name="searchQuery"
        placeholder={t('searchPage.searchBar.placeholder')}
        value={keyword}
        onChange={handleKeywordChange}
      />
      {isSubmitted ? (
        <button
          type="button"
          className="flex items-center justify-center border-l-[1px] border-l-greyBorder bg-greyLight pl-[20px] pr-[25px]"
          onClick={handleDeleteClick}
        >
          <CloseIcon className="h-[1rem] w-[1.75rem] fill-greyDark" />
        </button>
      ) : (
        <button
          type="submit"
          className="flex items-center justify-center border-l-[1px] border-l-greyBorder bg-greyLight pl-[20px] pr-[25px]"
        >
          <SearchIcon className="h-[1.75rem] w-[1.75rem] stroke-greyDark" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
