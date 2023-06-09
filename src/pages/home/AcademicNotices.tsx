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
import { dummyAcademicNotices } from "../../templates/academicTable/AcademicTable.stories";

const AcademicNotices = () => {
  return (
    <Content>
      <Flex
        gap={"24px"}
        style={{
          padding: "20px 0px",
        }}
      >
        <Text
          size="2rem"
          color={colorSet.text}
          font={Font.Bold}
          style={{ margin: 0 }}
        >
          📰 학사공지
        </Text>
        <Button variant={ButtonVariant.contained}>
          <Flex gap={"16px"}>
            <Text size={"0.875rem"} font={Font.Medium}>
              학사공지 게시판 바로가기
            </Text>
            <Icon.ArrowLeftWhite width={"16px"} />
          </Flex>
        </Button>
      </Flex>

      <Spacer height={"24px"} />

      <AcademicTable type={AcademicTableType.Title} />
      {dummyAcademicNotices.map((notice) => (
        <AcademicTable
          key={notice.title}
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
