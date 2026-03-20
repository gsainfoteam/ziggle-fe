import { useTranslation } from 'react-i18next';
import { overlay } from 'overlay-kit';

import {
  Button,
  LogClick,
  WithdrawalErrorModal,
  WithdrawalModal,
  WithdrawalSuccessModal,
} from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { MypageBox } from './mypage-box';

import { useLogout, useWithdraw } from '../../viewmodels';

export default function MypageActions() {
  const { t } = useTranslation('auth');

  const { mutate: logout } = useLogout();
  const { mutateAsync: withdraw } = useWithdraw();

  const handleSignOut = () => {
    logout({});
  };

  const handleWithdrawal = () => {
    overlay.open(({ isOpen, close }) => (
      <WithdrawalModal
        isOpen={isOpen}
        close={close}
        onWithdraw={async () => {
          await withdraw({});
        }}
        onSuccess={async () => {
          overlay.open(({ isOpen, close }) => (
            <WithdrawalSuccessModal
              isOpen={isOpen}
              close={close}
              onCloseComplete={() => logout({})}
            />
          ));
        }}
        onFailure={async () => {
          overlay.open(({ isOpen, close }) => (
            <WithdrawalErrorModal
              isOpen={isOpen}
              close={close}
            />
          ));
        }}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleSignOut}>
        <LogClick eventName={LogEvents.myClickLogout}>
          <MypageBox>
            <div className="text-greyDark dark:text-dark_white flex self-stretch">
              {t('mypage.logout')}
            </div>
          </MypageBox>
        </LogClick>
      </Button>

      <Button onClick={handleWithdrawal}>
        <LogClick eventName={LogEvents.myClickUnregister}>
          <MypageBox>
            <div className="text-greyDark dark:text-dark_white flex self-stretch">
              {t('mypage.quit')}
            </div>
          </MypageBox>
        </LogClick>
      </Button>

    </div>
  );
}