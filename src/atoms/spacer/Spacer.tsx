import React from "react";

interface SpaceProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
}

const Spacer = ({ width, height }: SpaceProps) => {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "100%",
        flex: `0 1 ${height}`,
      }}
    />
  );
};

export default Spacer;
