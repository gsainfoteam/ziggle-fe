import { Notice, Origin, ZaboProps } from "src/types/types";

export const noticeToZabo = (
  notice: Notice,
  origin: Origin,
  size: number,
): ZaboProps => {
  const zabo: ZaboProps = {
    id: notice.id,
    title: notice.title,
    date: notice.createdAt,
    viewCount: notice.views,
    author: notice.author,
    organization: "not implemented yet",
    thumbnailUrl: notice.imageUrl ?? undefined, // 백엔에선 null로 주고 프엔은 optional임...
    origin: origin,
    size: size,
  };

  return zabo;
};

export const noticesToManyZabos = (
  notices: Notice[],
): Omit<ZaboProps, "origin" | "size">[] => {
  const zabos: Omit<ZaboProps, "origin" | "size">[] = notices.map((notice) => {
    return {
      id: notice.id,
      title: notice.title,
      date: notice.createdAt,
      viewCount: notice.views,
      author: notice.author,
      organization: "not implemented yet",
      thumbnailUrl: notice.imageUrl ?? undefined,
    };
  });

  return zabos;
};
