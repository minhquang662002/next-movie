import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from "react";
import { handleFormChange } from "../utils/api";
import useDebounce from "../hooks/useDebounce";
import { useRouter } from "next/dist/client/router";
import { basicSearch } from "../utils/api";
import FilmItem from "../components/filmItem/FilmItem";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchPage = (props) => {
  const { data } = props;
  const [searchValue, setSearchValue] = useState({ content: "" });
  const [searchedItems, setSearchedItems] = useState([]);
  const debounceSearchTerm = useDebounce(searchValue, 500);
  const router = useRouter();
  const previous = useRef(debounceSearchTerm.content);
  const [page, setPage] = useState(1);
  const increasePage = useCallback(() => setPage(page + 1), [page]);

  useEffect(() => {
    if (
      debounceSearchTerm.content !== "" &&
      debounceSearchTerm.content !== previous.current
    ) {
      router.push(`?q=${debounceSearchTerm.content}&page=${1}`);
    }
    return () => {
      setSearchedItems([]);
      setPage(1);
    };
  }, [debounceSearchTerm]);

  useEffect(() => {
    if (debounceSearchTerm.content) {
      router.push(`?q=${debounceSearchTerm.content}&page=${page}`, undefined, {
        scroll: false,
      });
    }
  }, [page]);

  useEffect(() => {
    if (props.data) {
      setSearchedItems((state) => [...state, ...props.data.results]);
    }
  }, [props.data]);

  return (
    <>
      <Head>
        <title>UniMovie - Search</title>
      </Head>
      <div className="max-w-[1450px] p-4 mx-auto font-sora">
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
        {debounceSearchTerm.content && data && (
          <p className="my-4 text-2xl">
            Results from "{debounceSearchTerm.content}" ({data.total_results}{" "}
            results found):
          </p>
        )}

        <div className="my-4">
          <InfiniteScroll
            className="grid grid-cols-5 gap-6 m-auto"
            dataLength={searchedItems.length}
            next={increasePage}
            hasMore={true}
          >
            {searchedItems?.map((item, index) => (
              <FilmItem item={item} key={index} mediaType={item.media_type} />
            ))}
          </InfiniteScroll>
        </div>
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
