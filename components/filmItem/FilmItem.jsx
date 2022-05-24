import { TMDB_imageResize } from "../../utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { removeAddedItems } from "../../utils/api";

const FilmItem = ({ item, mediaType }) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  return (
    <div className="overflow-hidden cursor-pointer">
      <div className="relative">
        <Link href={`/${mediaType}/${item.id}`} passHref>
          <a>
            <Image
              className={`transition-all hover:scale-125 ${
                loaded ? "" : "bg-gray-600 animate-pulse"
              }`}
              src={TMDB_imageResize(`w500`, item.poster_path)}
              width={200}
              height={300}
              onLoad={() => setLoaded(true)}
              alt="movie logo"
            />
          </a>
        </Link>
        {router.asPath.includes("watchlist") && (
          <XCircleIcon
            className="w-6 h-6 absolute top-1 right-6 hover:text-red-600"
            onClick={() => removeAddedItems(item)}
          />
        )}
      </div>
      <Link href={`/${item.media_type}/${item.id}`}>
        <p className="text-xs lg:text-base font-bold cursor-pointer hover:text-red-600 transition-colors">
          {item.title || item.name || item.filmName}
        </p>
      </Link>
    </div>
  );
};

export default FilmItem;
