import { Account, Search } from "src/assets/Icons";
import { ZiggleLogo } from "src/assets/ZiggleLogo";
import Button from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import styled from "styled-components";

interface NavbarProps {
  username?: string;
}

const Bar = styled.div<{ bgColor: string }>`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};

  box-sizing: border-box;
  padding: 0.725rem 1rem;
`;

const ButtonSum = styled.div`
  display: flex;
  align-items: center;
  gap: 0 40px;
`;

const AccountSum = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0 10px;
`;

const Navbar = ({ username }: NavbarProps) => {
  return (
    <Bar bgColor={colorSet.primary}>
      <ZiggleLogo />
      <ButtonSum>
        <Button>
          <Text color={colorSet.colorless} size="1.2rem" font={Font.Bold}>
            공지 작성
          </Text>
        </Button>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0 10px",
          }}
        >
          <Search size="1.6rem" />
          <Text color={colorSet.colorless} size="1.2rem" font={Font.Bold}>
            공지 검색
          </Text>
        </Button>
      </ButtonSum>
      <AccountSum>
        <Text color={colorSet.colorless} size="1rem" font={Font.Medium}>
          {username ?? "로그인"}
        </Text>
        <Account size="1.6rem" />
      </AccountSum>
    </Bar>
  );
};

export default Navbar;
