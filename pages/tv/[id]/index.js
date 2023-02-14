import Head from "next/head";
import { TMDB_imageResize } from "../../../utils/constant";
import { StarIcon, PlayIcon, HeartIcon } from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getFilmDetail, getReviews, addToList } from "../../../utils/api";
import Review from "../../../components/review/Review";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { db } from "../../../firebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";

const MoviePage = (props) => {
  const {
    filmInfo: { filmData, castData },
    reviews,
  } = props;
  const sortedReviews = reviews.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const { user } = useContext(GlobalContext);
  useEffect(() => {
    if (!user) {
      return;
    }
    const unsub = onSnapshot(doc(db, "users", user?.uid), (doc) => {
      setAdded(doc.data()?.bookmark?.some((item) => item.id === filmData.id));
    });
    return () => unsub();
  }, [filmData.id, user]);
  return (
    <>
      <Head>
        <title>{filmData.name}</title>
      </Head>
      <div className="relative w-full">
        <div
          className="w-full bg-cover brightness-50 layer min-h-[550px] md:min-h-[700px] lg:min-h-[700px]"
          style={{
            backgroundImage: `url(${TMDB_imageResize(
              "original",
              filmData.backdrop_path
            )})`,
          }}
        />
        <div className="absolute top-10 left-8 md:left-12 lg:left-12 text-white">
          <div className="flex max-w-xs md:max-w-3xl lg:max-w-4xl items-center">
            <h1 className="font-bold text-xl md:text-5xl lg:text-6xl font-sans">
              {filmData.name}
            </h1>

            {added ? (
              <HeartIcon
                className="w-4 h-4 lg:h-8 lg:w-8 text-red-600 cursor-pointer transition-colors"
                onClick={() =>
                  addToList(
                    "tv",
                    filmData.id,
                    filmData.name,
                    filmData.poster_path || ""
                  )
                }
              />
            ) : (
              <HeartIcon
                className="w-4 h-4 lg:h-8 lg:w-8 text-white hover:text-red-600 cursor-pointer transition-colors"
                onClick={() =>
                  addToList(
                    "tv",
                    filmData.id,
                    filmData.name,
                    filmData.poster_path || ""
                  )
                }
              />
            )}
          </div>
          <div className="flex gap-2 font-sora my-4 flex-wrap">
            {filmData.genres.map((item) => {
              return (
                <Link
                  href={`/genre/${router.query.mediaType}/${item.id}?page=1`}
                  key={item.id}
                >
                  <div className="md:text-base lg:text-base cursor-pointer transition hover:text-red-600 hover:border-red-600 font-bold text-sm border-white border-2 py-1 px-2 md:py-2 md:px-4 lg:py-2 lg:px-4 rounded-3xl text-center whitespace-nowrap">
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="lg:hidden md:hidden text-xs md:text-base lg:text-base font-sora max-w-xs md:max-w-2xl lg:max-w-2xl my-2">
            {filmData.overview.length > 300
              ? filmData.overview.slice(0, 300) + "..."
              : filmData.overview}
          </p>
          <p className="hidden lg:block md:block font-sora max-w-xs lg:max-w-2xl my-2">
            {filmData.overview.length > 900
              ? filmData.overview.slice(0, 900) + "..."
              : filmData.overview}
          </p>
          <div className="flex items-center gap-x-2">
            <StarIcon className="h-6 text-red-600 border border-red-600 rounded-full p-1" />
            <p>
              <span className="font-bold text-xs md:text-3xl lg:text-3xl text-red-600 mt-2">
                {filmData.vote_average.toFixed(1)}
              </span>
              <sub>/ 10</sub>
            </p>
            <span>({filmData.vote_count} votes)</span>
          </div>
          <Link href={`${router.asPath}/watch`}>
            <div className="md:hidden lg:hidden bg-red-600 rounded-full text-xs font-bold w-24 h-8 flex items-center justify-center gap-x-1 my-4">
              <PlayIcon className="w-4 h-4" />
              <span>Play now</span>
            </div>
          </Link>
          <div className="max-w-xs md:max-w-2xl lg:max-w-2xl">
            <h2 className="font-sora text-2xl text-white my-8">Cast</h2>
            <Swiper
              slidesPerView="auto"
              loop={true}
              slidesPerGroupAuto
              spaceBetween={20}
            >
              {castData.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="!w-[50px] md:!w-[100px] lg:!w-[75px] select-none"
                  >
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
                          src={TMDB_imageResize("w500", item.profile_path)}
                        />
                        <p className="text-xs md:text-sm lg:text-sm">
                          {item.name}
                        </p>
                      </a>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <Link href={`${router.asPath}/watch?season=1&ep=1`}>
          <div className="hidden absolute top-48 right-32 text-white md:flex lg:flex flex-col items-center gap-y-4 hover:text-red-600 transition-colors">
            <PlayIcon className="transform w-20 h-20 cursor-pointer" />
            <p className="font-bold font-sora text-lg uppercase">Play now</p>
          </div>
        </Link>
      </div>
      {
        <div className="my-4 px-8 md:px-10 lg:px-10">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-3xl underline decoration-red-600 decoration-4">
            Reviews
          </h2>
          <div className="md:grid md:grid-cols-4 md:gap-x-4 md:items-start lg:grid lg:grid-cols-4 lg:gap-x-4 lg:items-start">
            {sortedReviews.map((item) => (
              <Review key={item.id} item={item} />
            ))}
          </div>
        </div>
      }
    </>
  );
};

export async function getStaticProps(context) {
  const { id } = context.params;
  const { props } = await getFilmDetail("tv", id);
  const reviews = await getReviews("tv", id);
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
