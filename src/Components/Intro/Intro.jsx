import { observer } from "mobx-react";
import { useState, useEffect, useRef } from "react";
import Image from "../Common/Image";
import data from "./IntroData";
import { Carousel } from "react-responsive-carousel";
import styles from "./Intro.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AppStore from "../../Configs/index";
import EDUCATION from "../../Assets/Intro/education.png";
import PERSONAL_PROJECTS from "../../Assets/Intro/PERSONAL_PROJECTS.png";
import ORG_PROJECTS from "../../Assets/Intro/ORG_PROJECTS.png";
import WORK_EXP from "../../Assets/Intro/work_exp.jpg";
import SKILLS from "../../Assets/Intro/SKILLS.png";
const ImageGroup = [EDUCATION, SKILLS, WORK_EXP, PERSONAL_PROJECTS, ORG_PROJECTS];
console.log("IntroData : ", data);

const Intro = observer(() => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isMouseDragging, setIsMouseDragging] = useState(false);
  const onSwipeCarouselStart = (e) => {
    setIsMouseDragging(true);
  };

  const onSwipeCarouselEnd = (e) => {
    setIsMouseDragging(false);
  };

  return (
    <section className={styles.WhyIntroClass}>
      <div className={styles.IntroMainContainer}>
        <Carousel
          className={`${styles.IntroCarouselContainer} ${
            isMouseDragging ? "Grabbing" : "Grab"
          }`}
          selectedItem={selectedItem}
          infiniteLoop
          emulateTouch={true}
          autoPlay={true}
          showStatus={false}
          showThumbs={false}
          showArrows={false}
          onSwipeStart={onSwipeCarouselStart}
          onSwipeEnd={onSwipeCarouselEnd}
          onChange={(current) => {
            setSelectedItem(current);
            // onChangeItem()
          }}
          interval={7000}
        >
          {data.map((cardinfo, index) => (
            <div
              key={"Intro_RightCont_" + index}
              className={`${styles.IntroCarouselBox}`}
            >
              <div style={{ width: "fit-content" }}>
                <Image
                  src={ImageGroup[cardinfo.id - 1]}
                  alt={cardinfo.alt}
                  lazy
                  width={cardinfo.imageDim[AppStore.device].width}
                  height={cardinfo.imageDim[AppStore.device].height}
                />
              </div>
              <h3
                className={styles.IntroCarouselContent}
                dangerouslySetInnerHTML={{ __html: cardinfo.content }}
              ></h3>
              <div
                className={styles.IntroCarouselTitle}
                dangerouslySetInnerHTML={{ __html: cardinfo.title }}
              ></div>
              <div
                className={styles.IntroCarouselDescription}
                dangerouslySetInnerHTML={{ __html: cardinfo.description }}
              ></div>
              <div
                className={styles.IntroCarouselTitle}
                dangerouslySetInnerHTML={{ __html: cardinfo.title2 }}
              ></div>
              <div
                className={styles.IntroCarouselDescription}
                dangerouslySetInnerHTML={{ __html: cardinfo.description2 }}
              ></div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
});

export default Intro;
