import { Link, useNavigate } from "react-router-dom";
import { Account, Search } from "src/assets/Icons";
import { ZiggleLogo } from "src/assets/ZiggleLogo";
import Button from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import Paths from "src/types/paths";
import styled from "styled-components";

interface NavbarProps {
  username?: string;
}

const Bar = styled.div<{ bgColor: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};

  box-sizing: border-box;
  padding: 0.1rem 1rem;
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
  const navigate = useNavigate();

  return (
    <Bar bgColor={colorSet.primary}>
      <Link to={"/"}>
        <ZiggleLogo />
      </Link>
      <ButtonSum>
        <Button
          onClick={() => {
            navigate(Paths.noticeWriting);
          }}
        >
          <Text color={colorSet.colorless} size="1.1rem" font={Font.Bold}>
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
          <Link to={"/search"} style={{ textDecoration: "none" }}>
            <Text color={colorSet.colorless} size="1.1rem" font={Font.Bold}>
              공지 검색
            </Text>
          </Link>
        </Button>
      </ButtonSum>
      <AccountSum>
        <Text color={colorSet.colorless} size="0.9rem" font={Font.Medium}>
          {username ?? "로그인"}
        </Text>
        <Account size="1.6rem" />
      </AccountSum>
    </Bar>
  );
};

export default Navbar;
