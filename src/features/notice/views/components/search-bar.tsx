import React, { useEffect, useRef, useState } from 'react';

import { useRouter, useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import CloseIcon from '@/assets/icons/close.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';

const SearchButton = ({
  onClick,
  isToggle = false,
}: {
  onClick?: () => void;
  isToggle?: boolean;
}) => (
  <button
    type={isToggle ? 'button' : 'submit'}
    className={cn(
      isToggle
        ? 'dark:bg-dark_dark bg-white'
        : 'bg-greyLight dark:bg-dark_greyDark',
      'flex h-full items-center justify-center p-0 px-2 md:pr-6 md:pl-5',
      'border-l-greyBorder dark:border-l-dark_greyBorder border-l-0 md:border-l',
      'md:bg-greyLight md:dark:bg-dark_greyDark',
    )}
    onClick={onClick}
  >
    <SearchIcon
      className={cn(
        'h-6 w-6',
        isToggle ? 'stroke-text' : 'stroke-greyDark',
        'dark:stroke-dark_white md:stroke-greyDark md:dark:stroke-dark_white',
      )}
    />
  </button>
);

export const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation('notice');
  const params = useSearch({ from: '/_layout/search', shouldThrow: false });
  const [keyword, setKeyword] = useState(params?.query ?? '');
  const router = useRouter();

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('searchQuery') as string;

    // TODO: send log
    // sendLog(LogEvents.searchSubmit, {
    //   query,
    // });
    router.navigate({
      to: '/search',
      replace: true,
      search: { query },
    });
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isExpanded) inputRef.current?.focus();
  }, [isExpanded]);

  return (
    <div
      className={cn(
        isExpanded ? 'absolute h-fit w-full' : 'static h-full w-12',
        'md:mx-4 md:h-fit md:w-full',
        'flex items-stretch justify-end md:static md:justify-center',
        'right-0 transition-[width]',
      )}
    >
      <form
        onSubmit={handleSearch}
        className={cn(
          isExpanded ? 'w-full' : 'w-fit',
          'transition-[width] md:w-full md:max-w-[700px]',
          'flex flex-row-reverse justify-between md:flex-row',
          'overflow-clip',
          'border-greyBorder rounded-lg',
          'dark:border-dark_greyBorder md:bg-greyLight md:rounded-full md:border',
          'bg-transparent',
        )}
      >
        <div
          className={cn(
            isExpanded ? 'w-full' : 'w-0',
            'flex justify-between md:w-full',
          )}
        >
          <input
            className={cn(
              'flex-1 px-0 py-2 md:px-5',
              'text-base leading-4',
              'text-text placeholder-greyDark',
              'dark:bg-dark_greyDark dark:text-dark_white md:dark:bg-dark_dark md:bg-white',
              'outline-none',
            )}
            name="searchQuery"
            placeholder={t('searchPage.searchBar.placeholder')}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            ref={inputRef}
          />
          {keyword.length > 0 && (
            <LogClick eventName={LogEvents.searchClickClear}>
              <button
                type="button"
                className="bg-greyLight dark:bg-dark_greyDark md:dark:bg-dark_dark flex h-full items-center justify-center px-2 md:bg-white"
                onClick={() => setKeyword('')}
              >
                <CloseIcon className="dark:stroke-dark_white stroke-greyDark h-4 w-4" />
              </button>
            </LogClick>
          )}
        </div>
        <>
          <div className="flex h-full md:hidden">
            {isExpanded ? (
              <LogClick eventName={LogEvents.searchSubmit}>
                <SearchButton />
              </LogClick>
            ) : (
              <LogClick eventName={LogEvents.searchClickExpand}>
                <SearchButton isToggle onClick={() => setIsExpanded(true)} />
              </LogClick>
            )}
          </div>
          <div className="hidden h-full md:flex">
            <LogClick eventName={LogEvents.searchSubmit}>
              <SearchButton />
            </LogClick>
          </div>
        </>
      </form>
      {isExpanded && (
        <LogClick eventName={LogEvents.searchClickCancel}>
          <button
            type="button"
            className={cn(
              'flex h-full w-fit items-center justify-center',
              'overflow-hidden px-2 whitespace-nowrap',
              'text-primary dark:bg-dark_dark bg-white',
              'md:hidden',
            )}
            onClick={() => setIsExpanded(false)}
          >
            {t('searchPage.searchBar.collapse')}
          </button>
        </LogClick>
      )}
    </div>
  );
};
