import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Button = styled.button`
  font-family: Arial;
  font-weight: 600;
  text-transform: uppercase;
  font-size: calc(var(--index) * 0.71);
  letter-spacing: -0.02vw;
  padding: calc(var(--index) * 0.3) calc(var(--index) * 0.7);
  background-color: transparent;
  color: #fff;
  border-radius: 10em;
  border: rgba(255, 255, 255, 0.5) 3px solid;
  outline: none;
  margin: calc(var(--index) * 2.5) calc(var(--index) * 0.9);
  cursor: pointer !important;
`;

const MainPageWrapper = styled.div`
  background-color: #000;
  color: #fff;
  font-family: kamerik-3d;
`;

const MainLogo = styled.div`
  width: calc(var(--logo-size) * 0.5);
  height: calc(var(--logo-size) * 0.5);
  background-repeat: no-repeat;
  position: absolute;
  left: calc(51% - calc(var(--logo-size) * 0.25));
  top: calc(var(--index) * 2);
  z-index: 1;
`;

const Layers = styled.section`
  perspective: 1000px;
  overflow: hidden;
`;

const LayersContainer = styled.div`
  height: 100vh;
  min-height: 500px;
  transform-style: preserve-3d;
  transform: rotateX(var(--move-y)) rotateY(var(--move-x));
  will-change: transform;
  transition: transform var(--transition-2);
`;

const LayersItem = styled.div`
  position: absolute;
  inset: -5vw;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &.layer-1 {
    transform: translateZ(-100px) scale(1.1);
  }

  &.layer-2 {
    transform: translateZ(-50px) scale(0.9);
    filter: blur(2px);
  }

  &.layer-3 {
    transform: translateZ(-30px) scale(0.85);
    filter: blur(1px);
  }

  &.layer-4 {
    transform: translateZ(-30px) scale(1);
  }

  &.layer-5 {
    transform: translateZ(250px) scale(0.95);
  }
`;

const HeroContent = styled.div`
  font-size: calc(var(--index) * 1.5);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: calc(var(--index) * 0.15);
  line-height: 1.35em;
  margin-top: calc(var(--index) * 2);
  color: #fff;

  & span {
    display: block;
  }

  .hero-content__p {
    text-transform: none;
    font-family: merriweather-italic-3d;
    letter-spacing: normal;
    font-size: calc(var(--index) * 0.9);
    line-height: 3;
  }

  /* Frosted Glass Effect */
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  backdrop-filter: brightness(1.2);
`;

const MyNavLink = styled(Link)`
  font-family: Arial;
  font-weight: 600;
  text-transform: uppercase;
  font-size: calc(var(--index) * 0.71);
  letter-spacing: -0.02vw;
  padding: calc(var(--index) * 0.7) calc(var(--index) * 1.25);
  background-color: transparent;
  color: #fff;
  border-radius: 10em;
  border: rgb(255 255 255 / 0.4) 3px solid;
  outline: none;
  margin-top: calc(var(--index) * 2.5);
  cursor: pointer !important;
`;

export {
  Button,
  MainPageWrapper,
  MainLogo,
  Layers,
  LayersContainer,
  LayersItem,
  HeroContent,
  MyNavLink,
};
