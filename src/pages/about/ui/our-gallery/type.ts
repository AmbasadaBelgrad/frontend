export type Image = {
  id: number;
  url: string;
  alt: string;
};

export type TCarousel = {
  title: string;
  images: Image[];
};

export interface ICarouselProps {
  data: TCarousel;
}
