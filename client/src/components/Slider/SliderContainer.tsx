import React from "react";
import Slider from "./Slider";

const SliderContainer = () => {
  const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

  return (
    <>
      <Slider images={images} autoPlay={false} showButtons={true} />
    </>
  );
};

export default SliderContainer;
