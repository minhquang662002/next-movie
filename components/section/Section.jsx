import { Swiper, SwiperSlide } from "swiper/react";
import FilmItem from "../filmItem/FilmItem";

const Section = ({ section, data }) => {
  return (
    <div className="text-white">
      <p className="text-2xl lg:text-3xl py-4 font-sora uppercase">{section}</p>

      <Swiper
        slidesPerView="auto"
        loop={true}
        slidesPerGroupAuto
        spaceBetween={20}
        className="text-center"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index} className="!w-[200px]">
              <FilmItem item={item} mediaType={item.media_type} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Section;
