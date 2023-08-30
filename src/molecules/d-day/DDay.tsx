import { MOBILE_BREAKPOINT } from "src/types/types";
import { dDayFormated } from "src/utils/date";
import styled from "styled-components";

import Text from "../../atoms/text/Text";

interface DDayProps {
  deadline: string;
}

const DdayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 28px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: var(--color-primary-translucent);
  padding: 0 5px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 20px;

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

const DDay = ({ deadline }: DDayProps) => {
  return (
    <DdayWrapper>
      <DdayText>{dDayFormated(deadline)}</DdayText>
    </DdayWrapper>
  );
};

export default DDay;
