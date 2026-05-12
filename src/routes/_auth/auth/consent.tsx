import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/auth/consent')({
  component: RouteComponent,
});

// TODO: ZGF-58
function RouteComponent() {
  return <div>Hello "/auth/consent"!</div>;
}
