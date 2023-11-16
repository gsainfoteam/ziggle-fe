'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NoticeKind } from '@/api/notice/notice';

import Button from '../../components/atoms/Button';
import Chip from '../../components/molecules/Chip';

const SearchTagSelect = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [selected, onChange] = useState<NoticeKind[]>(
    (searchParams.get('tags')?.split(',').filter(Boolean) as NoticeKind[]) ??
      [],
  );
  const handleCheckboxChange = (type: NoticeKind) => {
    onChange((prev) =>
      prev.includes(type)
        ? prev.filter((prevType) => prevType !== type)
        : [...prev, type],
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('tags');
    if (selected.length) {
      params.append('tags', selected.join(','));
    }
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams, selected]);

  return (
    <div className="flex gap-2 md:gap-2 justify-between md:justify-start px-[2px]">
      <input type="hidden" name="tags" value={selected} />
      {...Object.values(NoticeKind).map((kind) => (
        <Button key={kind} onClick={() => handleCheckboxChange(kind)}>
          <Chip variant={selected.includes(kind) ? 'contained' : 'outlined'}>
            {'🎯 모집'}
          </Chip>
        </Button>
      ))}
    </div>
  );
};

export default SearchTagSelect;
