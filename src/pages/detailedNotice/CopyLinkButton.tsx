import { useHover } from "@mantine/hooks";
import { LinkIcon } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

interface CopyLinkButtonProps {
  title: string;
}

const CopyLinkButton = ({ title }: CopyLinkButtonProps) => {
  const { hovered, ref } = useHover<HTMLButtonElement>();
  const isMobile = useIsMobile();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      `${title} \n\nZiggle에서 공지를 확인해보세요 \n${window.location.href}`,
    );
  };

  return (
    <Button ref={ref} onClick={handleCopyClick} animated>
      <Flex alignItems={"center"} gap={isMobile ? "4px" : "5px"}>
        <LinkIcon
          size={isMobile ? "20px" : "30px"}
          color={hovered ? colorSet.primary : colorSet.secondaryText}
        />
        <Text
          font={Font.Medium}
          color={hovered ? colorSet.primary : colorSet.secondaryText}
          size={isMobile ? "0.75rem" : "1rem"}
        >
          주소 복사하기
        </Text>
      </Flex>
    </Button>
  );
};

export default CopyLinkButton;
