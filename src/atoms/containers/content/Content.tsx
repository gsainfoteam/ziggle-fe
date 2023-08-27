import defaults from "src/styles/defaults";
import { MOBILE_BREAKPOINT } from "src/types/types";
import styled from "styled-components";

const CONTENT_AREA_DESKTOP = `calc(100% - 2 * ${defaults.pageSideGap})`;
const CONTENT_AREA_MOBILE = "calc(100% - 40px)";

export interface ContentAreaProps {
  width?: string;
}

const Content = styled.div<ContentAreaProps>`
  width: ${({ width }) => (width ? width : CONTENT_AREA_DESKTOP)};
  max-width: ${({ width }) => width || "1240px"};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: ${({ width }) => (width ? width : CONTENT_AREA_MOBILE)};
  }
`;

export default Content;
