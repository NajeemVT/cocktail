import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import FallbackUI from "./FallbackUI";
import DataNotFound from "./DataNotFound";
import Error from "./Error";

export default function SearchResults({
  searchParam,
}: {
  searchParam: string;
}) {
  const [fetchedResult, setfetchedResult] = useState<{
    isSuccess: boolean;
    data?: Object[];
    error?: any;
  }>({
    isSuccess: true,
    data: [],
  });

  const [isLoading, setisLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [startingItem, setStartingItem] = useState(0);
  const [results, setResults] = useState<any>([]);
  const limit = 8;

  const handleNextClick = () => {
    if (totalItems < limit) {
      setStartingItem((prev) => prev + totalItems);
    } else {
      setStartingItem((prev) => prev + limit);
    }
  };
  const handlePrevClick = () => {
    if (totalItems < limit) {
      setStartingItem((prev) => prev - totalItems);
    } else {
      setStartingItem((prev) => prev - limit);
    }
  };

  useEffect(() => {
    setisLoading(true);
    async function fetchResults(searchParam: string) {
      try {
        let response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/search.php",
          {
            params: {
              s: searchParam,
            },
          },
        );

        let data =
          response.data && response.data.drinks ? response.data.drinks : [];
        setTotalItems(data.length);

        setfetchedResult({
          isSuccess: true,
          data,
        });
        setStartingItem(0);
        setisLoading(false);
      } catch (error) {
        setfetchedResult({ isSuccess: false, error });
        setisLoading(false);
      }
    }
    fetchResults(searchParam);
  }, [searchParam]);

  useEffect(() => {
    let endItem;
    if (totalItems < limit) {
      endItem = startingItem + totalItems;
    } else {
      endItem = startingItem + limit;
    }

    let newResults =
      fetchedResult.isSuccess &&
      fetchedResult.data &&
      fetchedResult.data.slice(startingItem, endItem);
    setResults(newResults);
  }, [fetchedResult, startingItem]);

  return isLoading ? (
    <FallbackUI />
  ) : (
    <div>
      <section className="flex flex-col space-y-10">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
        >
          {results &&
            results.length > 0 &&
            results?.map((result: any, index: number) => (
              <li key={result.idDrink || index} className="relative">
                <div className="cursor-pointer">
                  <div className="group block aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
                    {result.strDrinkThumb ? (
                      <Image
                        src={result.strDrinkThumb}
                        alt=""
                        className="object-cover group-hover:opacity-75"
                        width={300}
                        height={300}
                      />
                    ) : (
                      <div className="aspect-square h-[300] w-full overflow-hidden rounded-lg bg-gray-300"></div>
                    )}
                  </div>
                  <p className="mt-2 block rounded-lg  bg-gray-600 px-2 py-1 text-sm font-medium">
                    {result.strDrink || "No Title Found"}
                  </p>
                </div>
              </li>
            ))}
        </ul>
        {results && results.length > 0 && (
          <div className="flex justify-end space-x-10">
            <button
              className="w-40 rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
              disabled={startingItem <= 0}
              onClick={handlePrevClick}
            >
              Previous
            </button>
            <button
              className="w-40 rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
              disabled={startingItem + limit >= totalItems}
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        )}
      </section>
      {results && results.length == 0 && <DataNotFound />}
      {!fetchedResult.isSuccess && <Error />}
    </div>
  );
}
