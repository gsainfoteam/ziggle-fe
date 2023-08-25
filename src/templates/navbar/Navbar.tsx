import { useNavigate } from "react-router-dom";
import LogEvents from "src/apis/log/log-event";
import sendLog from "src/apis/log/sendLog";
import { goToIdp } from "src/apis/user/user-api";
import { Account, Search } from "src/assets/Icons";
import { ZiggleLogo } from "src/assets/ZiggleLogo";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import StylelessLink from "src/atoms/stylelessLink/StylelessLink";
import Text from "src/atoms/text/Text";
import useAuth from "src/hooks/useAuth";
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
  gap: 0 30px;
`;

const AccountSum = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0 10px;
`;

const Navbar = () => {
  const { userInfo } = useAuth();

  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (userInfo) {
      sendLog(LogEvents.NavBarClickMyPage);

      navigate(Paths.myPage);
    } else {
      sendLog(LogEvents.NavBarClickLogin);

      goToIdp();
    }
  };

  return (
    <Bar bgColor={colorSet.primary}>
      <StylelessLink
        to={Paths.home}
        onClick={() => sendLog(LogEvents.NavBarClickLogo)}
      >
        <ZiggleLogo />
      </StylelessLink>
      <ButtonSum>
        <StylelessLink
          to={Paths.all}
          onClick={() => sendLog(LogEvents.NavBarClickAll)}
        >
          <Text color={colorSet.colorless} size="1.0625rem" font={Font.Bold}>
            전체 공지
          </Text>
        </StylelessLink>
        {userInfo && (
          <StylelessLink
            to={Paths.noticeWriting}
            onClick={() => sendLog(LogEvents.NavBarClickWrite)}
          >
            <Text color={colorSet.colorless} size="1.0625rem" font={Font.Bold}>
              공지 작성
            </Text>
          </StylelessLink>
        )}

        <StylelessLink
          to={Paths.search}
          onClick={() => sendLog(LogEvents.NavBarClickSearch)}
        >
          <Flex alignItems={"center"} gap={"5px"}>
            <Search size="1.6rem" />

            <Text color={colorSet.colorless} size="1.0625rem" font={Font.Bold}>
              공지 검색
            </Text>
          </Flex>
        </StylelessLink>
      </ButtonSum>
      <AccountSum onClick={handleAccountClick}>
        <Text color={colorSet.colorless} size="0.875rem" font={Font.Medium}>
          {userInfo?.user_name ?? "로그인"}
        </Text>
        <Account size="1.6rem" />
      </AccountSum>
    </Bar>
  );
};

export default Navbar;
