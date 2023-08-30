import "react-loading-skeleton/dist/skeleton.css";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";

import Area from "../../atoms/containers/area/Area";
import Content from "../../atoms/containers/content/Content";

const PlaygroundPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Area>
      <Content>
        {/* <Chip label={"🎯 모집"} variant={ChipVariant.outlined} /> */}

        <img
          src="https://picsum.photos/300/300?random=1"
          onLoad={handleImageLoad}
          style={{
            display: isLoaded ? undefined : "none",
          }}
        />
        {!isLoaded && <Skeleton width={"300px"} height={"300px"} />}
        <img src="https://picsum.photos/300/300?random=2" onLoad={() => {}} />
      </Content>
    </Area>
  );
};

export default PlaygroundPage;
