import { createFileRoute } from '@tanstack/react-router';

import { AdminLayout } from '@/features/admin';

export const Route = createFileRoute('/admin')({ component: AdminLayout });
