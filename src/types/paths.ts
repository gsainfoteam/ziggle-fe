enum Paths {
  home = "/",
  section = "/section/", // + noticeSection
  search = "/search",
  myPage = "/my-page",
  noticeWriting = "/notice-writing",
  noticeDetail = "/notice/", // + id
}

export enum NoticeSection {
  all = "all",
  event = "event",
  hot = "hot",
  general = "general",
  recruit = "recruit",
  urgent = "urgent",

  reminded = "reminded",
  written = "written",
}

export default Paths;
