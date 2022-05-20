import Head from "next/head";
import { TMDB_imageResize } from "../../../utils/constant";
import { StarIcon, PlayIcon } from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getFilmDetail, getReviews, addToList } from "../../../utils/api";
import Review from "../../../components/review/Review";
import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/outline";

const MoviePage = (props) => {
  const {
    filmInfo: { filmData, castData },
    reviews,
  } = props;
  const sortedReviews = reviews.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{filmData.title}</title>
      </Head>
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="h-3/4 w-full bg-cover brightness-50 layer"
          style={{
            backgroundImage: `url(${TMDB_imageResize(
              "original",
              filmData.backdrop_path
            )})`,
          }}
        />
        <div className="absolute top-16 left-12 text-white">
          <div className="flex max-w-4xl">
            <h1 className="font-bold text-6xl font-sans">{filmData.title}</h1>
            <div className="flex gap-x-2 my-4 items-start">
              <PlusCircleIcon
                className="h-8 w-8 hover:text-red-600 cursor-pointer transition-colors"
                onClick={() =>
                  addToList(
                    "movie",
                    filmData.id,
                    filmData.name,
                    filmData.poster_path
                  )
                }
              />
              <UserGroupIcon className="h-6 w-6 hover:text-red-600 cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="flex gap-x-2 font-sora my-4">
            {filmData.genres.map((item) => {
              return (
                <Link
                  href={`/genre/${router.query.mediaType}/${item.id}?page=1`}
                  key={item.id}
                >
                  <div className="cursor-pointer transition hover:text-red-600 hover:border-red-600 font-bold text-sm border-white border-2 w-auto py-2 px-4 rounded-3xl text-center whitespace-nowrap">
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="font-sora max-w-2xl my-2">{filmData.overview}</p>
          <div className="flex items-center gap-x-2">
            <StarIcon className="2-6 h-6 text-red-600 border border-red-600 rounded-full p-1" />
            <p>
              <span className="font-bold text-3xl text-red-600 mt-2">
                {filmData.vote_average}
              </span>
              <sub>/ 10</sub>
            </p>
            <span>({filmData.vote_count} votes)</span>
          </div>
          <div className="max-w-2xl">
            <h2 className="font-sora text-2xl text-white my-8">Cast</h2>
            <Swiper
              slidesPerView="auto"
              loop={true}
              slidesPerGroupAuto
              spaceBetween={20}
            >
              {castData.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="!w-[100px] select-none">
                    <Link
                      href={`https://en.wikipedia.org/wiki/${item.name.replace(
                        " ",
                        "_"
                      )}`}
                      passHref
                    >
                      <a>
                        <Image
                          className="rounded-lg"
                          width={100}
                          height={150}
                          src={TMDB_imageResize("original", item.profile_path)}
                        />
                        <p className="text-sm">{item.name}</p>
                      </a>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <Link href={`${router.asPath}/watch`}>
          <div className="absolute top-48 right-32 text-white flex flex-col items-center gap-y-4 hover:text-red-600 transition-colors">
            <PlayIcon className="transform w-20 h-20 cursor-pointer" />
            <p className="font-bold font-sora text-lg uppercase">Play now</p>
          </div>
        </Link>
      </div>
      {sortedReviews.length > 0 && (
        <div className="max-w-[1450px] mx-auto ">
          <h2 className="font-bold text-3xl underline decoration-red-600 decoration-4">
            Reviews
          </h2>
          <div className="grid grid-cols-4 gap-x-4 items-start">
            {sortedReviews.map((item) => (
              <Review key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticProps(context) {
  const { id } = context.params;
  const { props } = await getFilmDetail("movie", id);
  const reviews = await getReviews("movie", id);
  return {
    props: {
      reviews,
      filmInfo: props,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default MoviePage;
