import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useConsent } from './queries';
import { useAuthPrompt } from './stores';

const TERMS_INDEX_URL = 'https://terms.gistory.me/ziggle/index.json';

interface TermsIndex {
  service: 'ziggle';
  privacy: string;
  tos: string;
}

const createConsentSchema = (
  t: ReturnType<typeof useTranslation<'auth'>>['t'],
) =>
  z.object({
    privacy: z
      .boolean()
      .refine((v) => v === true, t('consent.errors.privacyRequired')),
    tos: z.boolean().refine((v) => v === true, t('consent.errors.tosRequired')),
  });

export type ConsentFormData = { privacy: boolean; tos: boolean };

export const useConsentForm = () => {
  const { t } = useTranslation('auth');
  const requiredConsents = useAuthPrompt((state) => state.requiredConsents);
  const [termsVersions, setTermsVersions] = useState<TermsIndex | null>(null);
  const { mutateAsync } = useConsent();

  useEffect(() => {
    fetch(TERMS_INDEX_URL)
      .then((res) => res.json())
      .then((data: TermsIndex) => setTermsVersions(data))
      .catch(() =>
        setTermsVersions({
          service: 'ziggle',
          privacy: '250302',
          tos: '250302',
        }),
      );
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { isValid, isLoading },
  } = useForm<ConsentFormData>({
    resolver: zodResolver(createConsentSchema(t)),
    defaultValues: { privacy: false, tos: false },
    mode: 'onChange',
  });

  const privacy = useWatch({ control, name: 'privacy' });
  const tos = useWatch({ control, name: 'tos' });
  const allChecked = privacy && tos;

  const handleAllChange = (checked: boolean) => {
    setValue('privacy', checked);
    setValue('tos', checked);
    trigger();
  };

  const getTermsVersion = (type: 'privacy' | 'tos') =>
    termsVersions?.[type] ?? null;

  const onSubmit = handleSubmit(() => mutateAsync({}).catch(() => {}));

  return {
    requiredConsents,
    register,
    privacy,
    tos,
    allChecked,
    handleAllChange,
    onSubmit,
    isLoading,
    isValid,
    getTermsVersion,
  };
};
