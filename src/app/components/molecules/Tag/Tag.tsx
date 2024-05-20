import Link from 'next/link';

import { PropsWithLng } from '@/app/i18next';

interface TagProps {
  name: string;
}

const Tag = ({ lng, name }: PropsWithLng<TagProps>) => {
  return (
    <Link
      href={`${lng}/section/${name}`}
      className={
        'rounded-[5px] bg-secondary px-[10px] py-[5px] text-lg text-primary dark:bg-dark_secondary'
      }
    >
      #{name}
    </Link>
  );
};

export default Tag;
