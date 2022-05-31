import React from "react";
import "assets/css/Slide.css";
import { useHistory } from "react-router";

export const Slide = React.memo(function (StackedCarouselSlideProps) {
  const {
    data,
    dataIndex,
    isCenterSlide,
    swipeTo,
    slideIndex
  } = StackedCarouselSlideProps;

  const coverImage = data[dataIndex].image;
  const altText = data[dataIndex].altText;
  const link = data[dataIndex].link;

  return (
    <div className="card-card" draggable={false}>
      <div className={`cover fill ${isCenterSlide ? "off" : "on"}`}>
        <div
          className="card-overlay fill"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div className="detail fill">
        <div className="discription">
          <a href={link}>
            <img
              style={{ width: "100%", height: "100%" }}
              alt={altText}
              className="cover-image"
              src={coverImage}
            />
          </a>
        </div>
      </div>
    </div>
  );
});
