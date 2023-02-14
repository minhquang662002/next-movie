import Head from "next/head";
import { useState } from "react";
import { basicSearch } from "../utils/api";
import FilmItem from "../components/filmItem/FilmItem";
import { useRouter } from "next/router";
import Pagination from "../components/pagination/Pagination";
import { useRef } from "react";
const SearchPage = (props) => {
  const { data } = props;
  const router = useRouter();
  const title = router.query.q?.length
    ? "uniMovie - Search"
    : `Search: ${router.query.q} | uniMovie`;
  const searchRef = useRef();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="max-w-[1450px] p-4 mx-auto font-sora">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchRef.current.length > 0) {
              router.replace(`/search?q=${searchRef.current}&page=1`);
            }
          }}
        >
          <label className="block text-3xl py-2 font-bold" htmlFor="content">
            Search:
          </label>
          <input
            type="text"
            className="w-full p-4 rounded-lg bg-gray-600"
            name="content"
            onChange={(e) => {
              searchRef.current = e.target.value;
            }}
          />
        </form>
        {data && (
          <p className="text-2xl my-2">
            Search results from &quot;{searchRef.current} &quot; :{" "}
            {data.total_results} results
          </p>
        )}
        <div className="my-4 grid grid-cols-2 md:grid-cols-5 p-10 gap-4">
          {data?.results?.map((item) => (
            <FilmItem key={item.id} item={item} mediaType={item.media_type} />
          ))}
        </div>
        {data?.total_pages > 0 && (
          <Pagination
            totalPage={data.total_pages}
            url={(page) =>
              `${router.pathname}?q=${searchRef.current}&tag=${router.query.tag}&page=${page}`
            }
          />
        )}
      </div>
    </>
  );
};

export default SearchPage;

export async function getServerSideProps(context) {
  const {
    query: { q, page },
  } = context;

  const res = q ? await basicSearch(q, page) : null;

  return {
    props: {
      data: res,
    },
  };
}
