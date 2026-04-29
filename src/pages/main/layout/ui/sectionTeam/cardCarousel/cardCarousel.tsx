import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type React from "react";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

interface Card {
  photo: string;
  name: string;
}

interface CardCarouselProps {
  cards: Card[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards }) => (
  <Swiper
    modules={[Navigation, Pagination]}
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
    {cards.map((card) => (
      <SwiperSlide key={card.photo}>
        <div className="card">
          <img src={card.photo} alt={"photo " + card.name} />
          <p>{card.name}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default CardCarousel;