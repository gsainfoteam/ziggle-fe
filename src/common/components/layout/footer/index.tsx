import { useTranslation } from 'react-i18next';

import AppStoreLogo from '@/assets/logos/appstore.svg?react';
import GitHubLogo from '@/assets/logos/github.svg?react';
import InfoteamLogo from '@/assets/logos/infoteam.svg?react';
import PlayStoreLogo from '@/assets/logos/playstore.svg?react';
import { LogEvents } from '@/common/const/log-events';

import { LogClick } from '../../analytics/log-click';
import { CSLink } from '../../shared';

export const playStoreLink =
  'https://play.google.com/store/apps/details?id=me.gistory.ziggle';
export const appStoreLink = 'https://apps.apple.com/kr/app/ziggle/id6451740697';

const ExternalLink = ({
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a {...props} target="_blank" rel="noopener noreferrer" />
);

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
  serviceStatus: LogEvents.footerClickServiceStatus,
};

interface FooterLink {
  name: string;
  link: string;
  key:
    | 'github'
    | 'playStore'
    | 'appStore'
    | 'bugReport'
    | 'serviceTerms'
    | 'privacyPolicy'
    | 'contact'
    | 'house'
    | 'gist'
    | 'gijol'
    | 'serviceStatus';
}

export const Footer = () => {
  const { t } = useTranslation('layout');

  return (
    <footer className="bg-primary px-pageSide dark:text-dark_white mt-8 box-content flex flex-col gap-x-24 gap-y-12 py-12 text-white sm:py-16 xl:flex-row">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <InfoteamLogo className="w-8/12 sm:w-fit" />
            <div className="text-sm font-medium sm:text-base">
              {t('footer.infoteam')}
            </div>
          </div>
          <div className="flex gap-4">
            <LogClick eventName={LogEvents.footerClickGithub}>
              <ExternalLink href="https://github.com/gsainfoteam">
                <GitHubLogo className="w-10" />
              </ExternalLink>
            </LogClick>
            <LogClick eventName={LogEvents.footerClickPlayStore}>
              <ExternalLink href={playStoreLink}>
                <PlayStoreLogo className="w-10" />
              </ExternalLink>
            </LogClick>
            <LogClick eventName={LogEvents.footerClickAppStore}>
              <ExternalLink href={appStoreLink}>
                <AppStoreLogo className="w-10" />
              </ExternalLink>
            </LogClick>
          </div>
        </div>
        <div className="text-xs sm:text-base">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
      <div className="flex flex-col gap-x-24 gap-y-12 md:flex-row">
        {t('footer.sections', {
          returnObjects: true,
        }).map(({ title, links }) => (
          <div key={title} className="flex w-32 flex-col gap-2 md:gap-6">
            <div className="text-sm font-bold">{title}</div>
            <div className="flex flex-col gap-2">
              {(links as FooterLink[]).map(
                ({ link, name, key }: FooterLink) => (
                  <LogClick eventName={keyToLogEvent[key]} key={name}>
                    {key === 'bugReport' ? (
                      <CSLink key={name}>{name}</CSLink>
                    ) : (
                      <ExternalLink key={name} href={link}>
                        {name}
                      </ExternalLink>
                    )}
                  </LogClick>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};
