import React from "react";
import useIsMobile from "src/hooks/useIsMobile";
import colorSet from "src/styles/colorSet";
import styled, { keyframes } from "styled-components";

const wave = keyframes`
  50% {
    transform: scale(0.9);
  }
`;

const CheckboxWrapper = styled.div`
  * {
    box-sizing: border-box;
  }
  .cbx {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s ease;
    display: inline-block;
  }
  .cbx:not(:last-child) {
    margin-right: 6px;
  }
  .cbx:hover {
    background: ${colorSet.primary}20;
  }
  .cbx span {
    float: left;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }
  .cbx span:first-child {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    transform: scale(1);
    border: 1px solid #cccfdb;
    transition: all 0.2s ease;
    box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
  }
  .cbx span:first-child svg {
    position: absolute;
    top: 3px;
    left: 2px;
    fill: none;
    stroke: ${colorSet.colorless};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }
  .cbx span:last-child {
    padding-left: 8px;
    line-height: 18px;
  }
  .cbx:hover span:first-child {
    border-color: ${colorSet.primary};
  }
  .inp-cbx {
    display: none;
  }
  .inp-cbx:checked + .cbx span:first-child {
    background: ${colorSet.primary};
    border-color: ${colorSet.primary};
    animation: ${wave} 0.4s ease;
  }
  .inp-cbx:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
  }
  .inline-svg {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    user-select: none;
  }
  @media screen and (max-width: 640px) {
    .cbx {
      width: 100%;
      display: inline-block;
    }
  }
`;

interface CheckboxWithLabelProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: React.ReactNode;
}

const CheckboxWithLabel = ({
  id,
  checked,
  onChange,
  children,
}: CheckboxWithLabelProps) => {
  const isMobile = useIsMobile();

  return (
    <CheckboxWrapper>
      <input
        className="inp-cbx"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="cbx" htmlFor={id}>
        <span>
          <svg
            width={isMobile ? "calc(12px / 1.2)" : "12px"}
            height={isMobile ? "calc(12px / 1.2)" : "10px"}
          >
            <use xlinkHref="#check-4"></use>
          </svg>
        </span>
        <span>{children}</span>
      </label>
      <svg className="inline-svg">
        <symbol
          id="check-4"
          viewBox="0 0 12 10"
          width={isMobile ? "calc(12px / 1.2)" : "12px"}
          height={isMobile ? "calc(12px / 1.2)" : "10px"}
        >
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </CheckboxWrapper>
  );
};

export default CheckboxWithLabel;
