import { init } from '@amplitude/analytics-browser';

if (import.meta.env.VITE_AMPLITUDE_API_KEY) {
  init(import.meta.env.VITE_AMPLITUDE_API_KEY);
}
