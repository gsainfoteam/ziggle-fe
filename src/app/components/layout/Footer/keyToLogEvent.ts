import LogEvents from '@/api/log/log-events';

const keyToLogEvent = {
  introduce: LogEvents.footerClickInfo,
  github: LogEvents.footerClickGithub,
  playStore: LogEvents.footerClickPlayStore,
  appStore: LogEvents.footerClickAppStore,
  bugReport: LogEvents.footerClickBugReport,
  serviceTerms: LogEvents.footerClickServiceTerms,
  privacyPolicy: LogEvents.footerClickPrivacyPolicy,
  contact: LogEvents.footerClickContact,
  house: LogEvents.footerClickHouse,
  gist: LogEvents.footerClickGist,
  gijol: LogEvents.footerClickGijol,
};

export default keyToLogEvent;
