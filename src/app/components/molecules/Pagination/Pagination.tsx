'use client';

import Link from 'next/link';
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback, useEffect } from 'react';

import ArrowRightFilledIcon from '@/assets/icons/arrow-right-filled.svg';

import Button from '../../atoms/Button';

interface PaginationProps {
  pages: number;
  page: number;
}

const Pagination = ({ pages, page }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const generateLink = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  useEffect(() => {
    if (page < 0 || Number.isNaN(page)) replace(generateLink(0));

    if (page >= pages) replace(generateLink(Math.max(pages - 1, 0)));
  }, [generateLink, page, pages, replace]);

  if (pages === 0) return null;

  return (
    <div className="flex items-center gap-2 md:gap-2.5">
      {page !== 0 ? (
        <Button animated>
          <Link href={generateLink(page - 1)}>
            <ArrowRightFilledIcon className="w-7 rotate-180 fill-primary md:w-8" />
          </Link>
        </Button>
      ) : (
        <Button disabled>
          <ArrowRightFilledIcon className="w-7 rotate-180 md:w-8" />
        </Button>
      )}
      <div className="w-2 shrink-0" />
      {[...Array(pages)].map((_, index) => (
        <Link key={index} href={generateLink(index)}>
          <Button
            className={[
              'h-7 w-7 shrink-0 rounded-lg font-medium md:h-8 md:w-8 md:text-xl',
              index === page
                ? 'bg-primary text-white'
                : 'bg-white text-primary',
            ].join(' ')}
          >
            {index + 1}
          </Button>
        </Link>
      ))}
      <div className="w-2 shrink-0" />
      {page + 1 !== pages ? (
        <Button animated>
          <Link href={generateLink(page + 1)}>
            <ArrowRightFilledIcon className="w-7 fill-primary md:w-8" />
          </Link>
        </Button>
      ) : (
        <Button disabled>
          <ArrowRightFilledIcon className="w-7 md:w-8" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
