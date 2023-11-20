'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { PropsWithLng } from '@/app/i18next';

import ShowcaseButton from './ShowcaseButton';
import ShowcaseModal from './ShowcaseModal';

interface ZaboShowcaseProps {
  srcs: string[];
  alt: string;
}

const ZaboShowcase = ({ srcs, alt, lng }: ZaboShowcaseProps & PropsWithLng) => {
  const [show, setShow] = useState(false);
  if (srcs.length === 0) return null;
  return (
    <div className="relative h-96 w-full overflow-y-hidden bg-primary">
      <Image
        src={srcs[0]}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className={
          'relative left-1/2 top-36 -translate-x-1/2 transition-transform hover:-translate-y-5 ' +
          'h-auto w-6/12 cursor-pointer rounded-xl border-4 border-white'
        }
        onClick={() => setShow(true)}
      />
      <ShowcaseButton onShow={() => setShow(true)} lng={lng} />
      {show &&
        createPortal(
          <ShowcaseModal
            onHide={() => setShow(false)}
            srcs={srcs}
            alt={alt}
            lng={lng}
          />,
          document.body,
        )}
    </div>
  );
};

export default ZaboShowcase;
