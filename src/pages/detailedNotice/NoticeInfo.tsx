import { useState } from "react";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import CustomCheckbox from "src/molecules/checkboxWithLabel/CheckboxWithLabel";
import Chip, { ChipVariant } from "src/molecules/chip/Chip";
import colorSet from "src/styles/colorSet";
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
  const dDayString = deadline ? dDayFormated(deadline) : "";
  const isPast = deadline ? dDayString === "기한 지남" : false;

  const [isRemindChecked, setIsRemindChecked] = useState(isReminded);

  return (
    <>
      {/* 마감일 */}
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
              <Chip
                label={dDayString}
                variant={
                  isPast ? ChipVariant.deselected : ChipVariant.contained
                }
              />
              <Spacer width={"10px"} />
              {
                // 마감일이 지나지 않았을 때만 표시
                !isPast && (
                  <div style={{ transform: "translateY(2px)" }}>
                    <CustomCheckbox
                      id="remind"
                      checked={isRemindChecked}
                      onChange={setIsRemindChecked}
                    >
                      <Text
                        font={Font.Medium}
                        size={"1.125rem"}
                        color={
                          isRemindChecked
                            ? colorSet.primary
                            : colorSet.secondaryText
                        }
                      >
                        {isRemindChecked ? (
                          "리마인드 되었습니다!"
                        ) : (
                          <u>리마인드할까요?</u>
                        )}
                      </Text>
                    </CustomCheckbox>
                  </div>
                )
              }
            </Flex>

            {isRemindChecked && (
              <>
                <Spacer height={"5px"} />
                <Text
                  font={Font.Regular}
                  size={"1rem"}
                  color={colorSet.secondaryText}
                >
                  게시물이 리마인드되었습니다!&nbsp;
                  <u>마감일 당일, 1일, 3일 전에</u>&nbsp;알려드릴게요!
                </Text>
              </>
            )}

            <Spacer height={"15px"} />
          </>
        )
      }

      {/* 제목 */}
      <Text font={Font.Bold} size={"2.5rem"}>
        {title}
      </Text>

      <Spacer height={"5px"} />

      {/* 글쓴이, 작성일, 조회수 */}
      <Flex alignItems="center">
        <Text font={Font.Medium} size={"1.25rem"}>
          글쓴이&nbsp;
        </Text>
        <Text font={Font.Bold} size={"1.25rem"}>
          {author}
        </Text>
        <Spacer width={"15px"} />
        <div
          style={{ height: "28px", borderLeft: `2px solid ${colorSet.text}` }}
        ></div>
        <Spacer width={"15px"} />
        <Text
          font={Font.Regular}
          size={"1.25rem"}
          color={colorSet.secondaryText}
        >
          작성일&nbsp;
        </Text>
        <Text
          font={Font.Regular}
          size={"1.25rem"}
          color={colorSet.secondaryText}
        >
          {dateCreated}&nbsp;·&nbsp;
        </Text>
        <Text
          font={Font.Medium}
          size={"1.25rem"}
          color={colorSet.secondaryText}
        >
          조회수&nbsp;
        </Text>
        <Text
          font={Font.Medium}
          size={"1.25rem"}
          color={colorSet.secondaryText}
        >
          {viewCount}
        </Text>
      </Flex>

      <Spacer height={"15px"} />

      {/* 태그 */}
      <Flex alignItems="center" gap={"10px"}>
        {tags.map((tag, index) => (
          <Chip key={index} label={"#" + tag} font={Font.Regular} />
        ))}
      </Flex>
    </>
  );
};

export default NoticeInfo;
