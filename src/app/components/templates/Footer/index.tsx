import InfoteamLogo from '@/assets/logos/infoteam.svg';
import GitHubLogo from '@/assets/logos/github.svg';
import PlayStoreLogo from '@/assets/logos/playstore.svg';
import AppStoreLogo from '@/assets/logos/appstore.svg';
import Link from 'next/link';

const linkSections = [
  {
    title: '소개',
    links: [
      {
        name: '인포팀 소개',
        link: 'https://introduce.gistory.me',
      },
    ],
  },
  {
    title: '약관',
    links: [
      {
        name: '서비스이용약관',
        link: 'https://infoteam-rulrudino.notion.site/6177be6369e44280a23a65866c51b257',
      },
      {
        name: '개인정보처리방침',
        link: 'https://infoteam-rulrudino.notion.site/ceb9340c0b514497b6d916c4a67590a1',
      },
      {
        name: '문의',
        link: 'mailto:ziggle@gistory.me',
      },
    ],
  },
  {
    title: '바로가기',
    links: [
      {
        name: '지스트 하우스',
        link: 'https://sites.google.com/view/gisthouse/home',
      },
      {
        name: 'GIST 홈페이지',
        link: 'https://www.gist.ac.kr/kr/main.html',
      },
      {
        name: '지졸',
        link: 'https://gijol.im',
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-primary text-white
      box-content px-pageSide py-16 min-h-[300px]
      flex flex-col gap-x-24 gap-y-12
      xl:flex-row"
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <InfoteamLogo />
            <div className="font-medium">지스트대학 총학생회 산하 정보국</div>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/gsainfoteam">
              <GitHubLogo className="w-10" />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=me.gistory.ziggle">
              <PlayStoreLogo className="w-10" />
            </Link>
            <Link href="https://apps.apple.com/kr/app/ziggle/id6451740697">
              <AppStoreLogo className="w-10" />
            </Link>
          </div>
        </div>
        <div>ⓒ 2023. INFOTEAM all rights reserved.</div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-24 gap-y-12">
        {linkSections.map(({ title, links }) => (
          <div key={title} className="flex flex-col gap-2 md:gap-6 w-32">
            <div className="font-bold text-sm">{title}</div>
            <div className="flex flex-col gap-2">
              {links.map(({ link, name }) => (
                <Link key={name} href={link}>
                  {name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
