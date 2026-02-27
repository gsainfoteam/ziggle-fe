import { init } from '@amplitude/analytics-browser';

if (process.env.VITE_AMPLITUDE_API_KEY) {
  init(process.env.VITE_AMPLITUDE_API_KEY);
}
