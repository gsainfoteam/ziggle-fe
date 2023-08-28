export enum NoticeType {
  RECRUIT = "recruit",
  EVENT = "event",
  NORMAL = "general", // 일반을 normal로 할지 general로 할지 고민 -> General로 합시다.
  ACADEMIC = "academic",
}

export interface ZaboProps {
  id: number;
  title: string;
  date: string;
  viewCount: number;
  author: string;
  organization?: string;
  deadline?: string;

  /** 이미지가 있는 경우 Zabo, 없는 경우 TextZabo */
  thumbnailUrl?: string;

  /** TextZabo에 쓰이는 content */
  content?: string;

  /** TextZabo나 Image에 쓰이는 사이징 처리용 Props */
  origin: Origin;
  size: number;

  logName?: string;
}

export type Origin = "width" | "height";

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
  id: number;
  deadline?: string;
  content?: string;
  title: string;
  author: string;
  organization?: string;
  tags: Tag[];
  date: string;
  viewCount: number;
  thumbnailUrl: string;
  searchQuery: string;
  logName?: string;
}

/**
 * 임시로 Zabo 사용, 이후 Notice를 사용하도록 변경
 */
export interface NoticeBase {
  id: number;
  title: string;
  views: number;
  body: string;
  deadline: string | null;
  createdAt: string;
  author: string;
  tags: Tag[];
}

/**
 * 임시로 Zabo 사용, 이후 Notice를 사용하도록 변경
 */
export interface Notice extends NoticeBase {
  imageUrl: string | null;
}

/**
 * 임시로 Zabo 사용, 이후 Notice를 사용하도록 변경
 */
export interface NoticeDetail extends NoticeBase {
  imagesUrl: string[];
  reminder: boolean;
}

export interface BannerProps {
  imageUrl: string;
  link?: string;
  objectPosition?: React.CSSProperties["objectPosition"];
}

export interface Tag {
  id: number;
  name: string;
}

export interface User {
  user_uuid: string;
  user_email_id: string;
  user_name: string;
  user_phone_number: string;
  student_id: string;
}

export const MOBILE_BREAKPOINT = "768px";

export interface SvgProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
}
