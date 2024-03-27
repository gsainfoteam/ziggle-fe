'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';

import LogEvents from '@/api/log/log-events';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';

import Analytics from '../../atoms/Analytics';

interface SearchBarProps {
  lng: Locale;
}

export const SearchBar = ({ lng }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation(lng);
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
    replace(`/search?${params.toString()}`);
  };

  const toggleExpand = () => {
    setIsExpanded((isExpanded) => !isExpanded);
    setKeyword('');
  };

  const searchFormRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchIconClick = () => {
    if (isExpanded && searchFormRef.current) {
      searchFormRef.current.requestSubmit();
    } else {
      setIsExpanded(true);
      inputRef.current?.focus();
    }
  };

  const SearchButton = () => (
    <button
      type="submit"
      className={`${
        isExpanded ? 'bg-greyLight' : 'bg-white'
      } flex h-full items-center justify-center border-l-0 border-l-greyBorder p-0 px-[10px] md:border-l-[1px] md:bg-greyLight md:pl-[20px] md:pr-[25px]`}
      onClick={handleSearchIconClick}
    >
      <SearchIcon
        className={`h-[1.5rem] w-[1.5rem] ${
          isExpanded ? 'stroke-greyDark' : 'stroke-black'
        } md:stroke-greyDark`}
      />
    </button>
  );

  return (
    <div
      className={`flex ${
        isExpanded ? 'absolute h-fit w-full' : 'static h-full w-[50px] '
      } right-0 justify-end transition-[width] md:static md:h-fit md:w-full md:justify-center`}
    >
      <div
        className={`flex flex-grow justify-center bg-transparent md:w-fit md:justify-center md:px-[20px]`}
      >
        <form
          action={search}
          ref={searchFormRef}
          className={`flex ${
            isExpanded ? 'w-full' : 'w-fit'
          } flex-row-reverse justify-between overflow-clip rounded-[10px] border-greyBorder bg-transparent align-middle transition-[width] md:w-full md:max-w-[700px] md:flex-row md:rounded-[30px] md:border-[1px] md:bg-greyLight`}
        >
          <div className="flex w-full justify-between">
            <input
              className={`${
                isExpanded ? 'w-[100px]' : 'w-0'
              } flex-1 bg-greyLight px-0 py-[10px] text-[1rem] leading-4 text-text placeholder-greyDark outline-none transition-[width] md:bg-white md:px-[20px]`}
              name="searchQuery"
              placeholder={t('searchPage.searchBar.placeholder')}
              value={keyword}
              onChange={handleKeywordChange}
              ref={inputRef}
            />
            {keyword.length > 0 && (
              <Analytics event={LogEvents.searchPageClickCancel}>
                <button
                  type="button"
                  className="flex h-full items-center justify-center bg-greyLight px-[10px] md:bg-white"
                  onClick={handleDeleteClick}
                >
                  <CloseIcon className="h-[1.1rem] w-[1.1rem]" />
                </button>
              </Analytics>
            )}
          </div>
          <>
            <div className="flex h-full md:hidden">
              {isExpanded ? (
                <Analytics event={LogEvents.searchPageSubmit}>
                  <SearchButton />
                </Analytics>
              ) : (
                <SearchButton />
              )}
            </div>
            <div className="hidden h-full md:flex">
              <Analytics event={LogEvents.searchPageSubmit}>
                <SearchButton />
              </Analytics>
            </div>
          </>
        </form>
        {isExpanded && (
          <Analytics event={LogEvents.searchPageClickCancel}>
            <button
              type="button"
              className="flex h-full w-fit items-center justify-center overflow-hidden whitespace-nowrap bg-white px-[10px] text-primary md:hidden"
              onClick={toggleExpand}
            >
              {t('searchPage.searchBar.collapse')}
            </button>
          </Analytics>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
