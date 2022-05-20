import { movieGenres, tvGenres } from "../../utils/constant";
import Link from "next/link";

const GenresTable = ({ mediaType }) => {
  return (
    <div className="bg-black text-white text-sm p-4">
      <ul className="grid grid-cols-3 gap-y-4">
        {mediaType === "movie"
          ? movieGenres.map((item) => (
              <Link
                href={`/genre/${mediaType}/${item.id}?page=1`}
                key={item.id}
              >
                <li className="hover:text-red-600 whitespace-nowrap">
                  {item.name}
                </li>
              </Link>
            ))
          : tvGenres.map((item) => (
              <Link
                key={item.id}
                href={`/genre/${mediaType}/${item.id}?page=1`}
              >
                <li className="hover:text-red-600 whitespace-nowrap">
                  {item.name}
                </li>
              </Link>
            ))}
      </ul>
    </div>
  );
};

export default GenresTable;
