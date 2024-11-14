import Link from 'next/link';

import { createTranslation, PropsWithLng } from '@/app/i18next';
import AppStoreLogo from '@/assets/logos/appstore.svg';
import GitHubLogo from '@/assets/logos/github.svg';
import InfoteamLogo from '@/assets/logos/infoteam.svg';
import PlayStoreLogo from '@/assets/logos/playstore.svg';

import CSLink from '../../shared/CSLink/CSLink';

export const playStoreLink =
  'https://play.google.com/store/apps/details?id=me.gistory.ziggle';
export const appStoreLink = 'https://apps.apple.com/kr/app/ziggle/id6451740697';

const ExternalLink = ({ ...props }: React.ComponentProps<typeof Link>) => (
  <Link {...props} target="_blank" rel="noopener noreferrer" />
);

interface FooterLink {
  name: string;
  link: string;
  key?: string;
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
            <ExternalLink href="https://github.com/gsainfoteam">
              <GitHubLogo className="w-10" />
            </ExternalLink>
            <ExternalLink href={playStoreLink}>
              <PlayStoreLogo className="w-10" />
            </ExternalLink>
            <ExternalLink href={appStoreLink}>
              <AppStoreLogo className="w-10" />
            </ExternalLink>
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
              {links.map(({ link, name, key }: FooterLink) =>
                key === 'bugReport' ? (
                  // <CSLink key={name}>{name}</CSLink>
                  <></>
                ) : (
                  <ExternalLink key={name} href={link}>
                    {name}
                  </ExternalLink>
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
