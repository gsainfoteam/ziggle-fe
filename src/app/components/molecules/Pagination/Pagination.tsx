'use client';

import Link from 'next/link';
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback, useEffect } from 'react';

import ArrowRightIcon from '@/assets/icons/arrow-right.svg';

import Button from '../../atoms/Button';

interface PaginationProps {
  items: number;
  itemsPerPage: number;
  page: number;
}

const Pagination = ({ items, itemsPerPage, page }: PaginationProps) => {
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

  const pages = Math.ceil(items / itemsPerPage);

  useEffect(() => {
    if (page < 0 || Number.isNaN(page)) replace(generateLink(0));

    if (page >= pages) replace(generateLink(Math.max(pages - 1, 0)));
  }, [generateLink, page, pages, replace]);

  if (pages === 0) return null;

  const startItem = page * itemsPerPage + 1;
  const endItem = Math.min((page + 1) * itemsPerPage, items);

  return (
    <div className="flex items-center">
      <div className="flex gap-1 p-2">
        <div className="text-xl font-semibold">{`${startItem}~${endItem}`}</div>
        <div className="text-xl">of</div>
        <div className="text-xl font-semibold">{items}</div>
      </div>
      <div className="flex gap-1">
        {page !== 0 ? (
          <Button animated>
            <Link href={generateLink(page - 1)}>
              <ArrowRightIcon className="w-6 rotate-180 fill-none stroke-text dark:stroke-dark_white md:w-7" />
            </Link>
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="w-6 rotate-180 fill-none stroke-grey dark:stroke-dark_grey md:w-7" />
          </Button>
        )}
        {page + 1 !== pages ? (
          <Button animated>
            <Link href={generateLink(page + 1)}>
              <ArrowRightIcon className="w-6 fill-none stroke-text dark:stroke-dark_white md:w-7" />
            </Link>
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="w-6 fill-none stroke-grey dark:stroke-dark_grey md:w-7" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
