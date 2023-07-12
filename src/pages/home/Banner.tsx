import Flex from "../../atoms/containers/flex/Flex";
// import Button, { ButtonVariant } from "../../atoms/button/Button";
// import Icon from "../../atoms/icon/Icon";
// import Spacer from "../../atoms/spacer/Spacer";
// import Text from "../../atoms/text/Text";
// import Font from "../../styles/font";
import bannerImg from "./assets/defaultBanner.png";

interface BannerProps {}

const Banner = ({}: BannerProps) => {
  return (
    <Flex
      width={"100%"}
      height={"fit-content"}
      style={{
        position: "relative",
        cursor: "pointer",
      }}
    >
      <img src={bannerImg} alt={"banner img"} width={"100%"} />

      {/* <Flex
        width={"100%"}
        height={"100%"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text font={Font.Aharoni} size={"2.8rem"} color={"white"}>
          NOTICE.
        </Text>

        <Text font={Font.Aharoni} size={"3.8rem"} color={"white"}>
          INTEGRATED.
        </Text>

        <Spacer height={"16px"} />

        <Button variant={ButtonVariant.contained}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={"14px"}
            style={{
              padding: "6px 15px",
            }}
          >
            <Text
              font={Font.Bold}
              size={"1.25rem"}
              style={{
                paddingBottom: "2px",
              }}
            >
              공지 작성하기
            </Text>
            <Icon.ArrowLeftWhite width={"16.6px"} />
          </Flex>
        </Button>
      </Flex> */}
    </Flex>
  );
};

export default Banner;
