import { createTranslation } from '@/app/i18next';
import { Locale } from '@/app/i18next/settings';

export default async function Home({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const { t } = await createTranslation(lng, 'translation');
}
