import { Github, Instagram } from "src/assets/Icons";
import { InfoteamLogo } from "src/assets/ZiggleLogo";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import styled from "styled-components";

import Flex from "../../atoms/containers/flex/Flex";
import defaults from "../../styles/defaults";

const Bar = styled(Flex)<{ padding: string; bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 4rem ${({ padding }) => padding};
  box-sizing: border-box;
  color: ${colorSet.colorless};
  min-height: 380px;
`;

interface Link {
  name: string;
  link: string;
}

interface LinkSumProps {
  title: string;
  links: Link[];
}

const LinkSum = ({ title, links }: LinkSumProps) => {
  return (
    <Flex flexDirection="column" gap="1.8rem" width="8rem">
      <Text font={Font.Bold} size="0.9rem">
        {title}
      </Text>
      {links.map((link) => (
        <Text key={link.name} font={Font.Regular} size="0.9rem">
          {link.name}
        </Text>
      ))}
    </Flex>
  );
};

const LinkSum1 = {
  title: "소개",
  links: [{ name: "인포팀 소개", link: "" }],
};

const LinkSum2 = {
  title: "약관",
  links: [
    { name: "서비스이용약관", link: "" },
    {
      name: "개인정보처리방침",
      link: "",
    },
    { name: "문의", link: "" },
  ],
};

const Footer = () => {
  return (
    <Bar
      width={"100%"}
      padding={defaults.pageSideGap}
      bgColor={colorSet.primary}
      gap="6rem"
    >
      <Flex flexDirection="column" justifyContent="space-between">
        <Flex flexDirection="column">
          <InfoteamLogo />
          <Text font={Font.Medium} size="1rem">
            지스트대학 총학생회 산하 정보국
          </Text>
          <Flex gap="15px" style={{ marginTop: "1rem" }}>
            <Instagram size="2.6rem" />
            <Github size="2.6rem" />
          </Flex>
        </Flex>
        <Text font={Font.Regular} size="1rem">
          ⓒ 2023. INFOTEAM all rights reserved.
        </Text>
      </Flex>
      <LinkSum title={LinkSum1.title} links={LinkSum1.links} />
      <LinkSum title={LinkSum2.title} links={LinkSum2.links} />
    </Bar>
  );
};

export default Footer;
