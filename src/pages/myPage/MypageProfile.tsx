import { Account } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
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

interface UnderLinedButtonProps {
  onClick?: () => void;
  text: string;
}

const UnderLinedButton = ({ onClick, text }: UnderLinedButtonProps) => {
  return (
    <Button onClick={onClick}>
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
    </Button>
  );
};

const MypageProfile = ({ name, id, phone, email }: MypageProfileProps) => {
  const isMobile = useIsMobile();

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 20px",
          }}
        >
          {id && <InfoField>{id}</InfoField>}
          {phone && <InfoField>{phone}</InfoField>}
          {email && <InfoField>{email}</InfoField>}

          <Flex gap="5px">
            <UnderLinedButton text="로그아웃" />
            <UnderLinedButton text="회원탈퇴" />
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default MypageProfile;
