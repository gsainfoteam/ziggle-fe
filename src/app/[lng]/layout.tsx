import '@/app/globals.css';
import '@/app/initDayjs';

import { dir } from 'i18next';
import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

import Footer from '@/app/components/templates/Footer';
import Navbar from '@/app/components/templates/Navbar';
import { createTranslation, PropsWithLng } from '@/app/i18next';
import { languages } from '@/app/i18next/settings';

import InitClient from './InitClient';

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
  params: PropsWithLng;
}): Promise<Metadata> => {
  const { t } = await createTranslation(lng, 'translation');

  return {
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`,
    ),
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
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      images: ['/api/og'],
    },
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url: 'https://ziggle.gistory.me',
      siteName: t('metadata.title'),
      locale: lng,
      type: 'website',
      images: '/api/og',
    },
  };
};

export const viewport: Viewport = {
  themeColor: '#eb6263',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: PropsWithLng;
}) {
  const { t } = await createTranslation(lng, 'translation');

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
          'flex min-h-screen flex-col ' +
          'selection:bg-primary/20'
        }
      >
        <InitClient>
          <Navbar lng={lng} />
          <main className="flex-1">{children}</main>
          <div className="basis-80" />
          <Footer t={t} />
          <ToastContainer className="w-64" />
        </InitClient>
      </body>
    </html>
  );
}
