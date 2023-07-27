import { prominent } from "color.js";
import { useEffect, useState } from "react";
import colorSet from "src/styles/colorSet";
import rgbToHex from "src/utils/rgbToHex";

interface ZaboShowcaseProps {
  src: string;
}

const ZaboShowcase = ({ src }: ZaboShowcaseProps) => {
  const [bannerColor, setBannerColor] = useState<string>(colorSet.primary);
  useEffect(() => {
    prominent(src, { amount: 1 }).then((color) => {
      const hex = rgbToHex([color[0], color[1], color[2]]);
      console.log(hex);
      setBannerColor(hex);
    });
  });

  return (
    <>
      {/* 공지 상세 페이지 color banner - 이 컴포넌트도 따로 만드는 게 나을지, 아니면 이대로 둘지 */}
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: bannerColor,
        }}
      ></div>
    </>
  );
};

export default ZaboShowcase;
