import { useTranslation } from 'react-i18next';
import { overlay } from 'overlay-kit';

import { Button, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { MypageBox } from './mypage-box';

import { useLogout, useWithdraw } from '../../viewmodels';

import WithdrawalModal from '@/common/components/shared/modals/Withdrawal';
import WithdrawalSuccessModal from '@/common/components/shared/modals/WithdrawalSuccess';
import WithdrawalErrorModal from '@/common/components/shared/modals/WithdrawalError';

export default function MypageActions() {
  const { t, i18n } = useTranslation('auth');
  const modalLanguage = i18n.language.startsWith('en') ? 'en' : 'ko';

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
              lng={modalLanguage}
              onCloseComplete={() => logout({})}
            />
          ));
        }}
        onFailure={async () => {
          overlay.open(({ isOpen, close }) => (
            <WithdrawalErrorModal
              isOpen={isOpen}
              close={close}
              lng={modalLanguage}
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