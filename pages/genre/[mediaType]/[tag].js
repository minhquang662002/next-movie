import { getFilmByGenre } from "../../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import FilmItem from "../../../components/filmItem/FilmItem";
import Pagination from "../../../components/pagination/Pagination";
import { getGenreName } from "../../../utils/constant";

const GenrePage = (props) => {
  const { filmList } = props;
  const {
    query: { mediaType, tag },
  } = useRouter();

  return (
    <>
      <Head>
        <title>Unilight - {getGenreName([tag]).map((item) => item.name)}</title>
      </Head>
      <div className="p-6 text-white max-w-6xl mx-auto font-sora">
        <h2 className="my-8 text-2xl font-bold">
          {getGenreName([tag]).map((item) => item.name)}
        </h2>
        <div className="grid grid-cols-5 gap-6 m-auto">
          {filmList?.results.map((item, index) => (
            <FilmItem item={item} key={index} mediaType={mediaType} />
          ))}
        </div>
        <Pagination totalPage={filmList.total_pages} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { mediaType, tag, page },
  } = context;

  const filmList = await getFilmByGenre(mediaType, tag, page);
  return {
    props: {
      filmList,
    },
  };
}

export default GenrePage;
