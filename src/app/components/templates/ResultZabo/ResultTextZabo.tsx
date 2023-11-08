import dayjs from "dayjs";
import { Trans } from "react-i18next";

import { T } from "@/app/i18next";

import { TextZaboProps } from "../../organisms/Zabo/TextZabo";
import HighlightedText from "../../molecules/HighlightedText";

const ResultTextZabo = ({
  title,
  body,
  createdAt,
  views,
  author,
  deadline: rawDeadline,
  searchQuery,
  t,
}: TextZaboProps & { t: T } & { searchQuery: string }) => {
  const deadline = rawDeadline ? dayjs(rawDeadline) : undefined;

  return (
    <div
      className={
        "flex flex-col justify-between gap-2.5 p-5" +
        "w-full box-border overflow-hidden rounded border cursor-pointer border-secondayText" +
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
          <div>
            <HighlightedText query={searchQuery}>{author}</HighlightedText>
          </div>
        </div>
      </div>
    </div>
  );
};
