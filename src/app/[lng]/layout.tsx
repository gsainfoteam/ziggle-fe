import '@/app/globals.css';
import '@/app/initDayjs';

import { dir } from 'i18next';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';

import Footer from '@/app/components/templates/Footer';
import Navbar from '@/app/components/templates/Navbar';
import { useTranslation } from '@/app/i18next';
import { languages, Locale } from '@/app/i18next/settings';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  preload: false,
});

export const generateMetadata = async ({
  params: { lng },
}: {
  params: { lng: Locale };
}): Promise<Metadata> => {
  // use hook in generateMetadata
  const createTranslation = useTranslation;
  const { t } = await createTranslation(lng, 'translation');

  return {
    metadataBase: new URL('https://ziggle.gistory.me'),
    alternates: {
      canonical: '/',
      languages: languages.reduce(
        (acc, lng) => ({ ...acc, [lng]: `/${lng}` }),
        {},
      ),
    },
    title: {
      template: `%s | ${t('metadata.title')}`,
      default: t('metadata.title'),
    },
    description: t('metadata.description'),
    themeColor: '#eb6263',
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: 'https://ziggle.gistory.me',
      siteName: 'Ziggle',
      locale: lng,
      type: 'website',
    },
  };
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: Locale };
}) {
  const { t } = await useTranslation(lng, 'translation');

  return (
    <html lang={lng} dir={dir(lng)}>
      <Script id="smartlook-api">
        {`
          window.smartlook ||
          (function (d) {
            var o = (smartlook = function () {
                o.api.push(arguments);
              }),
              h = d.getElementsByTagName("head")[0];
            var c = d.createElement("script");
            o.api = new Array();
            c.async = true;
            c.type = "text/javascript";
            c.charset = "utf-8";
            c.src = "https://web-sdk.smartlook.com/recorder.js";
            h.appendChild(c);
          })(document);
          smartlook("init", "ec3783dc608b665c4753eb3025ccf6674e73ab19", {
            region: "eu",
          });
          smartlook("record", {
            forms: true,
            numbers: true,
            ips: true,
          });
        `}
      </Script>
      <body
        className={
          `${lng === 'ko' ? notoSansKR.className : inter.className} ` +
          'flex flex-col min-h-screen ' +
          'selection:bg-primary/20'
        }
      >
        <Navbar lng={lng} t={t} />
        <main className="flex-1">{children}</main>
        <div className="basis-80" />
        <Footer t={t} />
      </body>
    </html>
  );
}
