'use client';

import { use, useEffect } from 'react';
import { useState } from 'react';

import { thirdPartyAuth ,getGroupsToken, getMyGroups, GroupInfo } from '@/api/group/group';
import { PropsWithT } from '@/app/i18next';
import NavArrowRightIcon from '@/assets/icons/nav-arrow-right.svg';

import { EditorAction } from './noticeEditorActions';
import { usePathname } from 'next/navigation';

interface SelectAccountAreaProps {
  account: string | null;
  setAccount: (account: string | null) => void;
}

const SelectAccountArea = ({
  account,
  setAccount,
  t,
}: PropsWithT<SelectAccountAreaProps>) => {
  const [myGroups, setMyGroups] = useState<GroupInfo[]>([]);
  const path: string = usePathname();
  useEffect(() => {
    thirdPartyAuth(path);
    getGroupsToken();
    getMyGroups().then();
  }, [path]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setAccount(selectedValue === '' ? null : selectedValue);
  };

  return (
    <div className="relative mt-2">
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <NavArrowRightIcon className="w-5 rotate-90 stroke-text" />
      </div>

      <select
        value={account ?? ''}
        onChange={handleAccountChange}
        className={`w-full appearance-none rounded-[10px] bg-greyLight px-4 py-3.5 ${
          account ? 'text-primary' : 'text-greyDark'
        } focus:border-primary focus:outline-none`}
      >
        <option value="">{t('write.writeAsMyself')}</option>

        {myGroups.map((group) => (
          <option key={group.uuid} value={group.uuid}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectAccountArea;
