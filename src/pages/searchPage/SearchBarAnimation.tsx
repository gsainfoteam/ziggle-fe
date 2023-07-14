import styled, { css, keyframes } from "styled-components";

const fadeInWithGoUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const animationBezier = css`
  animation-timing-function: cubic-bezier(0, 0.51, 0.38, 1);
  animation-duration: 1s;
`;

const AnimationWrapper = styled.div`
  animation-name: ${fadeInWithGoUp};
  ${animationBezier}
`;

const SearchBarAnimation = {
  fadeInWithGoUp,
  animationBezier,
  AnimationWrapper,
};

export default SearchBarAnimation;
