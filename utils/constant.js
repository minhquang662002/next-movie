export const TMDB_IMAGE_PATH = "https://image.tmdb.org/t/p/";

export const TMDB_imageResize = (value, path) => {
  return `${TMDB_IMAGE_PATH}${value}${path}`;
};

export const genreList = [
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 36, name: "History" },
  { id: 37, name: "Western" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 878, name: "Science Fiction" },
  { id: 9648, name: "Mystery" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 10751, name: "Family" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10762, name: "Kids" },
  { id: 10763, name: "News" },
  { id: 10770, name: "TV Movie" },
  { id: 10752, name: "War" },
  { id: 10768, name: "War & Politics" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
];

export const getGenreName = (list) => {
  const nameList = list.reduce((total, cur) => {
    total.push(genreList.filter((item) => item.id == cur)[0]);
    return total;
  }, []);
  return nameList;
};
