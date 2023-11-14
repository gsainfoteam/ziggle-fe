import dayjs from "dayjs";
import { Trans } from "react-i18next";

import { T } from "@/app/i18next";

import Chip from "../../molecules/Chip";
import HighlightedText from "../../molecules/HighlightedText";
import { TextZaboProps } from "../../organisms/Zabo/TextZabo";

const ResultTextZabo = ({
  title,
  body,
  createdAt,
  views,
  author,
  deadline: rawDeadline,
  tags,
  searchQuery,
  t,
}: TextZaboProps & { t: T } & { tags: string[]; searchQuery: string }) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;

  return (
    <div
      className={
        "flex flex-col justify-between gap-2.5 p-5 " +
        "w-full box-border overflow-hidden rounded border cursor-pointer border-secondayText " +
        "bg-white dark:bg-neutral-900"
      }
    >
      <div className="flex flex-col items-start">
        <div className="font-medium text-lg mb-1.5">
          <Trans t={t} i18nKey="zabo.dueAt">
            {{ dueAt: dayjs(deadline).format("LLLL") }}
          </Trans>
        </div>
        <div className="font-bold text-3xl text-start">
          <HighlightedText query={searchQuery}>{title}</HighlightedText>
        </div>

        <div className="flex gap-0.5 items-center">
          <div className="font-bold text-lg">
            <HighlightedText query={searchQuery}>{author}</HighlightedText>
          </div>
          {/* organization here (for futer update) */}
        </div>

        <div className="flex gap-0.5 my-0.5">
          {tags.map((tag, index) => (
            <Chip
              key={index}
              variant={tag === searchQuery ? "contained" : undefined}
            >
              {`#${tag}`}
            </Chip>
          ))}
        </div>

        <div className="font-medium text-sm text-start text-ellipsis line-clamp-4">
          {body ?? t("zabo.noContent")}
        </div>

        <div className="flex gap-0.5">
          <div className="text-sm text-secondayText font-medium flex">
            <Trans t={t} i18nKey="zabo.dateView">
              {{ date: dayjs(createdAt).format("L") }}
              <strong className="font-bold"> · {{ views }}</strong>
            </Trans>
          </div>
        </div>
      </div>
    </div>
  );
};
