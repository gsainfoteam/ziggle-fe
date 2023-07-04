import { useRef, useState } from "react";
import Text from "src/atoms/text/Text";
import HorizontalScrollButton from "src/molecules/horizontalScrollButton/HorizontalScrollButton";
import TextZabo from "src/organisms/zabo/TextZabo";
import Zabo from "src/organisms/zabo/Zabo";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import { ZaboProps } from "src/types/types";
import styled from "styled-components";

import Content from "../../atoms/containers/content/Content";

interface ZaboCarouselProps {
  manyZabos: Omit<ZaboProps, "origin" | "size">[];
  carouselTitle: string;
  carouselBGColor?: string;
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

const LowerWrap = styled.div<{ bgColor?: string }>`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor ?? undefined};

  padding: 5px 0 15px 0;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ZabosContainer = styled(Content)`
  display: flex;
  gap: 20px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ZaboCarousel = ({
  manyZabos,
  carouselTitle,
  carouselBGColor,
}: ZaboCarouselProps) => {
  const [scrollBtnDisabled, setScrollBtnDisabled] = useState<boolean[]>([
    true, // left
    false, // right
  ]);

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
      const isEnd = scrollWidth - scrollLeft === clientWidth;
      const isStart = scrollLeft === 0;
      //   console.log(isStart, isEnd);
      setScrollBtnDisabled([isStart, isEnd]);
    }
  };

  const scrollAmount = 800;

  return (
    <EntireWrap>
      <UpperWrap>
        <Text
          size="2rem"
          color={colorSet.text}
          font={Font.Bold}
          style={{ margin: 0 }}
        >
          {carouselTitle}
        </Text>
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
      <LowerWrap bgColor={carouselBGColor}>
        <ZabosContainer ref={carouselRef} onScroll={CheckEnd}>
          {manyZabos.map((zabo) => {
            if (zabo.thumbnailUrl === undefined) {
              // thumbnailUrl이 없으면 TextZabo로 렌더링
              return (
                <TextZabo
                  key={zabo.id}
                  id={zabo.id}
                  title={zabo.title}
                  date={zabo.date}
                  viewCount={zabo.viewCount}
                  author={zabo.author}
                  content={zabo.content}
                  organization={zabo.organization}
                  origin="height"
                  size={300}
                />
              );
            } else {
              // thumbnailUrl이 있으면 Zabo로 렌더링
              return (
                <Zabo
                  key={zabo.id}
                  id={zabo.id}
                  title={zabo.title}
                  date={zabo.date}
                  viewCount={zabo.viewCount}
                  author={zabo.author}
                  organization={zabo.organization}
                  thumbnailUrl={zabo.thumbnailUrl}
                  origin="height"
                  size={300}
                />
              );
            }
          })}
        </ZabosContainer>
      </LowerWrap>
    </EntireWrap>
  );
};

export default ZaboCarousel;
