import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Button, confirmDialog } from '@/common/components';

import {
  getAdminErrorStatus,
  isValidUserUuid,
  useAdminAccess,
  useSetAdmin,
} from '../../viewmodels';

export function AdminPermissionsFrame() {
  const { t } = useTranslation('admin');
  const { user } = useAdminAccess();
  const [uuid, setUuid] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const mutation = useSetAdmin();
  const trimmedUuid = uuid.trim();
  const valid = isValidUserUuid(trimmedUuid);
  const status = getAdminErrorStatus(mutation.error);
  const busy = confirming || mutation.isPending;
  const submit = async () => {
    if (!valid || busy) return;
    const target = trimmedUuid;
    const permission = isAdmin;
    setConfirming(true);
    try {
      const confirmed = await confirmDialog({
        title: permission ? t('permissions.grant') : t('permissions.revoke'),
        description:
          !permission && target.toLowerCase() === user?.uuid.toLowerCase()
            ? t('permissions.confirm_self')
            : t('permissions.confirm', { uuid: target }),
        destructive: !permission,
      });
      if (confirmed)
        await mutation.mutateAsync({ uuid: target, isAdmin: permission });
    } catch {
      /* The mutation error is displayed below. */
    } finally {
      setConfirming(false);
    }
  };
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t('permissions.title')}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t('permissions.description')}
        </p>
      </div>
      <form
        className="border-border bg-background space-y-6 rounded-2xl border p-5 md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="admin-user-uuid" className="text-sm font-semibold">
            {t('permissions.uuid')}
          </label>
          <input
            id="admin-user-uuid"
            aria-describedby="admin-uuid-hint"
            aria-invalid={!!trimmedUuid && !valid}
            required
            disabled={busy}
            value={uuid}
            onChange={(event) => {
              setUuid(event.target.value);
              mutation.reset();
            }}
            placeholder="123e4567-e89b-12d3-a456-426614174000"
            className="border-border focus:border-primary w-full rounded-xl border px-4 py-3 text-sm outline-none"
          />
          <p id="admin-uuid-hint" className="text-muted-foreground text-xs">
            {trimmedUuid && !valid
              ? t('permissions.invalid_uuid')
              : t('permissions.uuid_hint')}
          </p>
        </div>
        <fieldset disabled={busy} className="space-y-3">
          <legend className="mb-3 text-sm font-semibold">
            {t('permissions.action')}
          </legend>
          {[true, false].map((value) => (
            <label
              key={String(value)}
              className="border-border flex cursor-pointer items-center gap-3 rounded-xl border p-4"
            >
              <input
                type="radio"
                name="admin-permission"
                checked={isAdmin === value}
                onChange={() => {
                  setIsAdmin(value);
                  mutation.reset();
                }}
              />
              <span className="text-sm">
                {value ? t('permissions.grant') : t('permissions.revoke')}
              </span>
            </label>
          ))}
        </fieldset>
        <p className="bg-muted text-muted-foreground rounded-xl p-4 text-sm">
          {t('permissions.notice')}
        </p>
        {mutation.isError && (
          <p role="alert" className="text-sm text-red-500">
            {status === 404
              ? t('permissions.not_found')
              : status === 403
                ? t('permissions.forbidden')
                : status === 401
                  ? t('permissions.unauthorized')
                  : status === 400
                    ? t('permissions.invalid_uuid')
                    : t('permissions.error')}
          </p>
        )}
        {mutation.data && (
          <div
            role="status"
            className="bg-secondary space-y-2 rounded-xl p-4 text-sm"
          >
            <p className="text-primary font-semibold">
              {t('permissions.success')}
            </p>
            <p>
              {mutation.data.name} · {mutation.data.email}
            </p>
            <p className="break-all">{mutation.data.uuid}</p>
            <p>
              {mutation.data.isAdmin
                ? t('permissions.admin')
                : t('permissions.user')}
            </p>
          </div>
        )}
        <Button type="submit" variant="contained" disabled={!valid || busy}>
          {busy ? t('permissions.saving') : t('permissions.save')}
        </Button>
      </form>
    </div>
  );
}
