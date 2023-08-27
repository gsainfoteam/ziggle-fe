import Button from "src/atoms/button/Button";
import Flex from "src/atoms/containers/flex/Flex";
import FilledArrowBtn, {
  HorizontalDirection,
} from "src/atoms/filledArrow/FilledArrowBtn";
import Spacer from "src/atoms/spacer/Spacer";
import Text from "src/atoms/text/Text";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({
  page,
  setPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  const isMobile = useIsMobile();

  return (
    <Flex alignItems={"center"} gap={isMobile ? "7px" : "10px"}>
      <FilledArrowBtn
        isPrimary={page > 0}
        direction={HorizontalDirection.LEFT}
        height={isMobile ? "26px" : "30px"}
        width={isMobile ? "26px" : "30px"}
        onClick={() => {
          setPage(Math.max(0, page - 1));
        }}
      />

      <Spacer width={"8px"} />

      {Array.from(
        { length: Math.ceil(totalItems / itemsPerPage) },
        (_, i) => i,
      ).map((i) => (
        <Button
          key={i}
          border={`1.5px solid ${colorSet.primary}`}
          borderRadius={"8px"}
          onClick={() => {
            setPage(i);
          }}
          width={isMobile ? "30px" : "34px"}
          height={isMobile ? "30px" : "34px"}
          style={{
            backgroundColor: i === page ? colorSet.primary : "white",
          }}
        >
          <Text
            color={i === page ? "white" : colorSet.primary}
            size={isMobile ? "1rem" : "1.25rem"}
            font={Font.Medium}
          >
            {i + 1}
          </Text>
        </Button>
      ))}

      <Spacer width={"8px"} />

      <FilledArrowBtn
        isPrimary={page < totalItems / itemsPerPage - 1}
        direction={HorizontalDirection.RIGHT}
        onClick={() => {
          setPage(Math.min(page + 1, Math.ceil(totalItems / itemsPerPage) - 1));
        }}
        height={"30px"}
        width={"30px"}
      />
    </Flex>
  );
};

export default Pagination;
