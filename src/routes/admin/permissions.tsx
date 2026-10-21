import { createFileRoute } from '@tanstack/react-router';

import { AdminPermissionsFrame } from '@/features/admin';

export const Route = createFileRoute('/admin/permissions')({
  component: AdminPermissionsFrame,
});
