import useIsMobile from "src/hooks/useIsMobile";
import { dummyAcademicNotices } from "src/mock/dummy-academic-notices";

import Button, { ButtonVariant } from "../../atoms/button/Button";
import Content from "../../atoms/containers/content/Content";
import Flex from "../../atoms/containers/flex/Flex";
import Icon from "../../atoms/icon/Icon";
import Spacer from "../../atoms/spacer/Spacer";
import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";
import Font from "../../styles/font";
import AcademicTable, {
  AcademicTableType,
} from "../../templates/academicTable/AcademicTable";

const AcademicNotices = () => {
  const isMobile = useIsMobile();

  const gistAcademicNoticeUrl =
    "https://www.gist.ac.kr/kr/html/sub05/050209.html";

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Content>
      <Flex
        gap={"24px"}
        style={{
          padding: "20px 0px",
        }}
        alignItems="center"
      >
        <Text
          size={isMobile ? "1.5rem" : "2.75rem"}
          color={colorSet.text}
          font={Font.Bold}
          style={{ margin: 0 }}
        >
          📰 학사공지
        </Text>
        <Button
          variant={ButtonVariant.contained}
          height={"40px"}
          onClick={() => {
            openInNewTab(gistAcademicNoticeUrl);
          }}
        >
          <Flex gap={isMobile ? "12px" : "16px"}>
            <Text size={isMobile ? "0.8125rem" : "0.875rem"} font={Font.Medium}>
              학사공지 게시판 바로가기
            </Text>
            <Icon.ArrowLeftWhite width={"16px"} />
          </Flex>
        </Button>
      </Flex>

      <Spacer height={"24px"} />

      <AcademicTable type={AcademicTableType.Title} />
      {dummyAcademicNotices.map((notice, index) => (
        <AcademicTable
          key={index}
          type={AcademicTableType.Default}
          title={notice.title}
          tags={notice.tags}
          deadline={notice.deadline}
          date={notice.date}
          link={notice.link}
        />
      ))}
    </Content>
  );
};

export default AcademicNotices;
