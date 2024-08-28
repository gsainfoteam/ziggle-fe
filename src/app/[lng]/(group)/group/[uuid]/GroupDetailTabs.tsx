'use client';

import { usePathname } from 'next/navigation';

import Tabs from '@/app/components/organisms/Tabs/Tabs';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

interface GroupDetailTabsProps {
  activeTab: string;
  searchParams?: { tab: string };
}

const GroupDetailTabs = ({
  activeTab,
  lng,
  searchParams,
}: PropsWithLng<GroupDetailTabsProps>) => {
  const { t } = useTranslation(lng);
  const pathname = usePathname();

  const generateLinks = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    return `${pathname}?${params.toString()}`;
  };

  const tabs = [
    { key: 'info', label: t('group.tabs.intro'), link: generateLinks('info') },
    {
      key: 'notice',
      label: t('group.tabs.notices'),
      link: generateLinks('notice'),
    },
    {
      key: 'member',
      label: t('group.tabs.members'),
      link: generateLinks('member'),
    },
  ] as const;

  return (
    <>
      <Tabs.SSR tabs={tabs} activeTab={activeTab} />
    </>
  );
};

export default GroupDetailTabs;
