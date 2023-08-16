import { Account } from "src/assets/Icons";
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

const MypageProfile = ({ name, id, phone, email }: MypageProfileProps) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Account color={colorSet.secondaryText} size="200px"></Account>
        </div>
        <div style={{ height: "50px" }}></div>
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
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        {id && <InfoField>{id}</InfoField>}
        {phone && <InfoField>{phone}</InfoField>}
        {email && <InfoField>{email}</InfoField>}
      </div>
    </div>
  );
};

export default MypageProfile;
