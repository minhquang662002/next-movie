import Head from "next/head";
import { useState } from "react";
import { handleFormChange } from "../utils/api";
import { basicSearch } from "../utils/api";
import FilmItem from "../components/filmItem/FilmItem";
import { useRouter } from "next/router";
import Pagination from "../components/pagination/Pagination";

const SearchPage = (props) => {
  const { data } = props;
  const [searchValue, setSearchValue] = useState({ content: "" });
  const router = useRouter();

  return (
    <>
      <Head>
        <title>UniMovie - Search</title>
      </Head>
      <div className="max-w-[1450px] p-4 mx-auto font-sora">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchValue.content.length > 0) {
              router.replace(`/search?q=${searchValue.content}&page=1`);
            }
          }}
        >
          <label className="block text-3xl py-2 font-bold" htmlFor="content">
            Search:
          </label>
          <input
            type="text"
            className="w-full p-4 rounded-lg bg-gray-600"
            value={searchValue.content}
            name="content"
            onChange={(e) => handleFormChange(e, searchValue, setSearchValue)}
          />
        </form>
        <div className="my-4 grid grid-cols-2 md:grid-cols-5 p-10 gap-4">
          {data?.results?.map((item) => (
            <FilmItem item={item} mediaType={item.media_type} />
          ))}
        </div>
        <Pagination
          totalPage={data?.total_pages}
          url={`/search?q=${searchValue.content}`}
          cont={true}
        />
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
