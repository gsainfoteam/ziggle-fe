import Link from 'next/link';

import LogEvents from '@/api/log/log-events';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import AppStoreLogo from '@/assets/logos/appstore.svg';
import GitHubLogo from '@/assets/logos/github.svg';
import InfoteamLogo from '@/assets/logos/infoteam.svg';
import PlayStoreLogo from '@/assets/logos/playstore.svg';

import Analytics from '../../shared/Analytics';
import CSLink from '../../shared/CSLink/CSLink';
import keyToLogEvent from './keyToLogEvent';

export const playStoreLink =
  'https://play.google.com/store/apps/details?id=me.gistory.ziggle';
export const appStoreLink = 'https://apps.apple.com/kr/app/ziggle/id6451740697';

const ExternalLink = ({ ...props }: React.ComponentProps<typeof Link>) => (
  <Link {...props} target="_blank" rel="noopener noreferrer" />
);

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
    | 'gijol';
}

const Footer = async ({ lng }: PropsWithLng) => {
  const { t } = await createTranslation(lng);

  return (
    <footer className="mt-8 box-content flex flex-col gap-x-24 gap-y-12 bg-primary px-pageSide py-12 text-white dark:text-dark_white sm:py-16 xl:flex-row">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <InfoteamLogo className="w-8/12 sm:w-fit" />
            <div className="text-sm font-medium sm:text-base">
              {t('footer.infoteam')}
            </div>
          </div>
          <div className="flex gap-4">
            <Analytics event={LogEvents.footerClickGithub}>
              <ExternalLink href="https://github.com/gsainfoteam">
                <GitHubLogo className="w-10" />
              </ExternalLink>
            </Analytics>
            <Analytics event={LogEvents.footerClickPlayStore}>
              <ExternalLink href={playStoreLink}>
                <PlayStoreLogo className="w-10" />
              </ExternalLink>
            </Analytics>
            <Analytics event={LogEvents.footerClickAppStore}>
              <ExternalLink href={appStoreLink}>
                <AppStoreLogo className="w-10" />
              </ExternalLink>
            </Analytics>
          </div>
        </div>
        <div className="text-xs sm:text-base">{t('footer.copyright')}</div>
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
                  <Analytics event={keyToLogEvent[key]} key={name}>
                    {key === 'bugReport' ? (
                      <CSLink key={name}>{name}</CSLink>
                    ) : (
                      <ExternalLink key={name} href={link}>
                        {name}
                      </ExternalLink>
                    )}
                  </Analytics>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
