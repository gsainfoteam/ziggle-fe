import Link from 'next/link';

const ExternalLink = ({ ...props }: React.ComponentProps<typeof Link>) => (
  <Link {...props} target="_blank" rel="noopener noreferrer" />
);

export default ExternalLink;
