import { ZaboProps } from "src/types/types";

import ImageZabo from "./ImageZabo";
import TextZabo from "./TextZabo";

const Zabo = (props: ZaboProps) => {
  return props.thumbnailUrl === undefined ? (
    <TextZabo {...props} />
  ) : (
    <ImageZabo {...props} thumbnailUrl={props.thumbnailUrl} />
  );
};

export default Zabo;
