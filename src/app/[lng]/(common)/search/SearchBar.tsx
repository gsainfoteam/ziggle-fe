'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';

interface SearchBarProps {
  lng: Locale;
}

// 검색 아이콘과 X 아이콘을 컴포넌트 내부에서 변경하도록 구현했습니다
// Submit 될 시 검색 아이콘이 X 아이콘으로 바뀌며 그 이후에 다시 keyword가 수정될 경우 X 아이콘이 검색 아이콘으로 바뀝니다
export const SearchBar = ({ lng }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation(lng);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('query') ?? '');
  const { replace } = useRouter();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleDeleteClick = () => {
    setKeyword('');
  };

  const search = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const query = formData.get('searchQuery') as string;
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const toggleExpand = () => {
    setIsExpanded((isExpanded) => !isExpanded);
    setKeyword('');
  };

  const searchFormRef = useRef<HTMLFormElement | null>(null);

  const handleSearchIconClick = () => {
    if (isExpanded && searchFormRef.current) {
      searchFormRef.current.submit();
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div className="flex">
      <form
        action={search}
        ref={searchFormRef}
        className={`flex ${
          isExpanded ? 'w-full' : 'w-fit'
        } flex-row-reverse justify-between overflow-clip rounded-[10px] border-red-50 bg-greyLight align-middle md:w-[600px] md:flex-row md:rounded-[30px] md:border-[1px]`}
      >
        <div className="flex w-full justify-between">
          <input
            className={`${
              isExpanded ? 'w-[100px]' : 'w-0'
            } flex-1 bg-greyLight px-0 py-[10px] text-lg text-text placeholder-greyDark outline-none transition-[width] md:bg-white md:px-[20px]`}
            name="searchQuery"
            placeholder={t('searchPage.searchBar.placeholder')}
            value={keyword}
            onChange={handleKeywordChange}
          />
          {keyword.length > 0 && (
            <button
              type="button"
              className="flex items-center justify-center bg-white px-[10px]"
              onClick={handleDeleteClick}
            >
              <CloseIcon className="h-[1.1rem] w-[1.1rem]" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center border-l-0 border-l-greyBorder bg-greyLight p-0 px-[10px] md:border-l-[1px] md:pl-[20px] md:pr-[25px]"
          onClick={handleSearchIconClick}
        >
          <SearchIcon className="h-[1.5rem] w-[1.5rem] stroke-greyDark" />
        </button>
      </form>
      {isExpanded && (
        <button
          type="button"
          className="flex items-center justify-center whitespace-nowrap px-[10px] text-primary md:hidden"
          onClick={toggleExpand}
        >
          {t('searchPage.searchBar.collapse')}
        </button>
      )}
    </div>
  );
};

export default SearchBar;
