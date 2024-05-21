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
      className={
        `${
          isExpanded
            ? 'bg-greyLight dark:bg-dark_greyDark'
            : 'bg-white dark:bg-dark_dark'
        } flex h-full items-center justify-center p-0 px-2 md:pl-5 md:pr-6 ` +
        `border-l-0 border-l-greyBorder md:border-l-[1px] dark:border-l-dark_greyBorder ` +
        `md:bg-greyLight md:dark:bg-dark_greyDark`
      }
      onClick={handleSearchIconClick}
    >
      <SearchIcon
        className={`h-6 w-6 ${
          isExpanded ? 'stroke-greyDark' : 'stroke-text'
        } md:stroke-greyDark dark:stroke-dark_white md:dark:stroke-dark_white`}
      />
    </button>
  );

  return (
    <div
      className={`flex ${
        isExpanded ? 'absolute h-fit w-full' : 'static h-full w-12'
      } right-0 justify-end transition-[width] md:static md:h-fit md:w-full md:justify-center`}
    >
      <div
        className={`flex flex-grow justify-center bg-transparent md:w-fit md:justify-center md:px-5`}
      >
        <form
          action={search}
          ref={searchFormRef}
          className={`flex ${
            isExpanded ? 'w-full' : 'w-fit'
          } flex-row-reverse justify-between overflow-clip rounded-lg border-greyBorder bg-transparent align-middle transition-[width] md:w-full md:max-w-[700px] md:flex-row md:rounded-full md:border-[1px] md:bg-greyLight dark:border-dark_greyBorder`}
        >
          <div className="flex w-full justify-between">
            <input
              className={`${
                isExpanded ? 'w-full' : 'w-0'
              } flex-1 bg-greyLight px-0 py-2 text-base leading-4 text-text placeholder-greyDark outline-none md:bg-white md:px-5 dark:bg-dark_greyDark dark:text-dark_white md:dark:bg-dark_dark`}
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
                  className="flex h-full items-center justify-center bg-greyLight px-2 md:bg-white dark:bg-dark_greyDark md:dark:bg-dark_dark"
                  onClick={handleDeleteClick}
                >
                  <CloseIcon className="h-4 w-4 stroke-greyDark dark:stroke-dark_white" />
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
              className="flex h-full w-fit items-center justify-center overflow-hidden whitespace-nowrap bg-white px-2 text-primary md:hidden dark:bg-dark_dark"
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
