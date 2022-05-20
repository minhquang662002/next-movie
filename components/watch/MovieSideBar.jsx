import Link from "next/link";
import Image from "next/image";
import { TMDB_imageResize } from "../../utils/constant";

const MovieSideBar = ({ similiar }) => {
  return (
    <>
      <p className="uppercase font-bold">similar movie</p>
      <div className="flex flex-col max-h-132 overflow-y-scroll">
        {similiar.results.map((item) => {
          return (
            <Link href={`/movie/${item.id}`} key={item.id}>
              <div className="flex gap-x-4 p-2 hover:bg-red-600 cursor-pointer transition">
                <div>
                  <Image
                    className="rounded-lg"
                    src={TMDB_imageResize("original", item.poster_path)}
                    width={100}
                    height={150}
                  />
                </div>
                <p className="w-2/4">{item.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default MovieSideBar;
