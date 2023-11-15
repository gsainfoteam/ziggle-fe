import Link from "next/link";

import LogEvents from "@/api/log/log-events";
import sendLog from "@/api/log/send-log";
import formatISODate from "@/utils/formatISODate";
import getDayOfWeek from "@/utils/getDayOfWeek";
import GetHighlightedText from "@/utils/GetHighlightedText";

import Chip from "../../molecules/Chip";
import ZaboImage from "../../molecules/ZaboImage";
import { SearchResultProps } from "../searchResult/SearchResult";

const SearchResultImage = ({
  id,
  deadline,
  title,
  author,
  tags,
  date,
  viewCount,
  thumbnailUrl,
  searchQuery,
  organization,
  logName,
}: SearchResultProps) => {
  return (
    <Link
      onClick={() =>
        sendLog(LogEvents.searchResultClick, {
          location: logName ?? "unknown",
          isText: false,
        })
      }
      href={`/ko/notice/` + id}
    >
      {/* fix /ko/ to /lng/ */}
      <div className="flex justify-center gap-5 w-full flex-nowrap overflow-hidden box-border items-stretch">
        <ZaboImage
          // origin="width"
          // size={isMobile ? 120 : 230}
          width={230} // handle mobile
          src={thumbnailUrl}
          alt={title}
          // isHover={false}
        />
        <div
          className="flex flex-col justify-between box-border"
          style={{
            boxSizing: "border-box",
            padding: "1rem 0",
          }}
        >
          <div className="flex flex-col align-start">
            <p className={"font-medium text-sm md:text-xl"}>
              {deadline &&
                `마감일 ${formatISODate(deadline)} (${getDayOfWeek(deadline)})`}
            </p>
            <GetHighlightedText
              className={"font-bold text-xl md:text-3xl text-center"}
              text={title}
              query={searchQuery}
              highlightColor={"primary"}
            />
            <div className={"h-1"} />

            <div className={"gap-2 align-middle"}>
              <GetHighlightedText
                text={author}
                query={searchQuery}
                className={"font-bold text-sm md:text-lg text-center"}
                highlightColor={"primary"}
              />
              {organization && (
                <>
                  <p className={"text-secondaryText"}>•</p>
                  <GetHighlightedText
                    text={organization}
                    query={searchQuery}
                    className={"font-bold text-sm md:text-lg text-center"}
                    highlightColor={"primary"}
                  />
                </>
              )}
            </div>
            <div className={"gap-2 my-2 flex-nowrap"}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  // font={Font.Regular}
                  variant={tag.name === searchQuery ? "contained" : undefined}
                >
                  {"#" + tag.name}
                </Chip>
              ))}
            </div>
          </div>
          <div className={"gap-2 align-middle"}>
            <p
              className={"font-regular text-secondaryText text-xs md:text-base"}
            >
              {formatISODate(date)}
            </p>
            <p className={"text-secondaryText text-xs md:text-base"}>•</p>
            <p className={"font-bold text-secondaryText text-xs md:text-base"}>
              조회수 {viewCount}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultImage;
