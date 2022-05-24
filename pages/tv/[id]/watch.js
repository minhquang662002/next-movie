import { getFilmDetail, getSimiliar } from "../../../utils/api";
import Head from "next/head";
import { getTVSeasons } from "../../../utils/api";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import TVSideBar from "../../../components/watch/TVSideBar";
import CommentSection from "../../../components/watch/comment/CommentSection";

const watch = (props) => {
  const { id, filmData, seasonsList } = props;
  const {
    query: { ep, season },
  } = useRouter();
  const { user } = useContext(GlobalContext);
  return (
    <>
      <Head>
        <title>{filmData.name}</title>
      </Head>
      <div className="p-10">
        <div className="block md:flex lg:flex gap-x-10 font-sora">
          <div className="flex flex-grow flex-col">
            <iframe
              allowFullScreen
              src={`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${ep}`}
              className="max-h-96 lg:h-120 w-full"
            />
            <div className="my-4">
              <h1 className="font-sans text-3xl">{filmData.name}</h1>
              <i className="">{filmData.tagline}</i>
              <div className="flex gap-2 flex-wrap my-2">
                {filmData.genres.map((item, index) => (
                  <span
                    className="text-sm px-2 py-1 text-center whitespace-nowrap border border-white rounded-full"
                    key={index}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <p>
                {seasonsList
                  .filter((item) => item.season_number == season)
                  .map((info, index) => (
                    <span key={index}>{info.overview}</span>
                  ))}
              </p>
            </div>
          </div>

          <div className="md:w-1/4 lg:w-1/4 shrink-0 w-full">
            <TVSideBar
              seasonsList={seasonsList}
              ep={ep}
              season={season}
              id={id}
            />
          </div>
        </div>
        <CommentSection user={user} media_type="tv" />
      </div>
    </>
  );
};

export const getStaticProps = async (context) => {
  const {
    params: { id },
  } = context;
  const similiar = await getSimiliar("tv", id);
  const {
    props: { filmData },
  } = await getFilmDetail("tv", id);
  const seasonsList = await getTVSeasons(filmData.seasons, id);
  return {
    props: {
      id,
      similiar,
      filmData,
      seasonsList,
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
