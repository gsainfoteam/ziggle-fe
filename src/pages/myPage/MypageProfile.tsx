import { logout } from "src/apis/user/user-api";
import { Account } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import StylelessLink from "src/atoms/stylelessLink/StylelessLink";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

interface MypageProfileProps {
  name?: string;
  id?: string;
  phone?: string;
  email?: string;
}

interface InfoFieldProps {
  children?: React.ReactNode;
}
const InfoField = ({ children }: InfoFieldProps) => {
  const isMobile = useIsMobile();

  return (
    <Text
      size={isMobile ? "1.125rem" : "1.375rem"}
      color={colorSet.secondaryText}
      font={Font.Regular}
      style={{
        borderBottom: "1px solid #ccc",
        lineHeight: "50px",
        marginLeft: "50px",
        marginRight: "50px",
        padding: "20px 20px 5px 20px",
      }}
    >
      {children}
    </Text>
  );
};

interface UnderLinedTextProps {
  text: string;
}

const UnderLinedText = ({ text }: UnderLinedTextProps) => {
  return (
    <Text
      size={"1rem"}
      color={colorSet.secondaryText}
      font={Font.Regular}
      style={{
        textDecoration: "underline",
        textAlign: "right",
        paddingRight: "20px",
      }}
    >
      {text}
    </Text>
  );
};

const MypageProfile = ({ name, id, phone, email }: MypageProfileProps) => {
  const isMobile = useIsMobile();

  const idpUrl = "https://idp.gistory.me";

  return (
    <div>
      <Flex flexDirection="column" alignItems="center">
        <Text
          size={isMobile ? "1.75rem" : "2.5rem"}
          color={colorSet.text}
          font={Font.Medium}
          style={{
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
            letterSpacing: "5px",
          }}
        >
          INFO
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Account
            color={colorSet.secondaryText}
            size={isMobile ? "140px" : "200px"}
          ></Account>
        </div>
        <Spacer height={isMobile ? "0px" : "50px"} />
        <Text
          size={isMobile ? "1.5rem" : "2rem"}
          color={colorSet.text}
          font={Font.Bold}
          style={{
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {name}
        </Text>
        <Flex flexDirection="column" style={{ padding: "0 20px" }}>
          {id && <InfoField>{id}</InfoField>}
          {phone && <InfoField>{phone}</InfoField>}
          {email && <InfoField>{email}</InfoField>}

          <Spacer height={"20px"} />
          <Flex gap="5px" justifyContent="center">
            <Button
              onClick={() => {
                logout();
              }}
            >
              <UnderLinedText text="로그아웃" />
            </Button>
            <StylelessLink to={idpUrl}>
              <UnderLinedText text="회원탈퇴" />
            </StylelessLink>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default MypageProfile;
