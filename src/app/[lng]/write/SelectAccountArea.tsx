'use client';

import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';
import { use, useEffect, useState } from 'react';

import {
  getGroupsToken,
  getMyGroups,
  GroupInfo,
  thirdPartyAuth,
} from '@/api/group/group';
import { PropsWithT } from '@/app/i18next';
import NavArrowRightIcon from '@/assets/icons/nav-arrow-right.svg';

import { EditorAction } from './noticeEditorActions';

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
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const path: string = usePathname();

  // useEffect(() => {
  //   thirdPartyAuth(path);
  //   //TODO: Make Login Hub page for get authrization code
  //   getGroupsToken('temporary code');
  // }, [path]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setAccount(selectedValue === '' ? null : selectedValue);
    if (selectedValue === 'groupSelect') {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    isModalOpen &&
      Swal.fire({
        title: 'Redirecting',
        text: 'Do you want to get group information?',
        icon: 'info',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          thirdPartyAuth(path);
        }
        setIsModalOpen(false);
      });
  }, [path, isModalOpen]);

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
        <option value="groupSelect">If you want write as a group</option>

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
