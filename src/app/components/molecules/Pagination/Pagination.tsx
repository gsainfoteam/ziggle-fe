import Link from 'next/link';
import { redirect } from 'next/navigation';

import ArrowRightFilledIcon from '@/assets/icons/arrow-right-filled.svg';

import Button from '../../atoms/Button';

interface PaginationProps {
  pages: number;
  page: number;
}

const Pagination = ({ pages, page }: PaginationProps) => {
  if (page < 0) redirect('?page=0');
  if (page >= pages) redirect(`?page=${pages - 1}`);
  return (
    <div className="flex items-center gap-2 md:gap-2.5">
      {page !== 0 ? (
        <Button animated>
          <Link href={{ query: { page: page - 1 } }}>
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
        <Link key={index} href={{ query: { page: index } }}>
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
          <Link href={{ query: { page: page + 1 } }}>
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
