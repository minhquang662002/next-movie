import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const Pagination = ({ totalPage, url, cont }) => {
  const {
    query: { page },
  } = useRouter();
  const total = new Array(totalPage > 500 ? 500 : totalPage)
    .fill("")
    .map((_, index) => index + 1);
  let middle;
  if (page > 6) {
    if (total.length - page > 8)
      middle = (
        <>
          <Link href={`${url}${cont ? "&" : "?"}page=${1}`}>
            <div className="paginate-card cursor-pointer">1</div>
          </Link>
          <Link href={`${url}${cont ? "&" : "?"}page=${2}`}>
            <div className="paginate-card cursor-pointer">2</div>
          </Link>
          <div className="paginate-card">...</div>
          {total
            .slice(Number(page) - 3, Number(page) + 4)
            .map((item, index) => (
              <Link
                href={`/genre/${mediaType}/${tag}${
                  cont ? "&" : "?"
                }page=${item}`}
                key={item}
              >
                <div
                  className={`paginate-card ${
                    item == page
                      ? "text-red-600 border-red-600"
                      : "cursor-pointer"
                  }`}
                  key={index}
                >
                  {item}
                </div>
              </Link>
            ))}
          <div className="paginate-card">...</div>
          <Link href={`${url}${cont ? "&" : "?"}page=${total.length - 1}`}>
            <div className="paginate-card cursor-pointer">
              {total.length - 1}
            </div>
          </Link>
          <Link href={`${url}${cont ? "&" : "?"}page=${total.length}`}>
            <div className="paginate-card cursor-pointer">{total.length}</div>
          </Link>
        </>
      );
    else {
      middle = (
        <>
          <Link href={`${url}${cont ? "&" : "?"}page=${1}`}>
            <div className="paginate-card cursor-pointer">1</div>
          </Link>
          <Link href={`${url}${cont ? "&" : "?"}page=${2}`}>
            <div className="paginate-card cursor-pointer">2</div>
          </Link>
          <div className="paginate-card">...</div>
          {total.slice(total.length - 10, total.length).map((item, index) => (
            <Link href={`${url}${cont ? "&" : "?"}page=${item}`} key={item}>
              <div
                className={`paginate-card ${
                  item == page
                    ? "text-red-600 border-red-600"
                    : "cursor-pointer"
                }`}
                key={index}
              >
                {item}
              </div>
            </Link>
          ))}
        </>
      );
    }
  } else {
    middle = (
      <>
        {total.slice(0, 10).map((item) => {
          return (
            <Link href={`${url}${cont ? "&" : "?"}page=${item}`} key={item}>
              <div
                className={`paginate-card ${
                  item == page
                    ? "text-red-600 border-red-600"
                    : "cursor-pointer"
                }`}
              >
                {item}
              </div>
            </Link>
          );
        })}
        <div className="paginate-card">...</div>
        <Link href={`${url}${cont ? "&" : "?"}page=${total.length - 1}`}>
          <div className="paginate-card cursor-pointer">{total.length - 1}</div>
        </Link>
        <Link href={`${url}${cont ? "&" : "?"}page=${total.length}`}>
          <div className="paginate-card cursor-pointer">{total.length}</div>
        </Link>
      </>
    );
  }

  return (
    <>
      {totalPage && (
        <div className="flex justify-center gap-x-2 mt-8">
          {page > 1 && (
            <Link href={`${url}?page=${Number(page) - 1}`}>
              <div className="paginate-card cursor-pointer hover:text-red-600 hover:border-red-600">
                <ChevronLeftIcon className="h-4 w-4" />
              </div>
            </Link>
          )}
          {middle}
          {page < total.length && (
            <Link href={`${url}?page=${Number(page) + 1}`}>
              <div className="paginate-card cursor-pointer hover:text-red-600 hover:border-red-600">
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
