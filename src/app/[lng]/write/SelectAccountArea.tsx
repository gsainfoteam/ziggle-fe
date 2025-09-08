'use client';

import { usePathname } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import {
  getGroupsToken,
  getMyGroups,
  GroupInfo,
  thirdPartyAuth,
} from '@/api/group/group';
import Button from '@/app/components/shared/Button';
import { PropsWithT } from '@/app/i18next';
import NavArrowRightIcon from '@/assets/icons/nav-arrow-right.svg';

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
  localStorage.setItem('redirectPath', path);

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setAccount(selectedValue === '' ? null : selectedValue);
  };

  const handleGroupLogin = () => {
    setIsModalOpen(true);
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
          setIsModalOpen(false);
        }
        setIsModalOpen(false);
      });
  }, [path, isModalOpen]);
  const thirdPartycode = localStorage.getItem('thirdPartycode');
  const acessToken = localStorage.getItem('groupsAccessToken');
  useEffect(() => {
    const handleThirdPartyCode = async () => {
      if (thirdPartycode) {
        const data = await getGroupsToken(thirdPartycode);
        console.log(data);
        if (data) {
          localStorage.setItem('groupsAccessToken', data.accessToken);
        }
      }
    };
    handleThirdPartyCode();
  }, [thirdPartycode]);
  useEffect(() => {
    getMyGroups(acessToken!)
      .then((data) => {
        console.log('data', data);
        setMyGroups(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [acessToken]);
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
        {myGroups.length &&
          myGroups.map((group) => (
            <option key={group.uuid} value={group.uuid}>
              {group.name}
            </option>
          ))}
      </select>
      {myGroups.length === 0 ? (
        <Button
          variant="contained"
          className="w-30 my-4 rounded-[10px] py-2"
          onClick={handleGroupLogin}
        >
          <p className="mx-3 my-1 text-base font-bold">
            Clike here if you want to write as group
          </p>
        </Button>
      ) : null}
    </div>
  );
};

export default SelectAccountArea;
