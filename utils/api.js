import client from "./customAxios";
import { auth, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  collection,
  arrayRemove,
  query,
  getDocs,
} from "firebase/firestore";

export const getHomePage = async () => {
  const routes = {
    "Trending Movies": { url: "/trending/movie/week", media_type: "movie" },
    "Popular Movies": { url: "/movie/popular", media_type: "movie" },
    "Top Rated Movies": { url: "/movie/top_rated", media_type: "movie" },
    "Trending TV": { url: "/trending/tv/week", media_type: "tv" },
    "Popular TV": { url: "/tv/popular", media_type: "tv" },
    "Top Rated TV": { url: "/tv/top_rated", media_type: "tv" },
  };

  const allRouteData = await Promise.all(
    Object.keys(routes).map((item) => client.get(routes[item].url))
  );

  const combinedData = allRouteData.reduce((final, current, index) => {
    final[Object.keys(routes)[index]] = current.data.results.map((item) => ({
      ...item,
      media_type: routes[Object.keys(routes)[index]].media_type,
    }));
    return final;
  }, {});

  const carouselFetch = (await client.get(`discover/movie`)).data.results;
  const carouselData = await Promise.all(
    carouselFetch.map(async (item) => {
      const runtime = (await client.get(`movie/${item.id}`)).data.runtime;
      return { ...item, runtime: runtime };
    })
  );
  const trendingData = (await client.get(`trending/all/day`)).data.results;

  return { combinedData, carouselData: carouselData.slice(0, 5), trendingData };
};

export const getFilmDetail = async (mediaType, id) => {
  const filmData = await client.get(`${mediaType}/${id}`);
  const castData = await client.get(`${mediaType}/${id}/credits`);
  return {
    props: {
      filmData: filmData.data,
      castData: castData.data.cast
        .filter((item) => item.profile_path)
        .slice(0, 20),
    },
  };
};

export const getFilmByGenre = async (mediaType, id, pageNumber) => {
  const response = await client.get(
    `discover/${mediaType}?api_key=${process.env.TMDB_API_KEY}&with_genres=${id}&page=${pageNumber}`
  );

  return response.data;
};

export const getSimiliar = async (mediaType, id) => {
  const response = (await client.get(`${mediaType}/${id}/similar`)).data;
  return response;
};

export const getReviews = async (mediaType, id) => {
  const response = (await client.get(`${mediaType}/${id}/reviews`)).data;
  const reviews = response.results.reduce((total, cur) => {
    if (cur.author_details.avatar_path && cur.author_details.rating) {
      total.push(cur);
    }
    return total;
  }, []);
  return reviews;
};

export const handleFormChange = (e, formValue, setFormValue) => {
  e.preventDefault();
  const { name, value } = e.target;
  setFormValue({ ...formValue, [name]: value });
};

export const signIn = (e, formValue, router) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, formValue.username, formValue.password)
    .then(() => router.push("/"))
    .catch((error) => alert(error));
};

export const signUp = async (e, formValue, router) => {
  try {
    e.preventDefault();
    const { username, email, password, confirm_password } = formValue;
    if (password !== confirm_password) {
      return alert("Password is not matched");
    }

    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, {
      displayName: username,
      photoURL:
        "https://res.cloudinary.com/dt7azkk7b/image/upload/v1651391736/next-movie/o8zox9wx0pc5pycbqplz.jpg",
    });

    router.push("/");
  } catch (error) {
    alert(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error);
  }
};

export const addToList = async (media_type, id, name, poster) => {
  if (!auth.currentUser) {
    alert("Login to add");
    return;
  }
  try {
    const collection = await getDoc(doc(db, "watchlist", auth.currentUser.uid));

    if (!collection.exists()) {
      await setDoc(doc(db, "watchlist", auth.currentUser.uid), {
        watchlist: [
          {
            media_type,
            id,
            filmID: `${media_type}${id}`,
            createdAt: new Date().toISOString(),
            filmName: name,
            poster_path: poster,
          },
        ],
        uid: auth.currentUser.uid,
      });
    } else {
      if (
        collection
          .data()
          .watchlist.some((item) => item.filmID === `${media_type}${id}`)
      ) {
        alert("Already added");
        return;
      }
      await updateDoc(doc(db, "watchlist", auth.currentUser.uid), {
        watchlist: arrayUnion({
          media_type,
          id,
          filmID: `${media_type}${id}`,
          createdAt: new Date().toISOString(),
          filmName: name,
          poster_path: poster,
        }),
      });
    }
    alert("Added");
  } catch (error) {
    alert(error);
  }
};

export const basicSearch = async (query, page) => {
  try {
    const res = await client.get(
      `search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=${page}`
    );

    const filmList = res.data.results.reduce((total, cur) => {
      if (cur.media_type !== "person") {
        total.push(cur);
      }
      return total;
    }, []);

    const finalData = { ...res.data, results: filmList };

    return finalData;
  } catch (error) {
    alert(error);
  }
};

export const getTVSeasons = async (seasons, id) => {
  try {
    const seasonsList = await Promise.all(
      seasons.map(
        async (se) =>
          (
            await client.get(`tv/${id}/season/${se.season_number}`)
          ).data
      )
    );
    const filteredSeasonList = seasonsList.filter((item) =>
      item.episodes.every((ep) => ep.still_path)
    );
    return filteredSeasonList;
  } catch (error) {
    alert(error);
  }
};

export const removeAddedItems = async (item) => {
  try {
    await updateDoc(doc(db, "watchlist", auth.currentUser.uid), {
      watchlist: arrayRemove({
        ...item,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (mediaType, id, content) => {
  if (!auth.currentUser) {
    alert("Login to add");
    return;
  }
  try {
    await addDoc(collection(db, "comments"), {
      username: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      content,
      id: `${mediaType}${id}`,
      replies: [],
      likes: 0,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    alert(error);
  }
};
