import React from "react";
import Image from "src/atoms/image/Image";

interface BannerImageProps {
  filter?: React.CSSProperties["filter"];
  objectPosition: React.CSSProperties["objectPosition"];
  src: string;
}

const BannerImage = ({ filter, objectPosition, src }: BannerImageProps) => {
  return (
    <Image
      width="100%"
      filter={filter}
      objectPosition={objectPosition}
      src={src}
    />
  );
};

export default BannerImage;
