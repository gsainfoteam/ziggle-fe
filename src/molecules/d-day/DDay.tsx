import styled from "styled-components";

import Text from "../../atoms/text/Text";
import colorSet from "../../styles/colorSet";

interface DDayProps {
  dayLeft: number;
}

const DdayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 35px;
  width: 87px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: ${colorSet.primary};
`;

const DdayText = styled(Text)`
  font-family: "NotoSansKR-Bold", sans-serif;
  font-size: 22px;
  color: #ffffff;
`;

const DDay = ({ dayLeft }: DDayProps) => {
  return (
    <DdayWrapper>
      <DdayText>D - {dayLeft}</DdayText>
    </DdayWrapper>
  );
};

export default DDay;
