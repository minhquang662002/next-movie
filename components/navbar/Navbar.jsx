import { SearchIcon, UserIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import GenresTable from "./GenresTable";
import Link from "next/link";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { CollectionIcon } from "@heroicons/react/outline";
import DropDown from "./DropDown";

const Navbar = () => {
  const router = useRouter();
  const { user } = useContext(GlobalContext);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div
        className={`flex items-center justify-between fixed top-0 z-10 w-full bg-black text-xs px-2 py-1 lg:h-12 lg:px-4 lg:text-lg `}
      >
        <Link href="/">
          <h1 className="text-white font-bold text-sm lg:text-2xl hover:text-red-600 transition-colors cursor-pointer">
            UniMovie
          </h1>
        </Link>
        <ul className="flex gap-x-4 text-white">
          <Link href="/">
            <li
              className={`font-bold ${
                router.pathname === "/" ? "text-red-600" : "hover:text-red-600"
              } transition-colors cursor-pointer`}
            >
              Home
            </li>
          </Link>

          <li
            className={`relative group font-bold ${
              router.asPath.includes("movie")
                ? "text-red-600"
                : "hover:text-red-600"
            } transition-colors cursor-pointer`}
          >
            Movies
            <div className="hidden lg:hidden lg:group-hover:block absolute min-w-[500px] -left-44 top-6">
              {<GenresTable mediaType="movie" />}
            </div>
          </li>

          <li
            className={`relative group font-bold ${
              router.asPath.includes("tv")
                ? "text-red-600"
                : "hover:text-red-600"
            } transition-colors cursor-pointer`}
          >
            TV Shows
            <div className="hidden group-hover:block absolute min-w-[500px] -left-44 top-6 bg-red-600">
              <GenresTable mediaType="tv" />
            </div>
          </li>
        </ul>
        <div className="flex gap-x-2 lg:gap-x-4 items-center">
          <Link href="/search">
            <SearchIcon className="text-white w-4 h-4 lg:h-5 lg:w-5 cursor-pointer hover:text-red-600 transition-colors" />
          </Link>
          {user && (
            <Link href="/watchlist">
              <CollectionIcon className="text-white w-4 h-4 lg:h-5 lg:w-5 cursor-pointer hover:text-red-600 transition-colors" />
            </Link>
          )}
          {user ? (
            <div className="flex items-center lg:text-sm gap-x-2 font-bold font-sora">
              <span className="hidden lg:block bg-gray-800 lg:py-1 lg:px-2 rounded-full">
                {user.displayName}
              </span>
              <div
                className="bg-white w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-cover bg-center border border-gray-white relative"
                style={{ backgroundImage: `url(${user.photoURL})` }}
                onClick={() => setShowSettings((state) => !state)}
              >
                <DropDown user={user} showSettings={showSettings} />
              </div>
            </div>
          ) : (
            <Link href={`/login`}>
              <UserIcon className="text-white h-5 w-5 cursor-pointer hover:text-red-600 transition-colors" />
            </Link>
          )}
        </div>
      </div>
      <div className="h-8 md:h-12 lg:h-12" />
    </>
  );
};

export default Navbar;
