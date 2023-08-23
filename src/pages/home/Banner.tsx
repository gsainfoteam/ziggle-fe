import { useState } from "react";
import { Link } from "react-router-dom";
import Circle from "src/atoms/figures/circle/Circle";
import FilledArrowBtn, {
  HorizontalDirection,
} from "src/atoms/filledArrow/FilledArrowBtn";
import Spacer from "src/atoms/spacer/Spacer";
import dummyBanners from "src/mock/dummy-banners";
import BannerImage from "src/molecules/bannerImage/BannerImage";
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
      border={`2px solid ${colorSet.primary}}`}
    />
  );
};

const Banner = () => {
  const [curIndex, setCurIndex] = useState(0);
  const maxIndex = dummyBanners.length - 1;

  const ManipulateIndex = (amount: number) => {
    setCurIndex((curIndex) =>
      Math.max(0, Math.min(curIndex + amount, maxIndex)),
    );
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
          <Link to="/notice-writing">
            <BannerImage
              src={dummyBanners[curIndex].imageUrl}
              objectPosition={dummyBanners[curIndex].objectPosition}
            />
          </Link>
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
      {/* Banner Navigation을 일시적으로 비활성화 (배너 시스템이 구체화되면 재추가) */}
      {/* <Flex justifyContent="center" gap="15px" alignItems="center">
        <FilledArrowBtn
          direction={HorizontalDirection.LEFT}
          isPrimary={!!curIndex}
          onClick={() => ManipulateIndex(-1)}
          height={"30px"}
          width={"30px"}
        />
        <Flex justifyContent="center" gap="12px" alignItems="center">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <IndexCircle
              isSelected={i === curIndex}
              key={i}
              onClick={() => {
                setCurIndex(i);
              }}
            />
          ))}
        </Flex>
        <FilledArrowBtn
          direction={HorizontalDirection.RIGHT}
          isPrimary={curIndex < maxIndex - 1}
          onClick={() => ManipulateIndex(1)}
          height={"30px"}
          width={"30px"}
        />
      </Flex> */}
    </>
  );
};

export default Banner;
