'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import LogEvents from '@/api/log/log-events';
import { useTranslation } from '@/app/i18next/client';
import { Locale } from '@/app/i18next/settings';
import CloseIcon from '@/assets/icons/close.svg';
import SearchIcon from '@/assets/icons/search.svg';

import Analytics from '../../atoms/Analytics';

interface SearchBarProps {
  lng: Locale;
}

const SearchButton = ({
  onClick,
  isToggle = false,
}: {
  onClick?: () => void;
  isToggle?: boolean;
}) => (
  <button
    type={isToggle ? 'button' : 'submit'}
    className={[
      isToggle
        ? 'bg-white dark:bg-dark_dark'
        : 'bg-greyLight dark:bg-dark_greyDark',
      'flex h-full items-center justify-center p-0 px-2 md:pl-5 md:pr-6',
      'border-l-0 border-l-greyBorder md:border-l-[1px] dark:border-l-dark_greyBorder',
      'md:bg-greyLight md:dark:bg-dark_greyDark',
    ].join(' ')}
    onClick={onClick}
  >
    <SearchIcon
      className={[
        'h-6 w-6',
        isToggle ? 'stroke-text' : 'stroke-greyDark',
        'md:stroke-greyDark dark:stroke-dark_white md:dark:stroke-dark_white',
      ].join(' ')}
    />
  </button>
);

export const SearchBar = ({ lng }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation(lng);
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('query') ?? '');
  const { replace } = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);
    const query = formData.get('searchQuery') as string;
    if (query) params.set('query', query);
    else params.delete('query');
    replace(`/search?${params.toString()}`);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isExpanded) inputRef.current?.focus();
  }, [isExpanded]);

  return (
    <div
      className={[
        isExpanded ? 'absolute h-fit w-full' : 'static h-full w-12',
        'md:mx-4 md:h-fit md:w-full',
        'flex items-stretch justify-end md:static md:justify-center',
        'right-0 transition-[width]',
      ].join(' ')}
    >
      <form
        onSubmit={handleSearch}
        className={[
          isExpanded ? 'w-full' : 'w-fit',
          'transition-[width] md:w-full md:max-w-[700px]',
          'flex flex-row-reverse justify-between md:flex-row',
          'overflow-clip',
          'rounded-lg border-greyBorder',
          'md:rounded-full md:border-[1px] md:bg-greyLight dark:border-dark_greyBorder',
          'bg-transparent',
        ].join(' ')}
      >
        <div
          className={[
            isExpanded ? 'w-full' : 'w-0',
            'flex justify-between md:w-full',
          ].join(' ')}
        >
          <input
            className={[
              'flex-1 px-0 py-2 md:px-5',
              'text-base leading-4',
              'text-text placeholder-greyDark',
              'md:bg-white dark:bg-dark_greyDark dark:text-dark_white md:dark:bg-dark_dark',
              'outline-none',
            ].join(' ')}
            name="searchQuery"
            placeholder={t('searchPage.searchBar.placeholder')}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            ref={inputRef}
          />
          {keyword.length > 0 && (
            <Analytics event={LogEvents.searchPageClickCancel}>
              <button
                type="button"
                className="flex h-full items-center justify-center bg-greyLight px-2 md:bg-white dark:bg-dark_greyDark md:dark:bg-dark_dark"
                onClick={() => setKeyword('')}
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
              <SearchButton isToggle onClick={() => setIsExpanded(true)} />
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
            className={[
              'flex h-full w-fit items-center justify-center',
              'overflow-hidden whitespace-nowrap px-2',
              'bg-white text-primary dark:bg-dark_dark',
              'md:hidden',
            ].join(' ')}
            onClick={() => setIsExpanded(false)}
          >
            {t('searchPage.searchBar.collapse')}
          </button>
        </Analytics>
      )}
    </div>
  );
};

export default SearchBar;
