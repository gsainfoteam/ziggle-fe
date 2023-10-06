import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SmallArrow } from "src/assets/Icons";
import LazyCat from "src/assets/LazyCat";
import Flex from "src/atoms/containers/flex/Flex";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import HorizontalScrollButton from "src/molecules/horizontalScrollButton/HorizontalScrollButton";
import Zabo from "src/organisms/zabo/Zabo";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import { ZaboProps } from "src/types/types";
import styled from "styled-components";

import Content from "../../atoms/containers/content/Content";

interface ZaboCarouselProps {
  manyZabos: Omit<ZaboProps, "origin" | "size">[];
  link?: string;
  carouselTitle: string;
  carouselBGColor?: string;
  logName?: string;
}

const EntireWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpperWrap = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 0;
`;

const ScrollBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 10px;
`;

const LowerWrap = styled(Flex)<{ bgColor?: string }>`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor ?? undefined};

  padding: 0;

  box-sizing: border-box;
  flex-wrap: nowrap;
  overflow-y: hidden;

  :has(> div > button) {
    padding: 5px 0 15px 0;
  }
`;

const ZabosContainer = styled(Content)`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ZaboCarouselTitleText = ({ text }: { text: string }) => {
  const isMobile = useIsMobile();

  return (
    <Text
      as={"h2"}
      size={isMobile ? "1.75rem" : "2.75rem"}
      color={colorSet.text}
      font={Font.Bold}
      style={{ margin: 0 }}
    >
      {text}
    </Text>
  );
};

const ZaboCarousel = ({
  manyZabos,
  carouselTitle,
  carouselBGColor,
  logName,
  link,
}: ZaboCarouselProps) => {
  const [scrollBtnDisabled, setScrollBtnDisabled] = useState<boolean[]>([
    true, // left
    false, // right
  ]);

  const isMobile = useIsMobile();

  const carouselRef = useRef<HTMLDivElement>(null);
  const Scroll = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + amount,
        behavior: "smooth",
      });
    }
  };

  const CheckEnd = () => {
    if (carouselRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } = carouselRef.current;
      const isEnd = scrollWidth - scrollLeft <= clientWidth;
      const isStart = scrollLeft === 0;
      setScrollBtnDisabled([isStart, isEnd]);
      console.log(isStart, isEnd);
    }
  };

  useEffect(() => {
    CheckEnd();
  }, [manyZabos]);

  /** 한 번에 얼마나 Scroll 할건지 강도 결정 */
  const scrollAmount = 800;

  return (
    <EntireWrap>
      <UpperWrap>
        {link ? (
          <Link to={link} style={{ textDecoration: "none" }}>
            <Flex alignItems="center" gap="20px">
              <ZaboCarouselTitleText text={carouselTitle} />
              <SmallArrow color={colorSet.secondaryText} size={"20px"} />
            </Flex>
          </Link>
        ) : (
          <ZaboCarouselTitleText text={carouselTitle} />
        )}

        <ScrollBtnWrap>
          <HorizontalScrollButton.Left
            onClick={() => Scroll(-scrollAmount)}
            disabled={scrollBtnDisabled[0]}
          ></HorizontalScrollButton.Left>
          <HorizontalScrollButton.Right
            onClick={() => Scroll(scrollAmount)}
            disabled={scrollBtnDisabled[1]}
          ></HorizontalScrollButton.Right>
        </ScrollBtnWrap>
      </UpperWrap>
      <LowerWrap
        bgColor={carouselBGColor}
        alignItems="center"
        justifyContent="center"
      >
        <ZabosContainer ref={carouselRef} onScroll={CheckEnd}>
          {manyZabos.map((zabo) => (
            <Zabo
              key={zabo.id}
              id={zabo.id}
              title={zabo.title}
              content={zabo.content}
              date={zabo.date}
              deadline={zabo.deadline}
              viewCount={zabo.viewCount}
              author={zabo.author}
              organization={zabo.organization}
              thumbnailUrl={zabo.thumbnailUrl}
              origin="height"
              size={isMobile ? 140 : 280}
              logName={logName}
            />
          ))}
        </ZabosContainer>
      </LowerWrap>
      {manyZabos.length <= 0 && (
        <>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="280px"
          >
            <LazyCat />
            <Text
              size={"1.25rem"}
              color={colorSet.secondaryText}
              font={Font.Medium}
              style={{ padding: "20px" }}
            >
              글이 없습니다. =ㅅ=
            </Text>
          </Flex>
        </>
      )}
    </EntireWrap>
  );
};

export default ZaboCarousel;
