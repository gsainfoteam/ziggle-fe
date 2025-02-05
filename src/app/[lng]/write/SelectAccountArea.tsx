import { PropsWithT } from '@/app/i18next';
import NavArrowRightIcon from '@/assets/icons/nav-arrow-right.svg';

import { EditorAction } from './noticeEditorActions';

interface SelectAccountAreaProps {
  account: string | null;
  setAccount: (account: string | null) => void;
}

// 임시 데이터
const DUMMY_ACCOUNTS = [
  { id: 'club_account', name: '동아리 계정' },
  { id: 'department_account', name: '학과 계정' },
  { id: 'council_account', name: '학생회 계정' },
];

const SelectAccountArea = ({
  account,
  setAccount,
  t,
}: PropsWithT<SelectAccountAreaProps>) => {
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

        {DUMMY_ACCOUNTS.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectAccountArea;
