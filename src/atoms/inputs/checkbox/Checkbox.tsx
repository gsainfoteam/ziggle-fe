import { InputHTMLAttributes, useId } from "react";
import useIsMobile from "src/hooks/useIsMobile";

import colorSet from "../../../styles/colorSet";
import Font from "../../../styles/font";
import Flex from "../../containers/flex/Flex";
import Text from "../../text/Text";
import checkboxChecked from "./assets/checkboxChecked.svg";
import checkboxUnchecked from "./assets/checkboxUnchecked.svg";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlId?: string;
}

const Checkbox = ({
  label,
  htmlId,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const id = useId();

  const isMobile = useIsMobile();

  return (
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
            src={checkboxChecked}
            alt={"checked checkbox"}
            width={isMobile ? "16px" : "20px"}
          />
        ) : (
          <img
            src={checkboxUnchecked}
            alt={"unchecked checkbox"}
            width={isMobile ? "16px" : "20px"}
          />
        )}

        <Text
          font={Font.Medium}
          size={isMobile ? "0.875rem" : "1.25rem"}
          color={checked ? colorSet.text : colorSet.secondaryText}
        >
          {label}
        </Text>
      </Flex>
    </label>
  );
};

export default Checkbox;
