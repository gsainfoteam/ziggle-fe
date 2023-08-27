import Grid from "src/atoms/containers/grid/Grid";
import ExternalLink from "src/atoms/externalLink/ExternalLink";
import Text from "src/atoms/text/Text";
import colorSet from "src/styles/colorSet";
import Font from "src/styles/font";
import styled from "styled-components";

export enum AcademicTableType {
  Title,
  Default,
}

interface AcademicTableProps {
  type: AcademicTableType;
  title?: string;
  tags?: string[];
  deadline?: string;
  date?: string;
  link?: string;
}

const Cell = styled.div<{
  bgColor: string;
  borderColor: string;
  isLast?: boolean;
}>`
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  border-top: none;
  border-left: none;
  border-right: ${(props) => (props.isLast ? "none" : undefined)};

  padding: 16px 16px;
  box-sizing: border-box;
`;

const TableWrapper = styled(Grid)``;

const AcademicTable = ({
  type,
  title,
  tags,
  deadline,
  date,
  link,
}: AcademicTableProps) => {
  const [color, bgColor, borderColor, Title, Tags, Deadline, Date] =
    type == AcademicTableType.Title
      ? [
          colorSet.colorless,
          colorSet.primary,
          colorSet.colorless,
          "제목",
          ["분류"],
          "마감일",
          "작성일",
        ]
      : [
          colorSet.text,
          colorSet.colorless,
          colorSet.deselected,
          title,
          tags,
          deadline,
          date,
        ];
  return (
    <TableWrapper gridTemplateColumns={"1fr 4.5fr 1fr 1fr"}>
      <Cell bgColor={bgColor} borderColor={borderColor}>
        <Text
          textAlign="center"
          color={color}
          font={type == AcademicTableType.Title ? Font.Medium : Font.Regular}
          size="1rem"
        >
          {Tags?.join("/")}
        </Text>
      </Cell>
      <Cell bgColor={bgColor} borderColor={borderColor}>
        <ExternalLink href={link || ""}>
          <Text
            textAlign={type == AcademicTableType.Title ? "center" : "left"}
            color={color}
            font={type == AcademicTableType.Title ? Font.Medium : Font.Regular}
            size="1rem"
          >
            {Title}
          </Text>
        </ExternalLink>
      </Cell>
      <Cell bgColor={bgColor} borderColor={borderColor}>
        <Text
          textAlign="center"
          color={color}
          font={type == AcademicTableType.Title ? Font.Medium : Font.Regular}
          size="1rem"
        >
          {Deadline}
        </Text>
      </Cell>
      <Cell bgColor={bgColor} borderColor={borderColor} isLast={true}>
        <Text
          textAlign="center"
          color={color}
          font={type == AcademicTableType.Title ? Font.Medium : Font.Regular}
          size="1rem"
        >
          {Date}
        </Text>
      </Cell>
    </TableWrapper>
  );
};

export default AcademicTable;
