import {
  PlusIcon,
  PlayIcon,
  StarIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useState, useRef } from "react";
import useCarousel from "../../hooks/useCarousel";
import { genreList } from "../../utils/constant";
import { addToList } from "../../utils/api";

const Carousel = ({ carouselData }) => {
  const carouselRef = useRef();
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const grabbing = useCarousel(
    carouselRef,
    displayedIndex,
    setDisplayedIndex,
    carouselData.length
  );

  return (
    <div
      className="h-64 lg:h-132 flex relative overflow-hidden"
      ref={carouselRef}
    >
      {carouselData.map((item, index) => {
        return (
          <div
            key={item.id}
            className="absolute w-full h-full shrink-0 text-white transition"
            style={{
              opacity: displayedIndex === index ? 1 : 0,
              visibility: displayedIndex === index ? "visible" : "hidden",
              cursor: grabbing ? "grabbing" : "grab",
            }}
          >
            <div
              className="w-full h-full bg-cover bg-no-repeat bg-center brightness-50"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_imagePath}${item?.backdrop_path})`,
              }}
            />

            <div className="absolute top-1/3 left-8 lg:top-32 lg:left-24 lg:max-w-2xl select-none">
              <div className="text-white font-bold lg:text-5xl lg:mb-10 font-sans">
                <h1>{item.title}</h1>
              </div>
              <div className="hidden lg:flex gap-x-4 mb-8">
                <div className="flex items-center gap-x-1">
                  <StarIcon className="w-4 h-4" />
                  <span>IMDB: {item.vote_average}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>
                    DURATION:{" "}
                    {`${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m`}
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>YEAR: {item.release_date.substring(0, 4)}</span>
                </div>
              </div>
              <div className="mb-4 lg:mb-8 text-xs flex gap-x-2">
                {item.genre_ids.map((id, index) => {
                  return genreList.map((genre) => {
                    if (genre.id === id) {
                      return (
                        <Link
                          key={index}
                          href={`/genre/movie/${genre.id}?page=1`}
                        >
                          <div className="cursor-pointer transition hover:text-red-600 hover:border-red-600 font-bold text-sm border-white border-2 w-auto py-2 px-4 rounded-3xl text-center whitespace-nowrap">
                            {genre.name}
                          </div>
                        </Link>
                      );
                    }
                  });
                })}
              </div>
              <div className="mb-8 hidden lg:block">{item.overview}</div>
              <div className="flex gap-x-4 text-xs lg:text-base">
                <Link href={`/movie/${item.id}/watch`}>
                  <button className="flex items-center justify-center gap-x-2 lg:w-36 lg:h-12 w-24 h-8 rounded-full bg-red-600 transition duration-300 hover:bg-red-500 shadow-lg hover:shadow-red-600">
                    <PlayIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                    <span> Watch now</span>
                  </button>
                </Link>
                <button
                  className="flex items-center justify-center gap-x-2 lg:w-36 lg:h-12 w-24 h-8 rounded-full bg-white text-black"
                  onClick={() =>
                    addToList("movie", item.id, item.title, item.poster_path)
                  }
                >
                  <PlusIcon className="w-4 h-4 lg:w-6 lg:h-6" />
                  <span>Add list</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
