import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer
} from "react-stacked-center-carousel";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import "assets/css/Slide.css";
import { Slide } from "./Slide";

const data = [
  {
    image: "https://vegreen.co.kr/img/banner/main/1920_850/04.jpg",
    altText: "vegreen",
    link: "https://vegreen.co.kr/",
  },
  {
    image: "https://i.pinimg.com/originals/d4/4f/70/d44f70a2f2705a8ae2abf46cf0163ab1.jpg",
    altText: "lush",
    link: "https://www.lush.co.kr/goods/goods_list.php?cateCd=001019",
  },
  {
    image: "https://vegantigerkorea.com/web/upload/ga09/main/pc-02.jpg",
    altText: "vegantiger",
    link: "https://vegantigerkorea.com/",
  },
  {
    image: "https://contents.sixshop.com/thumbnails/uploadedFiles/146325/default/image_1644374784678_500.png",
    altText: "unademonaco",
    link: "https://unademonaco.co.kr/home",
  },
  {
    image: "https://benope.com/web/product/big/202111/4c5b3a8e408fc8ab98539afe5263e242.jpg",
    altText: "benope",
    link: "https://benope.com/",
  },
  {
    image: "https://codegreen.io/static/media/landing3.0b6258bd.jpg",
    altText: "codegreen",
    link: "https://codegreen.io/",
  }
];

const Magazine = () => {
  const ref = React.useRef(StackedCarousel);
  return (
    <>
    {/* <Container> */}
    <div className="magazine_title">
        <h3> VEGIN'S MAGAZINE </h3>
    </div>
    <div className="card mx-auto magazine">
      <div style={{ width: "70%", position: "relative" }}>
        <ResponsiveContainer
          carouselRef={ref}
          render={(width, carouselRef) => {
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={300}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
              />
            );
          }}
        />
        <Fab
          className="card-button left"
          size="small"
          onClick={() => ref.current?.goBack()}
        >
          <KeyboardArrowLeftIcon style={{ fontSize: 60, color: "#66615b" }} />
        </Fab>
        <Fab
          className="card-button right"
          size="small"
          onClick={() => ref.current?.goNext()}
        >
          <KeyboardArrowRightIcon style={{ fontSize: 60, color: "#66615b" }} />
        </Fab>
      </div>
    </div>
    {/* </Container> */}
    </>
  );
};

export default Magazine;
