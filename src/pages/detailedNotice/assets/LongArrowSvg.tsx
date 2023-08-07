import colorSet from "src/styles/colorSet";

interface LongArrowSvgProps {
  onClick?: () => void;
  right?: boolean;
  deselected?: boolean;
}

const LongArrowSvg = ({ onClick, right, deselected }: LongArrowSvgProps) => {
  return (
    <svg
      width="62"
      height="243"
      viewBox="0 0 62 243"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{
        transform: right ? "rotate(180deg)" : undefined,
        cursor: "pointer",
      }}
    >
      <path
        d="M56 5L6 121.5L56 238"
        stroke={deselected ? colorSet.secondaryText : colorSet.colorless}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LongArrowSvg;
