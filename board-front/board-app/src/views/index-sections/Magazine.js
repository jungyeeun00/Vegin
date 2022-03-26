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
import { Container } from "reactstrap";

const data = [
  {
    image: "https://assets.vogue.com/photos/61bd0b4a1b84e62f58b4d5a1/master/w_1920,c_limit/VO0222_Cover_Logo.jpg",
    altText: "Somewhere",
    caption: "Somewhere",
  },
  {
    image: "https://assets.vogue.com/photos/62033851bf3f223aebd2f948/master/w_1600,c_limit/VO0322_SocialCover_logo_R2.jpg",
    altText: "Somewhere1",
    caption: "Somewhere1",
  },
  {
    image: "https://assets.vogue.com/photos/61ae16157c13ee66d47c2972/master/w_1920,c_limit/VO0122_SocialCover_logo.jpg",
    altText: "Somewhere2",
    caption: "Somewhere2",
  },
  {
    image: require("assets/img/soroush-karimi.jpg"),
    altText: "Somewhere3",
    caption: "Somewhere3",
  },
  {
    image: require("assets/img/federico-beccari.jpg"),
    altText: "Somewhere4",
    caption: "Somewhere4",
  },
  {
    image: require("assets/img/joshua-stannard.jpg"),
    altText: "Somewhere5",
    caption: "Somewhere6",
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
          <KeyboardArrowLeftIcon style={{ fontSize: 60 }} />
        </Fab>
        <Fab
          className="card-button right"
          size="small"
          onClick={() => ref.current?.goNext()}
        >
          <KeyboardArrowRightIcon style={{ fontSize: 60 }} />
        </Fab>
      </div>
    </div>
    {/* </Container> */}
    </>
  );
};

export default Magazine;
