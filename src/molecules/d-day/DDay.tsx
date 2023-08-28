import { MOBILE_BREAKPOINT } from "src/types/types";
import styled from "styled-components";

import Text from "../../atoms/text/Text";

interface DDayProps {
  dayLeft: number;
}

const DdayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 28px;
  width: 67px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: var(--color-primary-translucent);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 20px;
    width: 50px;

    margin: -5px 0 0 -5px;
  }
`;

const DdayText = styled(Text)`
  font-family: "NotoSansKR-Bold", sans-serif;
  font-size: 18px;
  color: #ffffff;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
  }
`;

const DDay = ({ dayLeft }: DDayProps) => {
  return (
    <DdayWrapper>
      <DdayText>D - {dayLeft}</DdayText>
    </DdayWrapper>
  );
};

export default DDay;
