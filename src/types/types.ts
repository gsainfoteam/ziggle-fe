export enum NoticeType {
  RECRUIT = "RECRUIT",
  EVENT = "EVENT",
  NORMAL = "GENERAL", // 일반을 normal로 할지 general로 할지 고민 -> General로 합시다.
}

export interface ZaboProps {
  id: number;
  title: string;
  date: string;
  viewCount: number;
  author: string;
  thumbnailUrl?: string;
  organization: string;
  content?: string;
}
