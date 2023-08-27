import DOMPurify from "dompurify";
import Text from "src/atoms/text/Text";
import Font from "src/styles/font";
import { MOBILE_BREAKPOINT } from "src/types/types";
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    p {
      font-size: 1rem;
    }

    h1 {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.25rem;
    }
    h3 {
      font-size: 1.125rem;
    }
  }
`;

const NoticeContent = ({ content }: NoticeContentProps) => {
  // DOMPurify를 이용한 XSS 방지
  const cleanedContent = DOMPurify.sanitize(content);

  return (
    <ContentShower
      font={Font.Regular}
      dangerouslySetInnerHTML={{ __html: cleanedContent }}
    ></ContentShower>
  );
};

export default NoticeContent;
