import React, { InputHTMLAttributes, useId } from "react";

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

      <Flex gap={"10px"}>
        {checked ? (
          <img src={checkboxChecked} alt={"checked checkbox"} />
        ) : (
          <img src={checkboxUnchecked} alt={"unchecked checkbox"} />
        )}

        <Text
          font={Font.NoticeDes_Medium}
          size={"1.5rem"}
          color={checked ? colorSet.text : colorSet.secondaryText}
        >
          {label}
        </Text>
      </Flex>
    </label>
  );
};

export default Checkbox;
