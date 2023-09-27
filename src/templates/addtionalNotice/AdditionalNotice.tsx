import Button, { ButtonVariant } from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

const AdditionalNotice = () => {
  return (
    <Button variant={ButtonVariant.outlined}>
      <Text font={Font.Bold} size="2rem" color={colorSet.primary}>+ 추가공지</Text>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
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
