import { useHover } from "@mantine/hooks";
import { ShareIcon } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import Swal from "sweetalert2";

interface ShareButtonProps {
  title: string;
}

const ShareButton = ({ title }: ShareButtonProps) => {
  const { hovered, ref } = useHover<HTMLButtonElement>();
  const isMobile = useIsMobile();

  const handleCopyClick = () => {
    if (!navigator.canShare) {
      Swal.fire({
        title: "공유하기를 지원하지 않는 브라우저입니다",
        icon: "error",
      });
    }

    navigator.share({
      title: title,
      text: `${title}\nZiggle에서 공지를 확인해보세요`,
      url: window.location.href,
    });
  };

  return (
    <Button ref={ref} onClick={handleCopyClick} animated>
      <Flex alignItems={"center"} gap={isMobile ? "4px" : "5px"}>
        <ShareIcon
          size={isMobile ? "16px" : "24px"}
          color={hovered ? colorSet.primary : colorSet.secondaryText}
        />

        <Text
          font={Font.Medium}
          color={hovered ? colorSet.primary : colorSet.secondaryText}
          size={isMobile ? "0.75rem" : "1rem"}
        >
          공유하기
        </Text>
      </Flex>
    </Button>
  );
};

export default ShareButton;
