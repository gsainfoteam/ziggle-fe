import Text from "src/atoms/text/Text";
import Font from "src/styles/font";
import styled from "styled-components";

export interface NoticeContentProps {
  content: string;
}

const ContentShower = styled(Text)`
  line-height: 1.5;

  p {
    font-size: 1.125rem;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
`;

const NoticeContent = ({ content }: NoticeContentProps) => {
  const parser = new DOMParser();
  const Doc = parser.parseFromString(content, "text/html");

  return (
    <ContentShower
      font={Font.Regular}
      dangerouslySetInnerHTML={{ __html: Doc.body.innerHTML }}
    ></ContentShower>
  );
};

export default NoticeContent;
