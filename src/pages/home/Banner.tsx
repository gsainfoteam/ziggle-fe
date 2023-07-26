import { useState } from "react";
import Circle from "src/atoms/figures/circle/Circle";
import FilledArrowBtn, {
  HorizontalDirection,
} from "src/atoms/filledArrow/FilledArrowBtn";
import ImageRenderer from "src/atoms/imageRenderer/ImageRenderer";
import Spacer from "src/atoms/spacer/Spacer";
import dummyBanners from "src/mock/dummy-banners";
import colorSet from "src/styles/colorSet";

import Flex from "../../atoms/containers/flex/Flex";

// interface BannerProps {}

interface IndexCircleProps {
  isSelected: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const IndexCircle = ({ isSelected, onClick }: IndexCircleProps) => {
  return (
    <Circle
      style={{ cursor: "pointer" }}
      onClick={onClick}
      diameter={"20px"}
      background={isSelected ? colorSet.primary : colorSet.colorless}
      border={["2px", colorSet.primary]}
    />
  );
};

const Banner = () => {
  const [curIndex, setCurIndex] = useState(0);
  const maxIndex = dummyBanners.length;

  const ManipulateIndex = (amount: number) => {
    if (curIndex + amount < 0 || curIndex + amount >= maxIndex) return;
    setCurIndex((curIndex) => curIndex + amount);

    console.log(dummyBanners[curIndex].imageUrl);
  };

  return (
    <>
      <Flex
        width={"100%"}
        height={"fit-content"}
        style={{
          position: "relative",
        }}
      >
        <Flex
          justifyContent="center"
          width={"100%"}
          style={{ backgroundColor: colorSet.primary }}
        >
          <ImageRenderer
            imageUrl={dummyBanners[curIndex].imageUrl}
            origin="height"
            size={500}
            isHover={false}
            tGP={5}
            borderRadius={0}
            objectPosition={dummyBanners[curIndex].objectPosition}
          />
        </Flex>

        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: colorSet.primary,
          }}
        ></div>
        <Spacer height={"20px"} />
      </Flex>
      <Flex justifyContent="center" gap="15px" alignItems="center">
        {/* left side banner button */}
        <FilledArrowBtn
          direction={HorizontalDirection.LEFT}
          isPrimary={!!curIndex}
          onClick={() => ManipulateIndex(-1)}
          height={"30px"}
          width={"30px"}
        />
        <Flex justifyContent="center" gap="12px" alignItems="center">
          {Array.from({ length: maxIndex }, (_, i) => (
            <IndexCircle
              isSelected={i === curIndex}
              key={i}
              onClick={() => {
                setCurIndex(i);
              }}
            />
          ))}
        </Flex>
        {/* right side banner button */}
        <FilledArrowBtn
          direction={HorizontalDirection.RIGHT}
          isPrimary={curIndex < maxIndex - 1}
          onClick={() => ManipulateIndex(1)}
          height={"30px"}
          width={"30px"}
        />
      </Flex>
    </>
  );
};

export default Banner;
