import ExternalLink from '@/app/components/atoms/ExternalLink';
import { PropsWithT } from '@/app/i18next';
import AppStoreLogo from '@/assets/logos/appstore.svg';
import GitHubLogo from '@/assets/logos/github.svg';
import InfoteamLogo from '@/assets/logos/infoteam.svg';
import PlayStoreLogo from '@/assets/logos/playstore.svg';

export const playStoreLink =
  'https://play.google.com/store/apps/details?id=me.gistory.ziggle';
export const appStoreLink = 'https://apps.apple.com/kr/app/ziggle/id6451740697';

const Footer = ({ t }: PropsWithT) => {
  return (
    <footer
      className={
        'bg-primary text-white ' +
        'box-content min-h-[300px] px-pageSide py-8 sm:py-16 ' +
        'flex flex-col gap-x-24 gap-y-12 ' +
        'xl:flex-row'
      }
    >
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
        {t('footer.sections', { returnObjects: true }).map(
          ({ title, links }) => (
            <div key={title} className="flex w-32 flex-col gap-2 md:gap-6">
              <div className="text-sm font-bold">{title}</div>
              <div className="flex flex-col gap-2">
                {links.map(({ link, name }) => (
                  <ExternalLink key={name} href={link}>
                    {name}
                  </ExternalLink>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </footer>
  );
};

export default Footer;
