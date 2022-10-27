import React from "react";
import Slider from "./Slider";
import styled from "styled-components";

const SliderContainer = () => {
  const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

  return (
    <SliderContainerr>
      <Slider images={images} autoPlay={false} showButtons={true} />
    </SliderContainerr>
  );
};

export default SliderContainer;

const SliderContainerr = styled.div`
  padding-top: 130px;
`;
