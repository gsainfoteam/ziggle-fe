import Flex from "src/atoms/containers/flex/Flex";
import Image from "src/atoms/image/Image";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

import Catbounce from "../../assets/Catbounce.gif";

interface LoadingCatAnimationProps {
  text?: string;
  width?: React.CSSProperties["width"];
}

const LoadingCatAnimation = ({
  text = "로딩 중입니다! -ㅅ-",
  width = "216px",
}: LoadingCatAnimationProps) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Spacer height={"50px"} />
      <Image src={Catbounce} width={width} height={`calc(${width}) / 1.333`} />
      <Spacer height={"15px"} />
      <Text
        size="1.5rem"
        color={colorSet.secondaryText}
        font={Font.Medium}
        style={{ paddingTop: "20px", marginTop: "-30px" }}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default LoadingCatAnimation;
