import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-required/mypage')({
  component: () => <div>Hello "/_auth-required/mypage"!</div>,
});
