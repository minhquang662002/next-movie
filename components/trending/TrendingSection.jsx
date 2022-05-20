import Image from "next/image";
import { TMDB_imageResize } from "../../utils/constant";
import { getGenreName } from "../../utils/constant";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/outline";

const TrendingSection = ({ trendingData }) => {
  return (
    <div className="font-sora mt-10 mb-24">
      <h2 className="text-3xl py-8">Trending today</h2>
      <div className="grid grid-cols-3 h-[500px] gap-x-10">
        <div className="col-span-2">
          <div className="relative h-3/4 group">
            <Image
              src={TMDB_imageResize("original", trendingData[0].backdrop_path)}
              layout="fill"
              objectFit="cover"
              className="rounded-lg group-hover:brightness-50 transition"
              priority={true}
            />
            <Link
              href={`/${trendingData[0].media_type}/${trendingData[0].id}/watch`}
            >
              <PlayIcon className="group-hover:visible invisible absolute w-24 h-24 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:text-red-600 transition" />
            </Link>
          </div>
          <div className="py-4">
            <h3 className="text-3xl">
              {trendingData[0].title || trendingData[0].name}
            </h3>
            <div className="flex gap-x-2 my-2">
              {getGenreName(trendingData[0].genre_ids).map((genre) => (
                <Link
                  href={`/genre/${trendingData[0].media_type}/${genre.id}?page=1`}
                  key={genre.id}
                >
                  <span className="rounded-full border border-white py-1 px-2 text-sm hover:border-red-600 hover:text-red-600 cursor-pointer">
                    {genre.name}
                  </span>
                </Link>
              ))}
            </div>
            <div>{trendingData[0].overview}</div>
          </div>
        </div>

        <div className="bg-gray-600 rounded-lg overflow-y-scroll border-track">
          {trendingData.slice(1, 11).map((item, index) => {
            return (
              <div
                className="hover:bg-black transition relative overflow-hidden"
                key={index}
              >
                <div
                  className="absolute bg-cover layer-right brightness-50 h-full w-full"
                  style={{
                    backgroundImage: `url(${TMDB_imageResize(
                      "w500",
                      item.backdrop_path
                    )})`,
                  }}
                />
                <div className="flex gap-x-10 !brightness-100 p-2">
                  <div className="shrink-0">
                    <Image
                      src={TMDB_imageResize("w200", item.poster_path)}
                      width={100}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/${item.media_type}/${item.id}`}>
                      <h3 className="text-xl hover:text-red-600 cursor-pointer">
                        {item.title || item.name}
                      </h3>
                    </Link>
                    <div className="flex gap-x-2 text-sm flex-wrap">
                      {getGenreName(item.genre_ids).map((genre) => (
                        <Link
                          key={genre.id}
                          href={`/genre/${item.media_type}/${genre.id}?page=1`}
                        >
                          <span className="whitespace-nowrap">
                            {genre.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
