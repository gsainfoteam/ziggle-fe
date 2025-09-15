'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import {
  getGroupsToken,
  getUserInfo,
  thirdPartyAuth,
  UserInfo,
} from '@/api/group/group';
import Button from '@/app/components/shared/Button';
import { PropsWithT } from '@/app/i18next';
import NavArrowRightIcon from '@/assets/icons/nav-arrow-right.svg';

type Group = {
  uuid: string;
  name: string;
  profileImageUrl: string | null;
};

interface SelectAccountAreaProps {
  group: Group | null;
  setGroup: (group: Group | null) => void;
}

const SelectAccountArea = ({
  group,
  setGroup,
  t,
}: PropsWithT<SelectAccountAreaProps>) => {
  const [myGroups, setMyGroups] = useState<UserInfo>([]);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const path: string = usePathname();

  useEffect(() => {
    localStorage.setItem('redirectPath', path);
  }, [path]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === '') {
      setGroup(null);
    } else {
      const selectedGroup = myGroups.find(
        (group) => group.uuid === selectedValue,
      );
      console.log('selectedGroup', selectedGroup);
      if (!selectedGroup) {
        setGroup(null);
        return;
      }
      const groupData = {
        uuid: selectedGroup?.uuid,
        name: selectedGroup?.name,
        profileImageUrl: selectedGroup?.profileImageKey || null,
      };
      setGroup(groupData);
    }
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
          thirdPartyAuth();
          setIsModalOpen(false);
        }
        setIsModalOpen(false);
      });
  }, [path, isModalOpen]);
  const thirdPartycode = localStorage.getItem('thirdPartycode');
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('groupsAccessToken'),
  );
  useEffect(() => {
    (async () => {
      if (thirdPartycode) {
        const accessToken = await getGroupsToken(thirdPartycode);
        if (accessToken) {
          localStorage.setItem('groupsAccessToken', accessToken);
          setAccessToken(accessToken);
          localStorage.removeItem('thirdPartycode');
        }
      }
    })();
  }, [thirdPartycode]);

  useEffect(() => {
    (async () => {
      if (!accessToken) return;
      const group = await getUserInfo(accessToken);
      if (!group) {
        console.log(`User do not belong to any group`);
        //TODO: handle if user do not belong to any group
        return;
      }
      setMyGroups(group);
    })();
  }, [accessToken]);
  return (
    <div className="relative mt-2">
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <NavArrowRightIcon className="w-5 rotate-90 stroke-text" />
      </div>

      <select
        value={group?.uuid ?? ''}
        onChange={handleAccountChange}
        className={`w-full appearance-none rounded-[10px] bg-greyLight px-4 py-3.5 ${
          group ? 'text-primary' : 'text-greyDark'
        } focus:border-primary focus:outline-none`}
      >
        <option value="">{t('write.writeAsMyself')}</option>
        {myGroups.length > 0 &&
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
            {t(`group.loginGroupsClient`)}
          </p>
        </Button>
      ) : null}
    </div>
  );
};

export default SelectAccountArea;
