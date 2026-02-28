import { Link, useSearch } from '@tanstack/react-router';

import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react';
import { Button } from '@/common/components';

interface PaginationProps {
  items: number;
  itemsPerPage: number;
  page: number;
}

const Pagination = ({
  items,
  itemsPerPage,
  page: rawPage,
}: PaginationProps) => {
  const search = useSearch({ strict: false });
  const page = Number.isNaN(rawPage) ? 0 : rawPage;
  const pages = Math.ceil(items / itemsPerPage);

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
            <Link to="." search={{ ...search, page: page - 1 }}>
              <ArrowRightIcon className="stroke-text dark:stroke-dark_white w-6 rotate-180 fill-none md:w-7" />
            </Link>
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="stroke-grey dark:stroke-dark_grey w-6 rotate-180 fill-none md:w-7" />
          </Button>
        )}
        {page + 1 !== pages ? (
          <Button animated>
            <Link to="." search={{ ...search, page: page + 1 }}>
              <ArrowRightIcon className="stroke-text dark:stroke-dark_white w-6 fill-none md:w-7" />
            </Link>
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="stroke-grey dark:stroke-dark_grey w-6 md:w-7" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
