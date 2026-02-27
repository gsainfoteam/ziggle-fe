import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

import ReactDOM from 'react-dom/client';

import { App } from './app';
import { routeTree } from './routeTree.gen';

export const queryClient = new QueryClient();
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
