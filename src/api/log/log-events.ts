const LogEvents = {
  screenView: 'screen_view',

  // Nav Bar
  navBarClickLogo: 'navbar_click_logo',
  navBarClickLogin: 'navbar_click_login',
  navBarClickMyPage: 'navbar_click_my_page',
  // only for mobile
  navBarClickMenu: 'navbar_click_menu',

  // Search Page
  searchSubmit: 'search_submit',
  searchClickSearch: 'search_click_search',
  searchChangeKeyword: 'search_change_keyword',
  searchClickClear: 'search_click_clear',
  // only for mobile
  searchClickExpand: 'search_click_expand',
  searchClickCancel: 'search_click_cancel',

  // Footer
  footerClickGithub: 'footer_click_github',
  footerClickPlayStore: 'footer_click_play_store',
  footerClickAppStore: 'footer_click_app_store',
  footerClickInfo: 'footer_click_info',
  footerClickBugReport: 'footer_click_bug_report',
  footerClickServiceTerms: 'footer_click_service_terms',
  footerClickPrivacyPolicy: 'footer_click_privacy_policy',
  footerClickContact: 'footer_click_contact',
  footerClickHouse: 'footer_click_house',
  footerClickGist: 'footer_click_gist',
  footerClickGijol: 'footer_click_gijol',

  // Sidebar
  sidebarClickLink: 'sidebar_click_link',

  // My Page
  myClickMyNotice: 'my_click_my_notice',
  myClickReminded: 'my_click_reminded',
  myClickBugReport: 'my_click_bug_report',
  myToggleLanguage: 'my_toggle_language',
  myClickMode: 'my_click_mode',
  myClickLogout: 'my_click_logout',
  myClickUnregister: 'my_click_unregister',

  // Notice Writing Page
  noticeWritingPageTypeTitle: 'notice_writing_page_type_title',
  noticeWritingPageCheckDeadline: 'notice_writing_page_check_deadline',
  noticeWritingPageCheckEnglish: 'notice_writing_page_check_english',
  noticeWritingPageSetDeadline: 'notice_writing_page_set_deadline',
  noticeWritingPageSetType: 'notice_writing_page_set_type',
  noticeWritingPageTypeTag: 'notice_writing_page_type_tag',
  noticeWritingPageTypeContent: 'notice_writing_page_type_content',
  noticeWritingPageClickSubmit: 'notice_writing_page_click_submit',

  // Components
  noticeClick: 'notice_click',
  searchResultClick: 'search_result_click',
  search: 'search',
} as const;

export default LogEvents;
