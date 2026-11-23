import type { QueryClient } from '@tanstack/react-query';

import { account } from '@/common/lib';

import { useAuthPrompt } from './stores';

// 로그아웃뿐 아니라 refresh 실패로 세션이 끝날 때도 이전 사용자의 동의 상태와 캐시가 남지 않게, store의 status 변화에서 한 번에 정리한다.
// 토큰만 바뀐 갱신에서 loader를 다시 돌리지 않도록 status만 비교한다.
export const syncAccountSession = ({
  queryClient,
  onStatusChange,
}: {
  queryClient: QueryClient;
  onStatusChange: () => void;
}) =>
  account.store.subscribe((state, prev) => {
    if (state.status === prev.status) return;
    if (prev.status === 'authenticated') {
      useAuthPrompt.getState().setRequiredConsents(undefined);
      queryClient.clear();
    }
    onStatusChange();
  });
