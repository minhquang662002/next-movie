import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Head from "next/head";
import FIlmItem from "../components/filmItem/FilmItem";
import { useState, useEffect } from "react";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const WatchList = () => {
  const { user } = useContext(GlobalContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async function () {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItems(docSnap.data().bookmark);
        }
      }
    })();
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      const unsub = onSnapshot(doc(db, "users", user?.uid), (doc) => {
        setItems(doc.data().bookmark);
      });
      return () => unsub();
    }
  }, [user?.uid]);

  return (
    <>
      <Head>
        <title>Favorites</title>
      </Head>
      <div className="py-4 px-4 md:px-10">
        <p className="font-sans text-3xl mb-8">Favorites</p>
        <div className="grid grid-cols-2 md:grid-cols-7 text-center">
          {items.map((item) => (
            <FIlmItem key={item?.id} item={item} mediaType={item.media_type} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WatchList;
