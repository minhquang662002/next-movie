import { getFilmDetail, getSimiliar } from "../../../utils/api";
import Head from "next/head";
import MovieSideBar from "../../../components/watch/MovieSideBar";
import { useContext, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import CommentSection from "../../../components/watch/comment/CommentSection";

const watch = (props) => {
  const { id, similiar, filmData } = props;
  const { user } = useContext(GlobalContext);
  const videoRef = useRef();

  return (
    <>
      <Head>
        <title>{filmData.title}</title>
      </Head>
      <div className="p-10">
        <div className="lg:flex gap-x-10 font-sora">
          <div className="flex flex-col flex-grow">
            <iframe
              ref={videoRef}
              allowFullScreen
              src={`https://www.2embed.to/embed/tmdb/movie?id=${id}`}
              className="w-full lg:h-full"
            />
            <div className="my-4">
              <h1 className="font-sans text-xl lg:text-3xl">
                {filmData.title}
              </h1>
              <i className="text-xs lg:text-base">{filmData.tagline}</i>
              <div className="flex gap-x-1">
                {filmData.genres.map((item) => (
                  <span
                    className="mt-2 mb-4 text-xs lg:text-sm px-2 py-1 text-center whitespace-nowrap border border-white rounded-full"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <p className="text-sm lg:text-base">{filmData.overview}</p>
            </div>
          </div>

          <div className="lg:w-1/4 lg:shrink-0">
            <MovieSideBar similiar={similiar} />
          </div>
        </div>
        <CommentSection user={user} id={id} media_type="movie" />
      </div>
    </>
  );
};

export const getStaticProps = async (context) => {
  const {
    params: { id },
  } = context;
  const similiar = await getSimiliar("movie", id);
  const {
    props: { filmData },
  } = await getFilmDetail("movie", id);
  return {
    props: {
      id,
      similiar,
      filmData,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default watch;
