export const CSLink = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  // TODO: get email from user
  const email = '';

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
