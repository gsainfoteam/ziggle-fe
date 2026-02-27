import { createFileRoute } from '@tanstack/react-router';

import { MypageFrame } from '@/features/auth';

export const Route = createFileRoute('/_layout/mypage')({
  component: MypageFrame,
});
