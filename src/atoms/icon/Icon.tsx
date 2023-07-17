import React from "react";
import styled from "styled-components";

import addImgBlack from "./assets/addImgBlack.svg";
import arrowCircleLeftDeselected from "./assets/arrowCircleRightDeselected.svg";
import arrowCircleRightDeselectedFilled from "./assets/arrowCircleRightDeselectedFilled.svg";
import arrowCircleLeftPrimary from "./assets/arrowCircleRightPrimary.svg";
import arrowCircleRightPrimaryFilled from "./assets/arrowCircleRightPrimaryFilled.svg";
import arrowLeftWhite from "./assets/arrowLeftWhite.svg";
import bellPrimary from "./assets/bellPrimary.svg";
import documentBlack from "./assets/documentBlack.svg";
import githubWhite from "./assets/githubWhite.svg";
import instagramWhite from "./assets/instagramWhite.svg";
import linesBlack from "./assets/linesBlack.svg";
import searchPrimary from "./assets/searchPrimary.svg";
import searchWhite from "./assets/searchWhite.svg";
import tagBlack from "./assets/tagBlack.svg";
import userWhite from "./assets/userWhite.svg";
import xPrimary from "./assets/xPrimary.svg";

interface EachIconProps {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
}

interface IconProps extends EachIconProps {
  src: string;
  alt?: string;
}

interface IconImgProps {
  cssWidth?: React.CSSProperties["width"];
  cssHeight?: React.CSSProperties["height"];
}

const IconImg = styled.img<IconImgProps>`
  width: ${({ cssWidth }) => (cssWidth ? cssWidth : null)};
  height: ${({ cssHeight }) => (cssHeight ? cssHeight : null)};
`;

const Icon = ({ src, alt, width, height }: IconProps) => {
  return <IconImg src={src} alt={alt} cssWidth={width} cssHeight={height} />;
};

const AddImgBlack = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={addImgBlack}
      alt={"img add icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const ArrowCircleRightDeselected = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleLeftDeselected}
      alt={"arrow circle left deselected icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const ArrowCircleLeftDeselected = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleLeftDeselected}
      alt={"arrow circle right deselected icon"}
      cssWidth={width}
      cssHeight={height}
      style={{ transform: "rotate(180deg)" }}
    />
  );
};

const ArrowCircleRightPrimary = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleLeftPrimary}
      alt={"arrow circle left primary icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const ArrowCircleLeftPrimary = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleLeftPrimary}
      alt={"arrow circle right primary icon"}
      cssWidth={width}
      cssHeight={height}
      style={{ transform: "rotate(180deg)" }}
    />
  );
};

const ArrowCircleRightDeselectedFilled = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleRightDeselectedFilled}
      alt={"arrow circle left deselected icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const ArrowCircleLeftDeselectedFilled = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleRightDeselectedFilled}
      alt={"arrow circle right deselected icon"}
      cssWidth={width}
      cssHeight={height}
      style={{ transform: "rotate(180deg)" }}
    />
  );
};

const ArrowCircleRightPrimaryFilled = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleRightPrimaryFilled}
      alt={"arrow circle left primary icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const ArrowCircleLeftPrimaryFilled = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowCircleRightPrimaryFilled}
      alt={"arrow circle right primary icon"}
      cssWidth={width}
      cssHeight={height}
      style={{ transform: "rotate(180deg)" }}
    />
  );
};

const ArrowLeftWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowLeftWhite}
      alt={"arrow left white icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const ArrowRightWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowLeftWhite}
      alt={"arrow right white icon"}
      cssWidth={width}
      cssHeight={height}
      style={{ transform: "rotate(180deg)" }}
    />
  );
};

const ArrowUpWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowLeftWhite}
      alt={"arrow up white icon"}
      cssWidth={width}
      cssHeight={height}
      style={{ transform: "rotate(90deg)" }}
    />
  );
};

const ArrowDownWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={arrowLeftWhite}
      alt={"arrow down white icon"}
      cssWidth={width}
      cssHeight={height}
      style={{ transform: "rotate(270deg)" }}
    />
  );
};

const BellPrimary = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={bellPrimary}
      alt={"bell primary icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const DocumentBlack = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={documentBlack}
      alt={"document black icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const GithubWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={githubWhite}
      alt={"github white icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const InstagramWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={instagramWhite}
      alt={"instagram white icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const LinesBlack = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={linesBlack}
      alt={"lines black icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const SearchWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={searchWhite}
      alt={"search white icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const SearchPrimary = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={searchPrimary}
      alt={"search primary icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const TagBlack = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={tagBlack}
      alt={"tag black icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const UserWhite = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={userWhite}
      alt={"user white icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

const XPrimary = ({ width, height }: EachIconProps) => {
  return (
    <IconImg
      src={xPrimary}
      alt={"x primary icon"}
      cssWidth={width}
      cssHeight={height}
    />
  );
};

Icon.AddImgBlack = AddImgBlack;
Icon.ArrowCircleLeftDeselected = ArrowCircleLeftDeselected;
Icon.ArrowCircleRightDeselected = ArrowCircleRightDeselected;
Icon.ArrowCircleLeftPrimary = ArrowCircleLeftPrimary;
Icon.ArrowCircleRightPrimary = ArrowCircleRightPrimary;
Icon.ArrowCircleLeftDeselectedFilled = ArrowCircleLeftDeselectedFilled;
Icon.ArrowCircleRightDeselectedFilled = ArrowCircleRightDeselectedFilled;
Icon.ArrowCircleLeftPrimaryFilled = ArrowCircleLeftPrimaryFilled;
Icon.ArrowCircleRightPrimaryFilled = ArrowCircleRightPrimaryFilled;
Icon.ArrowLeftWhite = ArrowLeftWhite;
Icon.ArrowRightWhite = ArrowRightWhite;
Icon.ArrowUpWhite = ArrowUpWhite;
Icon.ArrowDownWhite = ArrowDownWhite;
Icon.BellPrimary = BellPrimary;
Icon.DocumentBlack = DocumentBlack;
Icon.GithubWhite = GithubWhite;
Icon.InstagramWhite = InstagramWhite;
Icon.LinesBlack = LinesBlack;
Icon.SearchWhite = SearchWhite;
Icon.SearchPrimary = SearchPrimary;
Icon.TagBlack = TagBlack;
Icon.UserWhite = UserWhite;
Icon.XPrimary = XPrimary;

export default Icon;
