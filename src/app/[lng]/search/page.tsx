"use client";

import { useState } from "react";

import LogEvents from "@/api/log/log-events";
import sendLog from "@/api/log/send-log";
import { getAllNotices } from "@/api/notice/notice";
import SearchBar from "@/app/components/molecules/searchBar/SearchBar";
import SearchTagSelect from "@/app/components/molecules/searchTagSelect/searchTagSelect";
import { Locale } from "@/app/i18next/settings";

export enum NoticeType { // temporary
  RECRUIT = "recruit",
  EVENT = "event",
  NORMAL = "general",
  ACADEMIC = "academic",
}

const SearchPage = ({
  searchParams,
}: {
  params: { lng: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [selectedTags, setSelectedTags] = useState<NoticeType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO : submit 동작
    const data = await Promise.all([
      getAllNotices({
        search: searchKeyword,
        tags: selectedTags,
        orderBy: "recent",
      }),
    ]);
    const searchQuery = e.currentTarget.searchQuery as HTMLInputElement;
    setSearchKeyword(searchQuery.value); // SearchBar 수정할 때 주의
    sendLog(LogEvents.searchPageSubmit, {
      query: searchQuery.value,
    });
  };

  const handleTagChange = (selected: NoticeType[]) => {
    setSelectedTags(selected);
    sendLog(LogEvents.searchPageTypeChange, {
      types: selected,
    });
  };

  return (
    <div className="content mx-auto">
      <div className="flex justify-center">
        <div
          className={"animate-none search-bar-animation flex flex-col gap-3"}
        >
          <SearchBar
            onSubmit={handleSubmit}
            placeholder={"공지 제목이나 태그로 검색"}
          />
          <SearchTagSelect selected={selectedTags} onChange={handleTagChange} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
