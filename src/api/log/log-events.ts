const LogEvents = {
  screenView: 'screen_view',

  // Nav Bar
  navBarClickLogo: 'nav_bar_click_logo',
  navBarClickAll: 'nav_bar_click_all',
  navBarClickWrite: 'nav_bar_click_write',
  navBarClickSearch: 'nav_bar_click_search',
  navBarClickLogin: 'nav_bar_click_login',
  navBarClickMyPage: 'nav_bar_click_my_page',

  // Footer
  footerClickGithub: 'footer_click_github',
  footerClickPlayStore: 'footer_click_play_store',
  footerClickAppStore: 'footer_click_app_store',
  footerClickInfo: 'footer_click_info',
  footerClickServiceTerms: 'footer_click_service_terms',
  footerClickPrivacyPolicy: 'footer_click_privacy_policy',
  footerClickContact: 'footer_click_contact',
  footerClickGist: 'footer_click_gist',
  footerClickGijol: 'footer_click_gijol',

  // Home Page

  // Search Page
  searchPageSubmit: 'search_page_submit',
  searchPageTypeChange: 'search_page_type_change',
  searchPageClickCancel: 'search_page_click_cancel',

  // Notice Writing Page
  noticeWritingPageTypeTitle: 'notice_writing_page_type_title',
  noticeWritingPageCheckDeadline: 'notice_writing_page_check_deadline',
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
