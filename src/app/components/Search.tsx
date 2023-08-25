"use client";

import { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDebounce } from "use-debounce";

const Search = ({
  searchParam,
  setsearchParam,
  setsearchQuery,
}: {
  searchParam: string;
  setsearchParam: Function;
  setsearchQuery: Function;
}) => {
  const [query] = useDebounce(searchParam, 500);

  useEffect(() => {
    if (query) {
      setsearchQuery(query);
    } else {
      setsearchQuery("");
    }
  }, [query]);

  return (
    <section className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        value={searchParam}
        onChange={(e) => setsearchParam(e.target.value)}
        placeholder="Search Cocktails..."
        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      />
    </section>
  );
};

export default Search;
