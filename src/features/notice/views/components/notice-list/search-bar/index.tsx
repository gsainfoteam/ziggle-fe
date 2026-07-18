import React, { useEffect, useRef, useState } from 'react';

import { useRouter, useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
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
      isToggle ? 'bg-background' : 'bg-muted',
      'flex h-full items-center justify-center p-0 px-2 md:pr-6 md:pl-5',
      'border-l-border border-l-0 md:border-l',
      'md:bg-muted',
    )}
    onClick={onClick}
  >
    <MagnifyingGlassIcon
      className={cn(
        'size-6',
        isToggle ? 'text-foreground' : 'text-muted-foreground',
        'md:text-muted-foreground',
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
    // query,
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
        'md:h-fit md:w-full',
        'flex items-stretch justify-end md:static md:justify-center',
        'right-0 transition-[width]',
      )}
    >
      <form
        onSubmit={handleSearch}
        className={cn(
          isExpanded ? 'w-full' : 'w-fit',
          'transition-[width] md:w-full md:max-w-200',
          'flex flex-row-reverse justify-between md:flex-row',
          'overflow-clip',
          'border-border rounded-lg',
          'md:bg-muted md:rounded-full md:border',
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
              'text-foreground placeholder-muted-foreground',
              'md:bg-background',
              'outline-none',
            )}
            name="searchQuery"
            placeholder={t('search.bar.placeholder')}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            ref={inputRef}
          />
          {keyword.length > 0 && (
            <LogClick eventName={LogEvents.searchClickClear}>
              <button
                type="button"
                className="bg-muted md:bg-background flex h-full items-center justify-center px-2"
                onClick={() => setKeyword('')}
              >
                <XIcon className="text-muted-foreground size-4" />
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
              'text-primary bg-background',
              'md:hidden',
            )}
            onClick={() => setIsExpanded(false)}
          >
            {t('search.bar.collapse')}
          </button>
        </LogClick>
      )}
    </div>
  );
};
