import { useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Head from "next/head";
import FIlmItem from "../components/filmItem/FilmItem";
import { useFirestore } from "../hooks/useFirestore";

const WatchList = () => {
  const { user } = useContext(GlobalContext);
  const q = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "==",
      compareValue: `${user?.uid}`,
    };
  }, [user]);
  const data = useFirestore("watchlist", q);

  return (
    <>
      <Head>
        <title>Watchlist</title>
      </Head>
      <div className="max-w-[1450px] mx-auto py-4">
        <p className="font-sans text-3xl mb-8">Watchlist</p>
        <div className="grid grid-cols-6 text-center">
          {data?.[0]?.watchlist?.map((item) => (
            <FIlmItem item={item} mediaType={item.media_type} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchList;
