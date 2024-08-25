'use client';

import { useState } from 'react';

import Tabs from '@/app/components/organisms/Tab/Tab';
import { createTranslation, PropsWithLng, PropsWithT } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import GroupIntroTab from './GroupIntroTab';
import GroupMembersTab from './GroupMembersTab';
import GroupNoticesTab from './GroupNoticesTab';

interface GroupDetailTabsProps {}

const GroupDetailTabs = ({ lng }: PropsWithLng<GroupDetailTabsProps>) => {
  const { t } = useTranslation(lng);

  const tabs = [
    { key: 'info', label: t('group.tabs.intro') },
    { key: 'notice', label: t('group.tabs.notices') },
    { key: 'member', label: t('group.tabs.members') },
  ] as const;

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]['key']>('info');

  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'info' && <GroupIntroTab />}
      {activeTab === 'notice' && <GroupNoticesTab />}
      {activeTab === 'member' && <GroupMembersTab />}
    </>
  );
};

export default GroupDetailTabs;
