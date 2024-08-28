import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';

interface Tab {
  key: string;
  label: string;
  link?: string;
}

interface TabProps {
  tabs: readonly Tab[];
  activeTab: string;

  setActiveTab: (key: any) => void;
}

const ButtonClass = 'flex-none border-b-[3px] p-[15px] pb-3 ';

const Tabs = ({ tabs, activeTab, setActiveTab }: TabProps) => {
  return (
    <div className={'flex'}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={
            ButtonClass +
            (activeTab === tab.key ? 'border-primary' : 'border-grey')
          }
        >
          <p
            className={
              'text-center ' +
              (activeTab === tab.key ? 'text-primary' : 'text-grey')
            }
          >
            {tab.label}
          </p>
        </button>
      ))}
      <div className={'flex-grow border-b-[3px] border-grey'}></div>
    </div>
  );
};

const SSR = ({ tabs, activeTab }: Omit<TabProps, 'setActiveTab'>) => {
  return (
    <div className={'flex'}>
      {tabs.map((tab) => (
        <Link
          href={tab.link ?? ''}
          key={tab.key}
          className={
            ButtonClass +
            (activeTab === tab.key ? 'border-primary' : 'border-grey')
          }
        >
          <p
            className={
              'text-center ' +
              (activeTab === tab.key ? 'text-primary' : 'text-grey')
            }
          >
            {tab.label}
          </p>
        </Link>
      ))}
      <div className={'flex-grow border-b-[3px] border-grey'}></div>
    </div>
  );
};

Tabs.SSR = SSR;
export default Tabs;
