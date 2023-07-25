import { Close } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import colorSet from "src/styles/colorSet";

interface ImagePreviewItemProps {
  src: string;
  onDelete: () => void;
}

const ImagePreviewItem = ({ src, onDelete }: ImagePreviewItemProps) => {
  return (
    <Flex
      style={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={"image"}
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: colorSet.primary,
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        <Flex>
          <Close size={"16px"} color={colorSet.colorless} />
        </Flex>
      </Button>
    </Flex>
  );
};

export default ImagePreviewItem;
