import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type React from "react";
import cn from "classnames";
import styles from "./CardCarousel.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Card {
  photo: string;
  name: string;
}

interface CardCarouselProps {
  cards: Card[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards }) => (
  <div className={styles.container}>
    <Swiper
      modules={[Navigation, Pagination]}
      direction="horizontal"
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {cards.map((card, index) => (
        <SwiperSlide key={index}>
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

export default CardCarousel;
