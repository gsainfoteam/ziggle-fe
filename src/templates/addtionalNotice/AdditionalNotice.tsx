import Button, { ButtonVariant } from "src/atoms/button/Button";
import Checkbox from "src/atoms/inputs/checkbox/Checkbox";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

const AdditionalNotice = () => {
  return (
    <Button width={"70%"} variant={ButtonVariant.outlined}>
      <div style={{ justifyContent: "left", display: "flex" }}>
        <Text font={Font.Bold} size="1.2rem" color={colorSet.primary}>
          + 추가공지
        </Text>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Checkbox />
        <Text font={Font.Medium} size="0.9rem" color={colorSet.text}>
          마감일 변경하기
        </Text>
        <Text font={Font.Medium} size="0.9rem" color={colorSet.primary}>
          2018.02.03.
        </Text>
        <Text font={Font.Medium} size="0.9rem" color={colorSet.text}>
          00:00:00
        </Text>
      </div>
      <div style={{ justifyContent: "left", display: "flex" }}>
        <Text font={Font.Regular} size="0.9rem" color={colorSet.placeholder}>
          여기에 추가 공지를 입력하세요
        </Text>
      </div>
      <Checkbox label="리마인드 설정한 사람들에게만 알림 보내기" />
      <Checkbox label="모든 사람들에게 알림 보내기" />
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Button
          width={"133px"}
          color={colorSet.secondaryText}
          variant={ButtonVariant.contained}
        >
          <Text font={Font.Medium}>취소하기</Text>
        </Button>
        <Button
          width={"133px"}
          color={colorSet.primary}
          variant={ButtonVariant.contained}
        >
          <Text font={Font.Medium}>제출하기</Text>
        </Button>
      </div>
    </Button>
  );
};
export default AdditionalNotice;
