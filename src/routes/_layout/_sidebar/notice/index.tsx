import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_sidebar/notice/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_sidebar/notice/"!</div>;
}
