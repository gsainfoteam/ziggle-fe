import { Account } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
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
  return (
    <Text
      size="1.4rem"
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
  return (
    <div>
      <Flex flexDirection="column" alignItems="center">
        <Text
          size="2.5rem"
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
        <Flex flexDirection="column" alignItems="center">
          <Account color={colorSet.secondaryText} size="200px"></Account>
        </Flex>
        <Spacer height="50px" />
        <Text
          size="2.0rem"
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

        <Flex flexDirection="column" style={{ padding: "20px" }}>
          {id && <InfoField>{id}</InfoField>}
          {phone && <InfoField>{phone}</InfoField>}
          {email && <InfoField>{email}</InfoField>}
        </Flex>

        <Spacer height="20px" />

        <Flex gap="5px">
          <UnderLinedButton text="로그아웃" />
          <UnderLinedButton text="회원탈퇴" />
        </Flex>
      </Flex>
    </div>
  );
};

export default MypageProfile;
