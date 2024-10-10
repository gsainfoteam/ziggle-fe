import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { auth } from '@/api/auth/auth';

interface CSLinkProps extends PropsWithChildren {
  className?: string;
}

const CSLink = async ({ children, className }: CSLinkProps) => {
  const session = await auth();

  return (
    <Link
      href={`https://cs.gistory.me/?service=Ziggle${
        session ? `&email=${session.user.email}` : ''
      }`}
      className={className}
    >
      {children}
    </Link>
  );
};

export default CSLink;
