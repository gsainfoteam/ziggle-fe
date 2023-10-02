'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import ShowcaseButton from './ShowcaseButton';
import ShowcaseModal from './ShowcaseModal';

interface ZaboShowcaseProps {
  srcs: string[];
  alt: string;
}

const ZaboShowcase = ({ srcs, alt }: ZaboShowcaseProps) => {
  const [show, setShow] = useState(false);
  if (srcs.length === 0) return null;
  return (
    <div className="w-full h-96 bg-primary overflow-y-hidden relative">
      <Image
        src={srcs[0]}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className={
          'relative transition-transform hover:-translate-y-5 top-36 left-1/2 -translate-x-1/2 ' +
          'w-6/12 h-auto rounded-xl border-4 border-white cursor-pointer'
        }
        onClick={() => setShow(true)}
      />
      <ShowcaseButton onShow={() => setShow(true)} />
      {show &&
        createPortal(
          <ShowcaseModal onHide={() => setShow(false)} srcs={srcs} alt={alt} />,
          document.body,
        )}
    </div>
  );
};

export default ZaboShowcase;
