import styled, { css, keyframes } from "styled-components";

const fadeInWithGoRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-40px) rotate(-30deg);
    }
    100% {
        opacity: 1;
        transform: translateX(0px) rotate(0deg);
    }
`;

const animationBezier = css`
  animation-timing-function: cubic-bezier(0, 0.51, 0.38, 1);
  animation-duration: 0.5s;
`;

const AnimationWrapper = styled.div`
  animation-name: ${fadeInWithGoRight};
  ${animationBezier}
`;

const CloseBtnAnimation = {
  fadeInWithGoRight,
  animationBezier,
  AnimationWrapper,
};

export default CloseBtnAnimation;
