import { useEffect, useState } from "react";
import styled from "styled-components";

const Carouselcontainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 576px) {
    display: block;
    height: 100%;
  }
`;

const CarouselImg = styled.img`
  width: 100%;
  opacity: 0;
  transition: 1s;
  &.loaded {
    opacity: 1;
  }
`;

const CarouselButtonContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  background-color: transparent;
  position: absolute;

  @media screen and (max-width: 576px) {
    top: 0;
    height: 100%;
  }
`;

const CarouselButton = styled.button`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 10px;
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

interface Props {
  images: string[];
  autoPlay?: boolean;
  showButtons?: boolean;
}

export default function Carousel(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(props.images[0]);
  const [loaded, setLoaded] = useState(false);

  const selectNewImage = (index: number, images: string[], next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 200);
  };

  const previous = () => {
    selectNewImage(selectedIndex, props.images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, props.images);
  };

  return (
    <Carouselcontainer>
      <CarouselImg
        src={require(`../../../../assets/imagenesSliderTuHamburguesa/${selectedImage}`)}
        alt="Gentleman"
        className={loaded ? "loaded" : ""}
        onLoad={() => setLoaded(true)}
      />
      <CarouselButtonContainer>
        {props.showButtons ? (
          <>
            <CarouselButton onClick={previous}>{"<"}</CarouselButton>
            <CarouselButton onClick={next}>{">"}</CarouselButton>
          </>
        ) : (
          <></>
        )}
      </CarouselButtonContainer>
    </Carouselcontainer>
  );
}
