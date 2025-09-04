import '@/app/components/layout/initDayjs';
import '@/app/globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import dayjs from 'dayjs';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

import { createTranslation, PropsWithLng } from '@/app/i18next';
import { languages } from '@/app/i18next/settings';

import AmplitudeProvider from './AmplitudeProvider';

const pretendard = localFont({
  src: '../../assets/fonts/PretendardVariable.woff2',
});

export const generateMetadata = async ({
  params: { lng },
}: {
  params: PropsWithLng;
}): Promise<Metadata> => {
  const { t } = await createTranslation(lng);

  return {
    metadataBase: new URL(
      process.env.NEXTAUTH_URL ??
        `http://localhost:${process.env.PORT || 3000}`,
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
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        url: '/logo.png',
        sizes: '1024x1024',
      },
    ],
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
  params: PropsWithLng;
}) {
  dayjs.locale(lng);

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
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
          pretendard.className +
          ' flex min-h-screen flex-col ' +
          'selection:bg-primary/20'
        }
      >
        <AmplitudeProvider>
          {children}
          <Toaster position="bottom-right" />
        </AmplitudeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
      )}
    </html>
  );
}
