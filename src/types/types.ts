export enum NoticeType {
  RECRUIT = "RECRUIT",
  EVENT = "EVENT",
  NORMAL = "GENERAL", // 일반을 normal로 할지 general로 할지 고민 -> General로 합시다.
  ACADEMIC = "ACADEMIC",
}

export interface ZaboProps {
  id: number;
  title: string;
  date: string;
  viewCount: number;
  author: string;
  organization?: string;

  /** 이미지가 있는 경우 Zabo, 없는 경우 TextZabo */
  thumbnailUrl?: string;

  /** TextZabo에 쓰이는 content */
  content?: string;

  /** TextZabo나 Image에 쓰이는 사이징 처리용 Props */
  origin: Origin;
  size: number;
}

type Origin = "width" | "height";

/**
 * @deprecated The method should not be used
 */
export interface ImageRendererProps {
  imageUrl: string;
  origin: Origin;
  size: number; // pixel 단위만 허용 (이미지 크기 계산을 위함)
  isHover: boolean;
  objectPosition?: React.CSSProperties["objectPosition"];
  borderRadius?: number;
  size_theGreatestProduct?: number;
  size_theMinimumShare?: number;
}

export interface SearchResultProps {
  deadline?: string;
  content?: string;
  title: string;
  author: string;
  organization?: string;
  tags: string[];
  date: string;
  viewCount: number;
  thumbnailUrl: string;
  searchQuery: string;
}

export interface BannerProps {
  imageUrl: string;
  link?: string;
  objectPosition?: React.CSSProperties["objectPosition"];
}

export interface Notice {
  uuid: string;
}
