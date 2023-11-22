'use client';

import { useEffect, useRef } from 'react';

interface ScrollToProps {}

const ScrollTo = ({}: ScrollToProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <div ref={divRef}></div>;
};

export default ScrollTo;
