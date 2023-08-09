import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import queryKeys from "src/apis/queryKeys";
import { getUserInfo, goToIdp } from "src/apis/user/user-api";
import { Account, Search } from "src/assets/Icons";
import { ZiggleLogo } from "src/assets/ZiggleLogo";
import Button from "src/atoms/button/Button";
import Text from "src/atoms/text/Text";
import { isLoggedInAtom } from "src/store";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import Paths from "src/types/paths";
import styled from "styled-components";

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

const Navbar = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const { data } = useQuery([queryKeys.getUserInfo], getUserInfo, {
    enabled: isLoggedIn,
  });

  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate(Paths.myPage);
    } else {
      goToIdp();
    }
  };

  return (
    <Bar bgColor={colorSet.primary}>
      <Link to={Paths.home}>
        <ZiggleLogo />
      </Link>
      <ButtonSum>
        <Link to={Paths.noticeWriting} style={{ textDecoration: "none" }}>
          <Text color={colorSet.colorless} size="1.1rem" font={Font.Bold}>
            공지 작성
          </Text>
        </Link>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0 10px",
          }}
        >
          <Search size="1.6rem" />
          <Link to={Paths.search} style={{ textDecoration: "none" }}>
            <Text color={colorSet.colorless} size="1.1rem" font={Font.Bold}>
              공지 검색
            </Text>
          </Link>
        </Button>
      </ButtonSum>
      <AccountSum onClick={handleAccountClick}>
        <Text color={colorSet.colorless} size="0.9rem" font={Font.Medium}>
          {data?.user_name ?? "로그인"}
        </Text>
        <Account size="1.6rem" />
      </AccountSum>
    </Bar>
  );
};

export default Navbar;
