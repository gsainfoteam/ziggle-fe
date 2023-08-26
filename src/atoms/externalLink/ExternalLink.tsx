import Font from "src/styles/font";
import styled from "styled-components";

import Text from "../text/Text";

const Link = styled(Text)`
  text-decoration: none;
`;

const ExternalLink = ({
  href,
  children,
  onClick,
}: React.PropsWithChildren<{ href: string; onClick?: () => void }>) => (
  <Link
    as="a"
    href={href}
    target="_blank"
    rel="noreferrer"
    font={Font.Regular}
    size="0.9rem"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default ExternalLink;
