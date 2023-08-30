import Button, { ButtonVariant } from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

interface NoticeWritingActionsProps {
  handleSubmit: () => void;
}

const NoticeWritingActions = ({ handleSubmit }: NoticeWritingActionsProps) => {
  const isMobile = useIsMobile();

  return (
    <Flex flexDirection={"column"} gap={"15px"} alignItems={"center"}>
      <Button onClick={handleSubmit} variant={ButtonVariant.contained}>
        <Text
          size={isMobile ? "0.875rem" : "1.125rem"}
          font={Font.Bold}
          style={{
            padding: "5px 30px",
          }}
        >
          공지 제출하기
        </Text>
      </Button>
      <Text
        font={Font.Regular}
        color={colorSet.secondaryText}
        size={"0.875rem"}
      >
        공지 제출 시 수정이 불가능합니다.
      </Text>
    </Flex>
  );
};

export default NoticeWritingActions;
