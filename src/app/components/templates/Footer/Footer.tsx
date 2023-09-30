import InfoteamLogo from '@/assets/logos/infoteam.svg';
import GitHubLogo from '@/assets/logos/github.svg';
import PlayStoreLogo from '@/assets/logos/playstore.svg';
import AppStoreLogo from '@/assets/logos/appstore.svg';
import ExternalLink from '../../atoms/ExternalLink';
import { T } from '@/app/i18next';

const Footer = ({ t }: { t: T }) => {
  return (
    <footer
      className={
        'bg-primary text-white ' +
        'box-content px-pageSide py-8 sm:py-16 min-h-[300px] ' +
        'flex flex-col gap-x-24 gap-y-12 ' +
        'xl:flex-row'
      }
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <InfoteamLogo className="w-8/12 sm:w-fit" />
            <div className="font-medium text-sm sm:text-base">
              {t('footer.infoteam')}
            </div>
          </div>
          <div className="flex gap-4">
            <ExternalLink href="https://github.com/gsainfoteam">
              <GitHubLogo className="w-10" />
            </ExternalLink>
            <ExternalLink href="https://play.google.com/store/apps/details?id=me.gistory.ziggle">
              <PlayStoreLogo className="w-10" />
            </ExternalLink>
            <ExternalLink href="https://apps.apple.com/kr/app/ziggle/id6451740697">
              <AppStoreLogo className="w-10" />
            </ExternalLink>
          </div>
        </div>
        <div className="text-xs sm:text-base">{t('footer.copyright')}</div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-24 gap-y-12">
        {t('footer.sections', { returnObjects: true }).map(
          ({ title, links }) => (
            <div key={title} className="flex flex-col gap-2 md:gap-6 w-32">
              <div className="font-bold text-sm">{title}</div>
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
