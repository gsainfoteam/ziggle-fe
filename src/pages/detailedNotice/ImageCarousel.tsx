import { useRef, useState } from "react";
import Flex from "src/atoms/containers/flex/Flex";
import Image from "src/atoms/image/Image";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import HorizontalScrollButton from "src/molecules/horizontalScrollButton/HorizontalScrollButton";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import styled from "styled-components";

export interface ImageCarouselProps {
  imageSrcs: string[];
}

const UpperWrap = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`;

const LowerWrap = styled(Flex)`
  background-color: ${colorSet.deselected};
  border-top: 2px solid ${colorSet.text};
  border-bottom: 2px solid ${colorSet.text};
  padding: 10px;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ScrollBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 10px;
`;

const ImageCarousel = ({ imageSrcs }: ImageCarouselProps) => {
  const [scrollBtnDisabled, setScrollBtnDisabled] = useState<boolean[]>([
    true, // left
    false, // right
  ]);
  const isMobile = useIsMobile();

  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (amount: number) => {
    carouselRef.current?.scrollTo({
      left: carouselRef.current.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  /** 한 번에 얼마나 Scroll 할건지 강도 결정 */
  const scrollAmount = 800;

  const CheckEnd = () => {
    if (carouselRef.current) {
      const { scrollWidth, scrollLeft, clientWidth } = carouselRef.current;
      const isEnd = scrollWidth - scrollLeft === clientWidth;
      const isStart = scrollLeft === 0;
      setScrollBtnDisabled([isStart, isEnd]);
    }
  };

  return (
    <>
      <UpperWrap>
        <Text
          size={isMobile ? "1.5rem" : "2.5rem"}
          font={Font.Bold}
          style={{ margin: 0 }}
        >
          첨부 사진
        </Text>
        <ScrollBtnWrap>
          <HorizontalScrollButton.Left
            onClick={() => scroll(-scrollAmount)}
            disabled={scrollBtnDisabled[0]}
          ></HorizontalScrollButton.Left>
          <HorizontalScrollButton.Right
            onClick={() => scroll(scrollAmount)}
            disabled={scrollBtnDisabled[1]}
          ></HorizontalScrollButton.Right>
        </ScrollBtnWrap>
      </UpperWrap>

      <Spacer height="30px" />

      <LowerWrap ref={carouselRef} onScroll={CheckEnd} gap="20px" wrap="nowrap">
        {imageSrcs.map((src) => (
          <Image
            src={src}
            key={src}
            width={isMobile ? "200px" : "300px"}
            style={{
              border: `2px solid ${colorSet.colorless}`,
              borderRadius: "5px",
            }}
          />
        ))}
      </LowerWrap>
    </>
  );
};

export default ImageCarousel;
