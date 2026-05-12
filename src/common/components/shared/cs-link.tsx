import { useUser } from '@/features/auth';

export const CSLink = ({
  children,
  className,
  onClick,
}: React.PropsWithChildren<{ className?: string; onClick?: () => void }>) => {
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
      onClick={onClick}
    >
      {children}
    </a>
  );
};
