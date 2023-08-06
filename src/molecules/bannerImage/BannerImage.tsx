import React from "react";
import Image from "src/atoms/image/Image";

interface BannerImageProps {
  height?: React.CSSProperties["height"];
  filter?: React.CSSProperties["filter"];
  objectPosition: React.CSSProperties["objectPosition"];
  src: string;
}

const BannerImage = ({
  height = "500px",
  filter,
  objectPosition,
  src,
}: BannerImageProps) => {
  return (
    <Image
      width="100%"
      height={height}
      filter={filter}
      objectPosition={objectPosition}
      src={src}
    />
  );
};

export default BannerImage;
