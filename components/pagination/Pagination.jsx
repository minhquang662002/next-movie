import { useRouter } from "next/router";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Pagination = ({ totalPage, url }) => {
  const router = useRouter();
  const currentPage = Number(router.query.page);
  const total = new Array(totalPage > 500 ? 500 : totalPage)
    .fill("")
    .map((_, index) => index + 1);
  let middle;
  if (currentPage > 6) {
    if (total.length - currentPage > 8)
      middle = (
        <>
          <Link href={url(1)}>
            <div className="paginate-card cursor-pointer">1</div>
          </Link>
          <Link href={url(2)}>
            <div className="paginate-card cursor-pointer">2</div>
          </Link>
          <div className="paginate-card">...</div>
          {total.slice(currentPage - 3, currentPage + 4).map((item, index) => (
            <Link href={url(item)} key={index}>
              <div
                className={`paginate-card ${
                  item == currentPage
                    ? "text-red-600 border-red-600"
                    : "cursor-pointer"
                }`}
              >
                {item}
              </div>
            </Link>
          ))}
          <div className="paginate-card">...</div>

          <Link href={url(total.length - 1)}>
            <div className="paginate-card cursor-pointer">
              {total.length - 1}
            </div>
          </Link>

          <Link href={url(total.length)}>
            <div className="paginate-card cursor-pointer">{total.length}</div>
          </Link>
        </>
      );
    else {
      middle = (
        <>
          <Link href={url(1)}>
            <div className="paginate-card cursor-pointer">1</div>
          </Link>

          <Link href={url(2)}>
            <div className="paginate-card cursor-pointer">2</div>
          </Link>

          <div className="paginate-card">...</div>
          {total.slice(total.length - 10, total.length).map((item, index) => (
            <Link href={url(item)} key={index}>
              <div
                className={`paginate-card ${
                  item == currentPage
                    ? "text-red-600 border-red-600"
                    : "cursor-pointer"
                }`}
              >
                {item}
              </div>
            </Link>
          ))}
        </>
      );
    }
  } else {
    if (totalPage <= 6) {
      middle = (
        <>
          {total.slice(0, 6).map((item) => {
            return (
              <Link href={url(item)} key={item}>
                <div
                  className={`paginate-card ${
                    item == currentPage
                      ? "text-red-600 border-red-600"
                      : "cursor-pointer"
                  }`}
                >
                  {item}
                </div>
              </Link>
            );
          })}
        </>
      );
    } else {
      middle = (
        <>
          {total.slice(0, 10).map((item) => {
            return (
              <Link href={url(item)} key={item}>
                <div
                  className={`paginate-card ${
                    item == currentPage
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

          <Link href={url(total.length - 1)}>
            <div className="paginate-card cursor-pointer">
              {total.length - 1}
            </div>
          </Link>

          <Link href={url(total.length)}>
            <div className="paginate-card cursor-pointer">{total.length}</div>
          </Link>
        </>
      );
    }
  }

  return (
    <div className="flex items-center justify-center gap-x-2 mt-8">
      {currentPage > 1 && (
        <ChevronLeftIcon
          className="h-5 w-5 cursor-pointer hover:text-red-600 hover:border-red-600 border border-white transition-colors"
          onClick={() =>
            router.push(`?id=${router.query.id}&page=${currentPage - 1}`)
          }
        />
      )}
      {middle}
      {currentPage < total.length && (
        <ChevronRightIcon
          className="h-5 w-5 cursor-pointer hover:text-red-600 hover:border-red-600 border border-white transition-colors"
          onClick={() =>
            router.push(`?id=${router.query.id}&page=${currentPage + 1}`)
          }
        />
      )}
    </div>
  );
};

export default Pagination;
