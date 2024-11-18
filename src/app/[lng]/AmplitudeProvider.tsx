'use client';

import { init } from '@amplitude/analytics-browser';
import { ReactNode, useEffect } from 'react';

const AmplitudeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) return;

    init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
  }, []);

  return children;
};

export default AmplitudeProvider;
