import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button, LogClick } from '@/common/components';
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

  const handleWithdrawal = async () => {
    try {
      // TODO: use custom overlay
      // t('mypage.withdrawal.confirm.okBtn')
      // t('mypage.withdrawal.confirm.cancelBtn')
      const result = confirm(
        t('mypage.withdrawal.confirm.title') +
          '\n\n' +
          t('mypage.withdrawal.confirm.text'),
      );
      if (result) {
        try {
          await withdraw({});
          toast.success(
            t('mypage.withdrawal.success.title') +
              '\n\n' +
              t('mypage.withdrawal.success.text'),
          );
          logout({});
        } catch {
          toast.error(
            t('mypage.withdrawal.error.title') +
              '\n\n' +
              t('mypage.withdrawal.error.text'),
          );
        }
      }
    } catch (err) {
      console.error('withdrawal flow error:', err);
    }
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
