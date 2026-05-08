import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import type React from "react";
import { useRef } from "react";
import cn from "classnames";
import styles from "./cardCarousel.module.css";
import "swiper/css";
import "swiper/css/navigation";
import type { Member } from "../ui/type";

interface CardCarouselProps {
  cards: Member[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startAutoSlide = (direction: "next" | "prev") => {
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(() => {
      if (!swiperRef.current) return;

      direction === "next"
        ? swiperRef.current.slideNext()
        : swiperRef.current.slidePrev();
    }, 600);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.leftZone}
        onMouseEnter={() => startAutoSlide("prev")}
        onMouseLeave={stopAutoSlide}
      />

      <div
        className={styles.rightZone}
        onMouseEnter={() => startAutoSlide("next")}
        onMouseLeave={stopAutoSlide}
      />

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        direction="horizontal"
        slidesPerView="auto"
        loop={false}
        breakpoints={{
          1023: { spaceBetween: 20 },
          1280: { spaceBetween: 25 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <div className={styles.card_container}>
              <div
                className={cn(
                  styles.bg_shape,
                  index % 2 === 0
                    ? styles.bg_shape_purple
                    : styles.bg_shape_green,
                )}
              ></div>
              <div className={styles.photo_container}>
                <img src={card.photo} alt={"photo " + card.name} />
              </div>
                <p className={styles.name}>{card.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarousel;
