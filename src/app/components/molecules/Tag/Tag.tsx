import Link from 'next/link';

interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return (
    <Link
      href={`/section/${name}`}
      className={
        'rounded-[5px] bg-secondary px-[10px] py-[5px] text-lg text-primary'
      }
    >
      #{name}
    </Link>
  );
};

export default Tag;
