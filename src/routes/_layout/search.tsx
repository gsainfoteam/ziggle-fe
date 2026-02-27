import { createFileRoute } from '@tanstack/react-router';

import z from 'zod';

export const Route = createFileRoute('/_layout/search')({
  component: () => <div>Hello "/_layout/search"!</div>,
  validateSearch: z.object({ query: z.string().optional() }),
});
