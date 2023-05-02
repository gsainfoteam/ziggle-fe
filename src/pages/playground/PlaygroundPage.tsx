import Area from "../../atoms/containers/area/Area";
import Content from "../../atoms/containers/content/Content";
import Chip, { ChipVariant } from "../../molecules/chip/Chip";

const PlaygroundPage = () => {
  return (
    <Area>
      <Content>
        <Chip label={"🎯 모집"} variant={ChipVariant.outlined} />
      </Content>
    </Area>
  );
};

export default PlaygroundPage;
