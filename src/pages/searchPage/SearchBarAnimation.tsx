import styled, { keyframes } from "styled-components";

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

const AnimationWrapper = styled.div`
  animation: ${fadeInWithGoUp} 0.5s cubic-bezier(0, 0.51, 0.38, 1);
`;

const SearchBarAnimation = {
  fadeInWithGoUp,
  AnimationWrapper,
};

export default SearchBarAnimation;
