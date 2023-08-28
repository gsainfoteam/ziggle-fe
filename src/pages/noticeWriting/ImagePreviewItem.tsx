import { Close } from "src/assets/Icons";
import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";

interface ImagePreviewItemProps {
  src: string;
  onDelete: () => void;
}

const ImagePreviewItem = ({ src, onDelete }: ImagePreviewItemProps) => {
  const isMobile = useIsMobile();

  return (
    <Flex
      style={{
        position: "relative",
        borderRadius: isMobile ? "6px" : "10px",
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
          top: isMobile ? "6px" : "10px",
          right: isMobile ? "6px" : "10px",
          backgroundColor: colorSet.primary,
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        <Flex>
          <Close size={isMobile ? "10px" : "16px"} color={colorSet.colorless} />
        </Flex>
      </Button>
    </Flex>
  );
};

export default ImagePreviewItem;
