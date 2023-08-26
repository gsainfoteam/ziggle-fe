import React from "react";
import { AppStore, Github, PlayStore } from "src/assets/Icons";
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

const Link = styled(Text)`
  text-decoration: none;
`;

const ExternalLink = ({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) => (
  <Link
    as="a"
    href={href}
    target="_blank"
    rel="noreferrer"
    font={Font.Regular}
    size="0.9rem"
  >
    {children}
  </Link>
);

interface LinkSumProps {
  title: string;
  links: {
    name: string;
    link: string;
  }[];
}

const LinkSum = ({ title, links }: LinkSumProps) => {
  return (
    <Flex flexDirection="column" gap="1.8rem" width="8rem">
      <Text font={Font.Bold} size="0.9rem">
        {title}
      </Text>
      <Flex gap="1rem" flexDirection="column">
        {links.map(({ link, name }) => (
          <ExternalLink href={link} key={name}>
            {name}
          </ExternalLink>
        ))}
      </Flex>
    </Flex>
  );
};

const linkSections = [
  {
    title: "소개",
    links: [{ name: "인포팀 소개", link: "https://introduce.gistory.me" }],
  },
  {
    title: "약관",
    links: [
      {
        name: "서비스이용약관",
        link: "https://infoteam-rulrudino.notion.site/6177be6369e44280a23a65866c51b257",
      },
      {
        name: "개인정보처리방침",
        link: "https://infoteam-rulrudino.notion.site/ceb9340c0b514497b6d916c4a67590a1",
      },
      { name: "문의", link: "mailto:ziggle@gistory.me" },
    ],
  },
  {
    title: "바로가기",
    links: [
      { name: "GIST 홈페이지", link: "https://www.gist.ac.kr/kr/main.html" },
      { name: "지졸", link: "https://gijol.im" },
      {
        name: "지스트 하우스",
        link: "https://sites.google.com/view/gisthouse/home",
      },
    ],
  },
];

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
            <ExternalLink href="https://github.com/gsainfoteam">
              <Github size="2.6rem" />
            </ExternalLink>
            <ExternalLink href="https://play.google.com/store/apps/details?id=me.gistory.ziggle">
              <PlayStore size="2.6rem" />
            </ExternalLink>
            <ExternalLink href="https://apps.apple.com/kr/app/ziggle/id6451740697">
              <AppStore size="2.6rem" />
            </ExternalLink>
          </Flex>
        </Flex>
        <Text font={Font.Regular} size="1rem">
          ⓒ 2023. INFOTEAM all rights reserved.
        </Text>
      </Flex>
      {linkSections.map(({ title, links }) => (
        <LinkSum key={title} title={title} links={links} />
      ))}
    </Bar>
  );
};

export default Footer;
