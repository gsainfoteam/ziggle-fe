import { useHover } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { Arrow } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

const BackToMainBtn = () => {
  const navigator = useNavigate();
  const backToMain = () => {
    navigator("/");
  };

  const { hovered, ref } = useHover();
  const isMobile = useIsMobile();

  return (
    <Flex width="100%" justifyContent="right" ref={ref}>
      <Button onClick={backToMain}>
        <Flex
          alignItems="center"
          gap={hovered ? "14px" : "9px"}
          style={{ transition: "0.2s" }}
        >
          <Arrow
            size={isMobile ? "20px" : "24px"}
            color={hovered ? colorSet.primary : colorSet.secondaryText}
          />
          <Text
            font={Font.Medium}
            size={isMobile ? "1rem" : "1.125rem"}
            color={hovered ? colorSet.primary : colorSet.secondaryText}
          >
            메인 페이지로 돌아가기
          </Text>
          <div
            style={{
              borderRight: `${isMobile ? 3 : 4}px solid ${
                hovered ? colorSet.primary : colorSet.secondaryText
              }`,
              height: isMobile ? "25px" : "32px",
            }}
          ></div>
        </Flex>
      </Button>
    </Flex>
  );
};

export default BackToMainBtn;
