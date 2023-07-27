import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import Chip from "src/molecules/chip/Chip";
import Font from "src/styles/font";
import dDayFormated from "src/utils/calculateDDay";
import getDayOfWeek from "src/utils/getDay";

export interface NoticeInfoProps {
  deadline?: string;
  title: string;
  isReminded: boolean;
  author: string;
  dateCreated: string;
  viewCount: number;
  tags: string[];
}

const NoticeInfo = ({
  deadline,
  title,
  isReminded,
  author,
  dateCreated,
  viewCount,
  tags,
}: NoticeInfoProps) => {
  return (
    <>
      {
        // 마감일이 정의되어 있을 때만 표시
        deadline && (
          <>
            <Flex alignItems="center">
              <Text font={Font.Medium} size={"1.5rem"}>
                마감일&nbsp;
              </Text>
              <Text font={Font.Bold} size={"1.5rem"}>
                {deadline} ({getDayOfWeek(deadline)})
              </Text>
              <Spacer width={"10px"} />
              <Chip label={dDayFormated(deadline)} />
            </Flex>
          </>
        )
      }
    </>
  );
};

export default NoticeInfo;
