import { useUser } from '@/features/auth';

export const CSLink = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const { data: user } = useUser();
  const email = user?.email;

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://cs.gistory.me/?service=Ziggle${
        email ? `&email=${email}` : ''
      }`}
      className={className}
    >
      {children}
    </a>
  );
};
