import styled from "styled-components";

const CONTENT_AREA_DESKTOP = "75%";
const CONTENT_AREA_MOBILE = "calc(100% - 40px)";

export interface ContentAreaProps {
  width?: string;
}

const Content = styled.div<ContentAreaProps>`
  width: ${({ width }) => (width ? width : CONTENT_AREA_DESKTOP)};
  max-width: 1240px;

  @media screen and (max-width: 768px) {
    width: ${({ width }) => (width ? width : CONTENT_AREA_MOBILE)};
  }
`;

export default Content;
