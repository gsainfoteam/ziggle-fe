import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/consent')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/auth/consent"!</div>;
}
