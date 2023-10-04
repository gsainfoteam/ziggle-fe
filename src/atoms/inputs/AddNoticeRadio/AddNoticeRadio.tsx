import { InputHTMLAttributes, useId } from "react";
import useIsMobile from "src/hooks/useIsMobile";

import colorSet from "../../../styles/colorSet";
import Font from "../../../styles/font";
import Flex from "../../containers/flex/Flex";
import Text from "../../text/Text";
import radioDeslected from "./assets/radioDeselected.svg";
import radioSelected from "./assets/radioSelected.svg";
import { AddType } from "src/types/types";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlId?: string;
}
const AddNoticeRadio = ({
  label,
  htmlId,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const id = useId();

  const isMobile = useIsMobile();

  return (
    <Flex gap={"10px"}>
      <label htmlFor={htmlId || id}>
        <input
          id={htmlId || id}
          type={"checkbox"}
          checked={checked}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
          }}
          style={{
            display: "none",
          }}
          {...props}
        />

        <Flex gap={isMobile ? "8px" : "10px"}>
          {checked ? (
            <img
              src={radioSelected}
              alt={"checked checkbox"}
              width={isMobile ? "16px" : "20px"}
            />
          ) : (
            <img
              src={radioDeslected}
              alt={"unchecked checkbox"}
              width={isMobile ? "16px" : "20px"}
            />
          )}

          <Text
            font={Font.Medium}
            size={isMobile ? "0.875rem" : "1.25rem"}
            color={checked ? colorSet.text : colorSet.secondaryText}
          >
            리마인드 설정한 사람에게만 알림 보내기
          </Text>
        </Flex>
      </label>
      <label htmlFor={htmlId || id}>
        <input
          id={htmlId || id}
          type={"checkbox"}
          checked={checked}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
          }}
          style={{
            display: "none",
          }}
          {...props}
        />

        <Flex gap={isMobile ? "8px" : "10px"}>
          {checked ? (
            <img
              src={radioSelected}
              alt={"checked checkbox"}
              width={isMobile ? "16px" : "20px"}
            />
          ) : (
            <img
              src={radioDeslected}
              alt={"unchecked checkbox"}
              width={isMobile ? "16px" : "20px"}
            />
          )}

          <Text
            font={Font.Medium}
            size={isMobile ? "0.875rem" : "1.25rem"}
            color={checked ? colorSet.text : colorSet.secondaryText}
          >
            모든 사람에게 알림 보내기
          </Text>
        </Flex>
      </label>
    </Flex>
  );
};

export default AddNoticeRadio;
