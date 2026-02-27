import { createFileRoute } from '@tanstack/react-router';

import { WriteLayout } from '@/features/write';

export const Route = createFileRoute('/_write')({
  component: WriteLayout,
});
