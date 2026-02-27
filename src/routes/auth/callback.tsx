import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/callback')({
  component: () => <div>Hello "/auth/callback"!</div>,
});
