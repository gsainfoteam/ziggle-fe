import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Dialog } from '@/common/components';
import { cn } from '@/common/utils';

import { useConsentForm } from '../../viewmodels';

interface ConsentFrameProps {
  onTermsClick: (type: 'privacy' | 'tos', version: string) => void;
}

export function ConsentFrame({ onTermsClick }: ConsentFrameProps) {
  const { t } = useTranslation('auth');
  const {
    register,
    privacy,
    tos,
    allChecked,
    handleAllChange,
    onSubmit,
    isPending,
    isValid,
    getTermsVersion,
  } = useConsentForm();

  const handleTermsClick = (type: 'privacy' | 'tos') => {
    const version = getTermsVersion(type);
    if (!version) return;
    onTermsClick(type, version);
  };

  return (
    <form onSubmit={onSubmit} className="contents">
      <Dialog.Header>
        <Dialog.Title>{t('consent.title')}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body className="flex flex-col gap-3">
        <label
          className={cn(
            'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors',
            allChecked
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-greyBorder',
          )}
        >
          <Checkbox
            checked={allChecked}
            onChange={(e) => handleAllChange(e.target.checked)}
          />
          <span className="text-base font-semibold">
            {t('consent.agreeAll')}
          </span>
        </label>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 rounded-lg px-1 py-1">
            <label className="flex flex-1 cursor-pointer items-center gap-3">
              <Checkbox {...register('privacy')} checked={privacy} />
              <span className="text-sm font-medium">
                {t('consent.privacyPolicy')}
                <span className="text-primary ml-1">*</span>
              </span>
            </label>
            <button
              type="button"
              onClick={() => handleTermsClick('privacy')}
              className="flex items-center"
              aria-label={t('consent.viewPrivacyPolicy')}
            >
              <ChevronRight size={18} className="text-greyDark" />
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-lg px-1 py-1">
            <label className="flex flex-1 cursor-pointer items-center gap-3">
              <Checkbox {...register('tos')} checked={tos} />
              <span className="text-sm font-medium">
                {t('consent.termsOfService')}
                <span className="text-primary ml-1">*</span>
              </span>
            </label>
            <button
              type="button"
              onClick={() => handleTermsClick('tos')}
              className="flex items-center"
              aria-label={t('consent.viewTermsOfService')}
            >
              <ChevronRight size={18} className="text-greyDark" />
            </button>
          </div>
        </div>
      </Dialog.Body>

      <Dialog.Footer>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isPending}
          className="w-full"
        >
          {t('consent.next')}
        </Button>
      </Dialog.Footer>
    </form>
  );
}
