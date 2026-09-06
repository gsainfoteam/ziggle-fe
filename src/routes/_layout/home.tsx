import { createFileRoute } from '@tanstack/react-router';

import { HomeFrame } from '@/features/notice';

export const Route = createFileRoute('/_layout/home')({
  component: HomeFrame,
});
