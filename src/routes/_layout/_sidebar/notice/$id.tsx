import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_sidebar/notice/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/_sidebar/notice/$id"!</div>;
}
