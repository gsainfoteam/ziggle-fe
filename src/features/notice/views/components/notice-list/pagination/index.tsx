import { useTranslation } from 'react-i18next';

import { ArrowRightIcon } from '@phosphor-icons/react';
import { Button } from '@/common/components';

interface PaginationProps {
  items: number;
  itemsPerPage: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  items,
  itemsPerPage,
  page: rawPage,
  onPageChange,
}: PaginationProps) => {
  const { t } = useTranslation('notice');
  const page = Number.isNaN(rawPage) ? 0 : rawPage;
  const pages = Math.ceil(items / itemsPerPage);

  if (pages === 0) return null;

  const startItem = page * itemsPerPage + 1;
  const endItem = Math.min((page + 1) * itemsPerPage, items);

  return (
    <div className="flex items-center">
      <div className="flex gap-1 p-2">
        <div className="text-xl font-semibold">{`${startItem}~${endItem}`}</div>
        <div className="text-xl">{t('list.pagination.of')}</div>
        <div className="text-xl font-semibold">{items}</div>
      </div>
      <div className="flex gap-1">
        {page !== 0 ? (
          <Button animated onClick={() => onPageChange(page - 1)}>
            <ArrowRightIcon className="text-foreground size-6 rotate-180 md:size-7" />
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="text-muted-foreground size-6 rotate-180 md:size-7" />
          </Button>
        )}
        {page + 1 !== pages ? (
          <Button animated onClick={() => onPageChange(page + 1)}>
            <ArrowRightIcon className="text-foreground size-6 md:size-7" />
          </Button>
        ) : (
          <Button disabled>
            <ArrowRightIcon className="text-muted-foreground size-6 md:size-7" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
