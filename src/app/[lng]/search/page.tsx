'use client';

import { useState } from 'react';

import LogEvents from '@/api/log/log-events';
import sendLog from '@/api/log/send-log';
import { NoticeKind, useGetAllNotices } from '@/api/notice/notice';
import SearchBar from '@/app/components/molecules/searchBar/SearchBar';
import SearchTagSelect from '@/app/components/molecules/searchTagSelect/SearchTagSelect';
import ResultZabo from '@/app/components/templates/ResultZabo/ResultZabo';
import { Locale } from '@/app/i18next/settings';
import { useTranslation } from 'react-i18next';

const SearchPage = ({
  searchParams,
}: {
  params: { lng: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { t } = useTranslation();

  const [selectedTags, setSelectedTags] = useState<NoticeKind[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO : submit 동작

    const searchQuery = e.currentTarget.searchQuery as HTMLInputElement;
    setSearchKeyword(searchQuery.value); // SearchBar 수정할 때 주의
    sendLog(LogEvents.searchPageSubmit, {
      query: searchQuery.value,
    });
  };

  const data = useGetAllNotices({
    search: searchKeyword,
    tags: selectedTags,
    orderBy: 'recent',
  });

  const handleTagChange = (selected: NoticeKind[]) => {
    setSelectedTags(selected);
    sendLog(LogEvents.searchPageTypeChange, {
      types: selected,
    });
  };

  return (
    <div className="content mx-auto">
      <div className="flex flex-col align-center">
        <div className={'flex justify-center'}>
          <div
            className={'animate-none search-bar-animation flex flex-col gap-3'}
          >
            <SearchBar
              onSubmit={handleSubmit}
              placeholder={'공지 제목이나 태그로 검색'}
            />
            <SearchTagSelect
              selected={selectedTags}
              onChange={handleTagChange}
            />
          </div>
        </div>

        {data && data.list.length > 0 && (
          <div className={'gap-[10px] flex flex-col flex-nowrap'}>
            <p className={'text-lg md:text-4xl font-bold'}>♨ 지글 공지</p>

            <div className={'h-8'} />

            {data.list.map((notice) => (
              <ResultZabo
                {...notice}
                searchQuery={searchKeyword}
                logName={'SearchPage'}
                t={t}
                key={notice.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
